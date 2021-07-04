import {
    Compiler,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Injectable,
    Injector,
    NgModuleRef,
    OnDestroy,
    Type,
    ViewContainerRef,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CompilerService implements OnDestroy {
    private readonly modules: NgModuleRef<any>[] = [];
    private readonly factories: FactoryHolder[] = [];

    ngOnDestroy(): void {
        this.modules.forEach((m) => m.destroy());
    }

    async render(options: RendererOptions): Promise<ComponentRef<any>> {
        const type = options.type;
        const injector = options.container.injector;
        const factory = this.factories.find((e) => e.type === type)?.factory;
        if (factory) {
            return this.setupComponent(
                options.inputs,
                options.container.createComponent(factory, 0, injector)
            );
        }

        // https://blog.ninja-squad.com/2019/05/07/what-is-angular-ivy/
        // https://juristr.com/blog/2019/10/lazyload-module-ivy-viewengine

        if ('ɵmod' in type) {
            await this.createFactoryFromModuleType(type, injector);
            return this.render(options);
        }

        if ('ɵcmp' in type) {
            this.createFactoryFromComponentType(type, injector);
            return this.render(options);
        }

        throw new Error(
            `[render]: type "${options.type.name}" does not refers to a Component or a NgModule`
        );
    }

    private setupComponent(inputs: any, componentRef: ComponentRef<any>) {
        if (inputs) {
            Object.keys(inputs).forEach((k) => {
                componentRef.instance[k] = inputs[k];
            });
        }

        if (componentRef.instance.ngOnChanges) {
            componentRef.instance.ngOnChanges();
        }

        componentRef.changeDetectorRef.markForCheck();
        return componentRef;
    }

    private createFactoryFromComponentType(
        type: Type<any>,
        injector: Injector
    ) {
        const componentFactoryResolver = injector.get(ComponentFactoryResolver);
        this.factories.push({
            type: type,
            factory: componentFactoryResolver.resolveComponentFactory(type),
        });
    }

    private async createFactoryFromModuleType(
        type: Type<any>,
        injector: Injector
    ) {
        const factory = await injector.get(Compiler).compileModuleAsync(type);
        const module: NgModuleRef<IDynamicModule> = factory.create(injector);
        if (typeof module.instance.component !== 'function') {
            throw new Error(
                `[compiler]: The module "${type.name}" does not define a public "component" field.`
            );
        }
        this.modules.push(module);
        this.factories.push({
            type: type,
            factory: module.componentFactoryResolver.resolveComponentFactory(
                module.instance.component
            ),
        });
    }
}

export interface RendererOptions {
    type: Type<any>;
    inputs?: any;
    container: ViewContainerRef;
}

export interface IDynamicModule {
    /** Reference to the main component of the module */
    component: Type<any>;
}

interface FactoryHolder {
    type: Type<any>;
    factory: ComponentFactory<any>;
}
