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
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { switchMap } from 'rxjs'
import { NgeDocService } from '../../../../core/nge-doc.service'
import { NgeDocSearchResult } from '../../../../core/search'

interface HighlightPart {
  text: string
  hit: boolean
}

interface SearchRow {
  result: NgeDocSearchResult
  /** Breadcrumb trail down to the page, so same-titled pages read as distinct rows. */
  crumb: string
  excerpt: HighlightPart[] | null
}

/** Splits `text` into segments so each `needle` occurrence can be wrapped in a highlight. */
function highlight(text: string, needle: string): HighlightPart[] {
  if (!needle) {
    return [{ text, hit: false }]
  }
  const parts: HighlightPart[] = []
  const lower = text.toLowerCase()
  const target = needle.toLowerCase()
  let from = 0
  for (let at = lower.indexOf(target); at >= 0; at = lower.indexOf(target, from)) {
    if (at > from) {
      parts.push({ text: text.slice(from, at), hit: false })
    }
    parts.push({ text: text.slice(at, at + target.length), hit: true })
    from = at + target.length
  }
  if (from < text.length) {
    parts.push({ text: text.slice(from), hit: false })
  }
  return parts
}

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

  /** Results paired with their breadcrumb and pre-split excerpt, computed once per query, not per render. */
  protected readonly rows = computed<SearchRow[]>(() => {
    const needle = this.query().trim()
    return this.results().map((result) => ({
      result,
      // Drop the site name (path[0]); the section trail plus the title is what distinguishes rows.
      crumb: [...result.path.slice(1), result.title].join(' › '),
      excerpt: result.excerpt ? highlight(result.excerpt, needle) : null,
    }))
  })

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
