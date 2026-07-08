import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ChangeDetectionStrategy,
  inject,
  output,
  viewChild,
  input,
} from '@angular/core'
import { NgeMonacoConfig, NGE_MONACO_CONFIG } from '../../monaco-config'
import { NgeMonacoLoaderService } from '../../services/monaco-loader.service'

@Component({
  selector: 'nge-monaco-diff-editor',
  templateUrl: './monaco-diff-editor.component.html',
  styleUrls: ['./monaco-diff-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgeMonacoDiffEditorComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  private readonly loader = inject(NgeMonacoLoaderService)
  private readonly config = inject<NgeMonacoConfig>(NGE_MONACO_CONFIG, { optional: true })

  readonly container = viewChild.required<ElementRef<HTMLElement>>('container')

  readonly ready = output<monaco.editor.IEditor>()

  readonly autoLayout = input(true)

  readonly options = input<monaco.editor.IStandaloneDiffEditorConstructionOptions>()

  private editor?: monaco.editor.IStandaloneDiffEditor
  private width = 0
  private height = 0

  @HostListener('window:resize')
  onResizeWindow() {
    this.editor?.layout()
  }

  ngAfterViewInit() {
    this.loader.loadAsync().then(() => {
      this.createEditor()
    })
  }

  ngAfterViewChecked() {
    if (!this.autoLayout()) {
      return
    }
    const { offsetWidth, offsetHeight } = this.container().nativeElement
    if (offsetWidth !== this.width || offsetHeight !== this.height) {
      this.width = offsetWidth
      this.height = offsetHeight
      this.editor?.layout()
    }
  }

  ngOnDestroy() {
    this.editor?.dispose()
  }

  private createEditor() {
    this.editor = monaco.editor.createDiffEditor(this.container().nativeElement, {
      ...(this.config?.options || {}),
      ...(this.options() || {}),
    })
    this.ready.emit(this.editor)
  }
}
