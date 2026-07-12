import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core'
import { NgeDocIcon } from '../../../../core/nge-doc'
import { NgeDocThemeService } from '../../../../core/nge-doc-theme.service'

/**
 * Renders a consumer-provided icon so it looks right in light and dark.
 *
 * A monochrome url is painted with `currentColor` through a CSS mask, so any
 * single-color icon adapts to the theme automatically. A `{ light, dark }` pair
 * (or a non-monochrome icon) is rendered as a plain image with the variant that
 * matches the active scheme.
 */
@Component({
  selector: 'nge-doc-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (masked()) {
      <span #mask class="icon" [style.width]="size()" [style.height]="size()"></span>
    } @else {
      <img class="icon" [src]="src()" alt="" [style.width]="size()" [style.height]="size()" />
    }
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .icon {
        display: inline-block;
        object-fit: contain;
      }
      span.icon {
        background-color: currentColor;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
        -webkit-mask-size: contain;
        mask-size: contain;
      }
    `,
  ],
})
export class NgeDocIconComponent {
  private readonly theme = inject(NgeDocThemeService)
  private readonly maskEl = viewChild<ElementRef<HTMLElement>>('mask')

  /** The icon to render (a url, or a light/dark pair). */
  readonly icon = input.required<NgeDocIcon>()
  /** Whether a single-url icon is monochrome and should follow the text color. */
  readonly mono = input(true)
  /** CSS size applied to both dimensions. */
  readonly size = input('1em')

  /**
   * A single-url monochrome icon is drawn with a mask so it follows the text
   * color. CSS masks enforce CORS, so this only applies to same-origin (or data)
   * urls; cross-origin icons fall back to an image (use a `{ light, dark }` pair
   * for those).
   */
  protected readonly masked = computed(() => {
    const icon = this.icon()
    return this.mono() && typeof icon === 'string' && this.isMaskable(icon)
  })

  /** Source url for the image branch, resolving light/dark pairs. */
  protected readonly src = computed(() => {
    const icon = this.icon()
    return typeof icon === 'string' ? icon : this.theme.isDark() ? icon.dark : icon.light
  })

  constructor() {
    effect(() => {
      const host = this.maskEl()?.nativeElement
      const icon = this.icon()
      if (!host || typeof icon !== 'string') {
        return
      }
      // Set the mask through the DOM to bypass Angular's style url() sanitizer.
      const value = `url("${icon}")`
      host.style.setProperty('-webkit-mask-image', value)
      host.style.setProperty('mask-image', value)
    })
  }

  private isMaskable(url: string): boolean {
    if (url.startsWith('data:')) {
      return true
    }
    try {
      return new URL(url, document.baseURI).origin === location.origin
    } catch {
      return false
    }
  }
}
