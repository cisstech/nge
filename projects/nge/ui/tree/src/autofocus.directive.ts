import { AfterContentInit, Directive, ElementRef } from '@angular/core'

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'input[autofocus]',
  standalone: false,
})
export class AutofocusDirective implements AfterContentInit {
  constructor(private readonly el: ElementRef) {}
  ngAfterContentInit() {
    setTimeout(() => {
      this.el.nativeElement.focus()
    }, 500)
  }
}
