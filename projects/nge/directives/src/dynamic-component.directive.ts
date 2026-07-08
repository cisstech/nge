import { Directive, Input, NgModule, OnChanges, Type, ViewContainerRef, inject } from '@angular/core'
import { CompilerService } from '@cisstech/nge/services'

@Directive({
  selector: '[dynamic-component]',
  standalone: true,
})
export class DynamicComponentDirective implements OnChanges {
  private readonly compilerService = inject(CompilerService)
  private readonly viewContainerRef = inject(ViewContainerRef)

  @Input('dynamic-component')
  type!: () => Type<any> | Promise<Type<any>>

  @Input('dynamic-componentInputs') inputs: any

  async ngOnChanges(): Promise<void> {
    this.viewContainerRef.clear()
    await this.compilerService.render({
      container: this.viewContainerRef,
      type: await this.type(),
      inputs: this.inputs,
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
