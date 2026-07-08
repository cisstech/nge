import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  effect,
  inject,
  viewChild,
  input,
} from '@angular/core'
import { NgeMonacoColorizerService } from '../../services/monaco-colorizer.service'
import { Subscription } from 'rxjs'
import { NgeMonacoPlaceholderComponent } from '../monaco-placeholder/monaco-placeholder.component'

@Component({
  selector: 'nge-monaco-viewer',
  templateUrl: 'monaco-viewer.component.html',
  styleUrls: ['monaco-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgeMonacoPlaceholderComponent],
})
export class NgeMonacoViewerComponent implements OnDestroy {
  private readonly colorizer = inject(NgeMonacoColorizerService)
  private readonly changeDetectorRef = inject(ChangeDetectorRef)

  private editor?: monaco.editor.IEditor
  private observer?: MutationObserver
  private subscriptions: Subscription[] = []

  protected loading = true

  readonly container = viewChild.required<ElementRef<HTMLElement>>('container')
  readonly transclusion = viewChild.required<
    ElementRef<HTMLElement>
    /** code to highlight */
  >('transclusion')

  /** code to highlight */
  readonly code = input<string>()
  /** show line numbers? */

  /** show line numbers? */
  readonly lines = input<
    string | number
    /** theme to use for the syntax highlighting  */
  >()

  /** theme to use for the syntax highlighting  */
  readonly theme = input<string>()
  /** target language */

  /** target language */
  readonly language = input<string>()
  /** space separated list of line numbers to highlight */

  /** space separated list of line numbers to highlight */
  readonly highlights = input<
    string | number
    /** filename to display in the header tab */
  >()

  /** filename to display in the header tab */
  readonly filename = input<string>()

  constructor() {
    effect(() => {
      const code = this.transclusion().nativeElement.textContent?.trim() || this.code() || ''
      // track the inputs used during colorization so it re-runs when they change
      this.theme()
      this.lines()
      this.language()
      this.highlights()
      this.filename()
      this.colorize(code)
    })
  }

  ngOnDestroy(): void {
    this.editor?.dispose()
    this.observer?.disconnect()
    this.subscriptions.forEach((s) => s.unsubscribe())
  }

  private async colorize(code: string): Promise<void> {
    try {
      await this.colorizer.colorizeElement({
        code: code || '',
        theme: this.theme(),
        lines: this.lines(),
        language: this.language(),
        highlights: this.highlights(),
        filename: this.filename(),
        element: this.container().nativeElement,
      })
    } finally {
      this.loading = false
      this.changeDetectorRef.markForCheck()
    }
  }
}
