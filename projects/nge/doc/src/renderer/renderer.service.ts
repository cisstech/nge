import {
    Compiler,
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Injectable,
    NgModule,
    NgModuleRef,
    OnDestroy,
    Type,
    ViewContainerRef,
} from '@angular/core';

@Injectable()
export class RendererService implements OnDestroy {
    private readonly modules: NgModuleRef<any>[] = [];
    private readonly factories: FactoryHolder[] = [];

    ngOnDestroy() {
        this.modules.forEach((m) => m.destroy());
    }

    async render(args: RendererOptions): Promise<ComponentRef<any>> {
        const type = args.type as any;
        const container = args.container;
        const injector = container.injector;
        const holder = this.factories.find((e) => e.type === type);
        if (holder) {
            const componentRef = container.createComponent(holder.factory, 0, injector);
            if (args.inputs) {
                Object.keys(args.inputs).forEach((k) => {
                    componentRef.instance[k] = args.inputs[k];
                });
            }
            if (componentRef.instance.ngOnChanges) {
                componentRef.instance.ngOnChanges();
            }
            return componentRef;
        }


        // https://blog.ninja-squad.com/2019/05/07/what-is-angular-ivy/

        if ('ɵmod' in args.type) {
            await this.createFactoryFromModuleType(args);
            return this.render(args);
        }

        if ('ɵcmp' in args.type) {
            this.createFactoryFromComponentType(args);
            return this.render(args);
        }

        throw new Error(
            `[nge-doc]: type "${args.type.name}" does not refers to a Component or a NgModule`
        );
    }

    private createFactoryFromComponentType(args: RendererOptions) {
        const componentFactoryResolver = args.container.injector.get(
            ComponentFactoryResolver
        );
        this.factories.push({
            type: args.type,
            factory: componentFactoryResolver.resolveComponentFactory(
                args.type
            ),
        });
    }

    private async createFactoryFromModuleType(
        args: RendererOptions
    ) {
        const injector = args.container.injector;
        const factory = await injector
            .get(Compiler)
            .compileModuleAsync(args.type);
        const module = factory.create(injector);
        if (typeof module.instance.component !== 'function') {
            throw new Error(
                `[nge-doc]: The module "${args.type.name}" does not define a public "component" field.`
            );
        }
        this.modules.push(module);
        this.factories.push({
            type: args.type,
            factory: module.componentFactoryResolver.resolveComponentFactory(
                module.instance.component
            ),
        });
    }
}

export interface RendererOptions {
    type: Type<any>;
    container: ViewContainerRef;
    inputs?: any;
}

interface FactoryHolder {
    type: Type<any>;
    factory: ComponentFactory<any>;
}
