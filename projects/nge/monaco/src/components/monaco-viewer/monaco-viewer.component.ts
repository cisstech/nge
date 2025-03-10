import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core'
import { NgeMonacoColorizerService } from '../../services/monaco-colorizer.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'nge-monaco-viewer',
  templateUrl: 'monaco-viewer.component.html',
  styleUrls: ['monaco-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgeMonacoViewerComponent implements OnChanges, OnDestroy {
  private readonly colorizer = inject(NgeMonacoColorizerService)
  private readonly changeDetectorRef = inject(ChangeDetectorRef)

  private editor?: monaco.editor.IEditor
  private observer?: MutationObserver
  private subscriptions: Subscription[] = []

  protected loading = true

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>
  @ViewChild('transclusion', { static: true })
  transclusion!: ElementRef<HTMLElement>

  /** code to highlight */
  @Input() code?: string

  /** show line numbers? */
  @Input() lines?: string | number

  /** theme to use for the syntax highlighting  */
  @Input() theme?: string

  /** target language */
  @Input() language?: string

  /** space separated list of line numbers to highlight */
  @Input() highlights?: string | number

  /** filename to display in the header tab */
  @Input() filename?: string


  ngOnChanges(): void {
    const code = this.transclusion.nativeElement.textContent?.trim() || this.code || ''
    this.colorize(code)
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
        theme: this.theme,
        lines: this.lines,
        language: this.language,
        highlights: this.highlights,
        filename: this.filename,
        element: this.container.nativeElement,
      })
    } finally {
      this.loading = false
      this.changeDetectorRef.markForCheck()
    }
  }
}
