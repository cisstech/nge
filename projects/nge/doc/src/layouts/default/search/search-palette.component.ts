import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { NgeDocSearchResult, NgeDocService } from '../../../nge-doc.service'

@Component({
  selector: 'nge-doc-search-palette',
  templateUrl: './search-palette.component.html',
  styleUrls: ['./search-palette.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPaletteComponent {
  private readonly docService = inject(NgeDocService)
  private readonly router = inject(Router)

  private readonly input = viewChild.required<ElementRef<HTMLInputElement>>('input')

  /** Emitted when the palette should be dismissed. */
  readonly closed = output()

  protected readonly labels = this.docService.labels
  protected readonly query = signal('')
  protected readonly activeIndex = signal(0)
  protected readonly results = computed<NgeDocSearchResult[]>(() => this.docService.search(this.query()))

  constructor() {
    afterNextRender(() => this.input().nativeElement.focus())
  }

  protected onInput(value: string): void {
    this.query.set(value)
    this.activeIndex.set(0)
  }

  protected onKeydown(event: KeyboardEvent): void {
    const results = this.results()
    switch (event.key) {
      case 'Escape':
        event.preventDefault()
        this.closed.emit()
        break
      case 'ArrowDown':
        event.preventDefault()
        this.activeIndex.update((index) => (results.length ? (index + 1) % results.length : 0))
        break
      case 'ArrowUp':
        event.preventDefault()
        this.activeIndex.update((index) => (results.length ? (index - 1 + results.length) % results.length : 0))
        break
      case 'Enter': {
        event.preventDefault()
        const result = results[this.activeIndex()]
        if (result) {
          this.select(result)
        }
        break
      }
    }
  }

  protected select(result: NgeDocSearchResult): void {
    if (result.link.href) {
      this.router.navigateByUrl(result.link.href)
    }
    this.closed.emit()
  }

  protected dismiss(): void {
    this.closed.emit()
  }
}
