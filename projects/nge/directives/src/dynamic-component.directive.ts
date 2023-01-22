import { OnChanges, Directive, Input, NgModule, Type, ViewContainerRef } from '@angular/core';
import { CompilerService } from '@cisstech/nge/services';

@Directive({
  selector: '[dynamic-component]',
})
export class DynamicComponentDirective implements OnChanges {
  @Input('dynamic-component')
  type!: () => Type<any> | Promise<Type<any>>

  @Input('dynamic-componentInputs') inputs: any;

  constructor(
    private readonly compilerService: CompilerService,
    private readonly viewContainerRef: ViewContainerRef,
  ) { }

  async ngOnChanges(): Promise<void> {
    this.viewContainerRef.clear();
    await this.compilerService.render({
      container: this.viewContainerRef,
      type: await this.type(),
      inputs: this.inputs
    });
  }
}

@NgModule({
  declarations: [DynamicComponentDirective],
  exports: [DynamicComponentDirective]
})
export class DynamicComponentDirectiveModule { }
