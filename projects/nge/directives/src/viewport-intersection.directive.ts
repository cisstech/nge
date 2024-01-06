import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, booleanAttribute } from '@angular/core';

@Directive({
  selector: '[viewportIntersection]',
  standalone: true
})
export class ViewportIntersectionDirective implements AfterViewInit, OnDestroy {

  /**
   * An optional reference to a container element with its own scrollable area. If not provided, the viewport is used as the default container.
   */
  @Input() scrollContainer?: HTMLElement | null;

  /**
   * A single number or an array of numbers indicating at what percentage of the target's
   * visibility the observer's callback should be executed.
   * For example, a threshold of 1.0 means the callback will trigger when 100% of the target is visible within the observed area.
   *
   * Please refers to the official documentation of Intersection API for more informations.
   */
  @Input() threshold?: number | number[];

  /**
   * A margin around the root element.
   * This margin works like the CSS margin property, setting how much of the root should be seen before the intersection is observed.
   * It's specified in pixels or percentages.
   *
   * Please refers to the official documentation of Intersection API for more informations.
   */
  @Input() rootMargin?: string
  @Input({ transform: booleanAttribute }) debug = false;

  /**
   * This event is emitted whenever the observed element intersects with the viewport or the specified scrollContainer
   * according to the given threshold and rootMargin.
   */
  @Output() intersected: EventEmitter<void> = new EventEmitter();

  private intersectionObserver?: IntersectionObserver;

  constructor(private readonly element: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {


    this.intersectionObserver = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        this.intersected.emit();
        if (this.debug) {
          this.element.nativeElement.style.border = '2px solid red';
        }
      } else {
        if (this.debug) {
          this.element.nativeElement.style.border = '2px solid transparent';
        }
      }
    }, {
      root: this.scrollContainer ? this.scrollContainer : null,
      rootMargin: this.rootMargin,
      threshold: this.threshold
    });

    this.intersectionObserver.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}
