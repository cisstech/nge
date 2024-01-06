import { Directive, EventEmitter, HostListener, Input, NgModule, Output } from '@angular/core';

@Directive({ selector: '[long-press-detector]', standalone: true })
export class LongPressDetectorDirective {
  @Input() longPressDuration = 400;
  @Output() longPress = new EventEmitter<MouseEvent | TouchEvent>();
  @Output() longPressEnd = new EventEmitter<boolean>();

  private timeout?: ReturnType<typeof setTimeout>;
  private pressing = false;

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMouseDown(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.pressing = false;
    this.timeout = setTimeout(() => {
      this.longPress.emit(event);
      this.pressing = true;
      event.preventDefault();
      event.stopPropagation();
    }, this.longPressDuration);
  }


  @HostListener('mouseup')
  @HostListener('touchend')
  onMouseUp() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    setTimeout(() => {
      this.longPressEnd.emit(this.pressing);
      this.pressing = false;
    });
  }
}

/**
 * @deprecated in favor of standalone api, so please use direclty the directive as a standalone. Will be removed in/after v18
 */
@NgModule({
  imports: [LongPressDetectorDirective],
  exports: [LongPressDetectorDirective]
})
export class LongPressDetectorDirectiveModule { }
