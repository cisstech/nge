import {
  ComponentRef,
  createNgModuleRef,
  Injectable,
  Injector,
  NgModuleRef,
  Type,
  ViewContainerRef,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CompilerService {
  private readonly modules: ModuleInfo[] = [];

  async render(options: RendererOptions): Promise<ComponentRef<any>> {
    // https://blog.ninja-squad.com/2019/05/07/what-is-angular-ivy/
    // https://juristr.com/blog/2019/10/lazyload-module-ivy-viewengine

    if (!('ɵmod' in options.type) && !('ɵcmp' in options.type)) {
      throw new Error(
        `[render]: type "${options.type.name}" does not refers to a Component or a NgModule`
      );
    }

    let component: Type<any> = options.type;
    if ('ɵmod' in options.type) {
      const module = await this.resolveModuleInfo(
        options.type,
        options.container.injector
      );
      component = module.instance.component;
    }

    return this.renderComponent(
      options.inputs,
      options.container.createComponent(component, {
        index: 0,
        injector: options.container.injector,
      })
    );
  }

  private renderComponent(inputs: any, componentRef: ComponentRef<any>) {
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

  private async resolveModuleInfo(
    type: Type<any>,
    injector: Injector
  ): Promise<NgModuleRef<IDynamicModule>> {
    const moduleInfo = this.modules.find((e) => e.type === type);
    if (moduleInfo) {
      return moduleInfo.module;
    }

    const module: NgModuleRef<IDynamicModule> = createNgModuleRef(
      type,
      injector
    );
    if (typeof module.instance.component !== 'function') {
      throw new Error(
        `[compiler]: The module "${type.name}" does not define a public "component" field.`
      );
    }
    this.modules.push({ type: type, module: module });
    return module;
  }
}

export interface RendererOptions {
  type: Type<any> ;
  inputs?: any;
  container: ViewContainerRef;
}

export interface IDynamicModule {
  /** Reference to the main component of the module */
  component: Type<any>;
}

interface ModuleInfo {
  type: Type<any>;
  module: NgModuleRef<IDynamicModule>;
}
