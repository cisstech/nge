import { Directive, NgModule, Type, ViewContainerRef, effect, inject, input } from '@angular/core'
import { CompilerService } from '@cisstech/nge/services'

@Directive({
  selector: '[dynamic-component]',
  standalone: true,
})
export class DynamicComponentDirective {
  private readonly compilerService = inject(CompilerService)
  private readonly viewContainerRef = inject(ViewContainerRef)

  readonly type = input.required<() => Type<any> | Promise<Type<any>>>({ alias: 'dynamic-component' })

  readonly inputs = input<any>(undefined, { alias: 'dynamic-componentInputs' })

  constructor() {
    effect(() => {
      const type = this.type()
      const inputs = this.inputs()
      this.render(type, inputs)
    })
  }

  private async render(type: () => Type<any> | Promise<Type<any>>, inputs: any): Promise<void> {
    this.viewContainerRef.clear()
    await this.compilerService.render({
      container: this.viewContainerRef,
      type: await type(),
      inputs,
    })
  }
}

/**
 * @deprecated in favor of standalone api, so please use direclty the directive as a standalone. Will be removed in/after v18
 */
@NgModule({
  imports: [DynamicComponentDirective],
  exports: [DynamicComponentDirective],
})
export class DynamicComponentDirectiveModule {}
