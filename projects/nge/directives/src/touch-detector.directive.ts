import { Directive, ElementRef, EventEmitter, HostListener, NgModule, Output } from '@angular/core';

@Directive({
  selector: '[touch-detector]',
  exportAs: 'touch-detector',
  standalone: true,
})
export class TouchDetectorDirective {
  private _hover = false;

  get hover(): boolean {
    return this._hover;
  }

  @Output() onUpWhileHovering = new EventEmitter<void>();

  constructor(
    private readonly el: ElementRef<HTMLElement>
  ) { }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  protected touchmove(event: any) {
    const mouseX = event.clientX || event.touches[0].clientX;
    const mouseY = event.clientY || event.touches[0].clientY;
    const rect = this.el.nativeElement.getBoundingClientRect();
    const { x, y, width, height } = rect;
    const h = mouseX >= x && mouseX <= (x + width);
    const v = mouseY >= y && mouseY <= (y + height);
    this._hover = h && v;
  }

  @HostListener('document:mouseup', [])
  @HostListener('document:touchend', [])
  protected touchup() {
    if (this.hover) {
      this.onUpWhileHovering.emit();
    }
  }
}

/**
 * @deprecated in favor of standalone api, so please use direclty the directive as a standalone. Will be removed in/after v18
 */
@NgModule({
  imports: [TouchDetectorDirective],
  exports: [TouchDetectorDirective]
})
export class TouchDetectorDirectiveModule { }
