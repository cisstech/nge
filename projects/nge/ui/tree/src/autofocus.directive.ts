import { AfterContentInit, Directive, ElementRef, inject } from '@angular/core'

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'input[autofocus]',
})
export class AutofocusDirective implements AfterContentInit {
  private readonly el = inject(ElementRef)

  ngAfterContentInit() {
    setTimeout(() => {
      this.el.nativeElement.focus()
    }, 500)
  }
}
