import {
  ComponentRef,
  createNgModule,
  Injectable,
  Injector,
  NgModuleRef,
  SimpleChanges,
  Type,
  ViewContainerRef,
} from '@angular/core'

@Injectable({ providedIn: 'root' })
export class CompilerService {
  private readonly modules: ModuleInfo[] = []

  async render(options: RendererOptions): Promise<ComponentRef<any>> {
    const { component } = await this.resolveComponent(options.type, options.container.injector)
    return await this.renderComponent(
      options.inputs,
      options.container.createComponent(component, {
        index: 0,
        injector: options.container.injector,
      })
    )
  }

  async resolveComponent(type: Type<any>, injector: Injector) {
    // https://blog.ninja-squad.com/2019/05/07/what-is-angular-ivy/
    // https://juristr.com/blog/2019/10/lazyload-module-ivy-viewengine

    if (!('ɵmod' in type) && !('ɵcmp' in type)) {
      throw new Error(`[render]: type "${type.name}" does not refers to a Component or a NgModule`)
    }

    let component: Type<any> = type
    let componentInjector = injector
    if ('ɵmod' in type) {
      const module = await this.resolveModuleInfo(type, injector)
      componentInjector = module.injector
      component = module.instance.component
    }

    return {
      component,
      injector: componentInjector,
    }
  }

  private async renderComponent(inputs: any, componentRef: ComponentRef<any>): Promise<ComponentRef<any>> {
    const changes: SimpleChanges = {}
    const { instance, changeDetectorRef } = componentRef

    if (inputs) {
      Object.keys(inputs).forEach((k) => {
        instance[k] = inputs[k]
        changes[k] = {
          currentValue: inputs[k],
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true,
        }
      })
    }

    if (instance.ngOnChanges) {
      await instance.ngOnChanges(changes)
    }

    changeDetectorRef.markForCheck()
    return componentRef
  }

  private async resolveModuleInfo(type: Type<any>, injector: Injector): Promise<NgModuleRef<IDynamicModule>> {
    const moduleInfo = this.modules.find((e) => e.type === type)
    if (moduleInfo) {
      return moduleInfo.module
    }

    const module: NgModuleRef<IDynamicModule> = createNgModule(type, injector)
    if (typeof module.instance.component !== 'function') {
      throw new Error(`[compiler]: The module "${type.name}" does not define a public "component" field.`)
    }
    this.modules.push({ type: type, module: module })
    return module
  }
}

export interface RendererOptions {
  type: Type<any>
  inputs?: any
  container: ViewContainerRef
}

export interface IDynamicModule {
  /** Reference to the main component of the module */
  component: Type<any>
}

interface ModuleInfo {
  type: Type<any>
  module: NgModuleRef<IDynamicModule>
}
