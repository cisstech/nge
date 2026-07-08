import { AfterViewInit, Directive, ElementRef, OnDestroy, booleanAttribute, inject, output, input } from '@angular/core'

@Directive({
  selector: '[viewportIntersection]',
  standalone: true,
})
export class ViewportIntersectionDirective implements AfterViewInit, OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef)

  /**
   * An optional reference to a container element with its own scrollable area. If not provided, the viewport is used as the default container.
   */
  readonly scrollContainer = input<HTMLElement | null>()

  /**
   * A single number or an array of numbers indicating at what percentage of the target's
   * visibility the observer's callback should be executed.
   * For example, a threshold of 1.0 means the callback will trigger when 100% of the target is visible within the observed area.
   *
   * Please refers to the official documentation of Intersection API for more informations.
   */
  readonly threshold = input<number | number[]>()

  /**
   * A margin around the root element.
   * This margin works like the CSS margin property, setting how much of the root should be seen before the intersection is observed.
   * It's specified in pixels or percentages.
   *
   * Please refers to the official documentation of Intersection API for more informations.
   */
  readonly rootMargin = input<string>()
  readonly debug = input(
    false,
    { transform: booleanAttribute }
  )

  /**
   * This event is emitted whenever the observed element intersects with the viewport or the specified scrollContainer
   * according to the given threshold and rootMargin.
   */
  readonly intersected = output<void>()

  private intersectionObserver?: IntersectionObserver

  ngAfterViewInit(): void {
    const scrollContainer = this.scrollContainer()
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          this.intersected.emit()
          if (this.debug()) {
            this.element.nativeElement.style.border = '2px solid red'
          }
        } else {
          if (this.debug()) {
            this.element.nativeElement.style.border = '2px solid transparent'
          }
        }
      },
      {
        root: scrollContainer ? scrollContainer : null,
        rootMargin: this.rootMargin(),
        threshold: this.threshold(),
      }
    )

    this.intersectionObserver.observe(this.element.nativeElement)
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect()
    }
  }
}
