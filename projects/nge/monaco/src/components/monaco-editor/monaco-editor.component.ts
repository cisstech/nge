import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  inject,
  output,
  viewChild,
} from '@angular/core'
import { NGE_MONACO_CONFIG, NgeMonacoConfig } from '../../monaco-config'
import { NgeMonacoLoaderService } from '../../services/monaco-loader.service'
import { NgeMonacoPlaceholderComponent } from '../monaco-placeholder/monaco-placeholder.component'

@Component({
  selector: 'nge-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgeMonacoPlaceholderComponent],
})
export class NgeMonacoEditorComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  private readonly loader = inject(NgeMonacoLoaderService)
  private readonly config = inject<NgeMonacoConfig>(NGE_MONACO_CONFIG, { optional: true })

  protected loading = true
  protected readonly container = viewChild.required<ElementRef<HTMLElement>>('container')

  readonly ready = output<monaco.editor.IEditor>()
  @Input() autoLayout = true
  @Input() options?: monaco.editor.IStandaloneEditorConstructionOptions

  private editor?: monaco.editor.IStandaloneCodeEditor
  private width = 0
  private height = 0

  ngAfterViewInit(): void {
    this.loader.loadAsync().then(() => {
      this.createEditor()
    })
  }

  ngAfterViewChecked(): void {
    if (!this.autoLayout) {
      return
    }
    const { offsetWidth, offsetHeight } = this.container().nativeElement
    if (offsetWidth !== this.width || offsetHeight !== this.height) {
      this.width = offsetWidth
      this.height = offsetHeight
      this.editor?.layout()
    }
  }

  ngOnDestroy(): void {
    this.editor?.dispose()
  }

  @HostListener('window:resize')
  protected onResizeWindow(): void {
    this.editor?.layout()
  }

  private createEditor(): void {
    this.editor = monaco.editor.create(this.container().nativeElement, {
      ...(this.config?.options || {}),
      ...(this.options || {}),
    })
    this.loading = false
    this.ready.emit(this.editor)
  }
}
