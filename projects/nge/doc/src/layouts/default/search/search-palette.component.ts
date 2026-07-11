import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { switchMap } from 'rxjs'
import { NgeDocService } from '../../../nge-doc.service'
import { NgeDocSearchResult } from '../../../search'

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
  protected readonly results = toSignal(
    toObservable(this.query).pipe(switchMap((query) => this.docService.search(query))),
    { initialValue: [] as NgeDocSearchResult[] }
  )

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
    this.router.navigateByUrl(result.slug)
    this.closed.emit()
  }

  protected dismiss(): void {
    this.closed.emit()
  }
}
