import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import { NGE_MONACO_CONFIG, NgeMonacoConfig } from '../../monaco-config';
import { NgeMonacoLoaderService } from '../../services/monaco-loader.service';

@Component({
  selector: 'nge-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgeMonacoEditorComponent
  implements AfterViewInit, AfterViewChecked, OnDestroy
{
  protected loading = true;
  @ViewChild('container', { static: true })
  protected container!: ElementRef<HTMLElement>;

  @Output() ready = new EventEmitter<monaco.editor.IEditor>();
  @Input() autoLayout = true;
  @Input() options?: monaco.editor.IStandaloneEditorConstructionOptions;

  private editor?: monaco.editor.IStandaloneCodeEditor;
  private width = 0;
  private height = 0;

  constructor(
    private readonly loader: NgeMonacoLoaderService,
    @Optional()
    @Inject(NGE_MONACO_CONFIG)
    private readonly config: NgeMonacoConfig
  ) {}

  ngAfterViewInit(): void {
    this.loader.loadAsync().then(() => {
      this.createEditor();
    });
  }

  ngAfterViewChecked(): void {
    if (!this.autoLayout) {
      return;
    }
    const { offsetWidth, offsetHeight } = this.container.nativeElement;
    if (offsetWidth !== this.width || offsetHeight !== this.height) {
      this.width = offsetWidth;
      this.height = offsetHeight;
      this.editor?.layout();
    }
  }

  ngOnDestroy(): void {
    this.editor?.dispose();
  }

  @HostListener('window:resize')
  protected onResizeWindow(): void {
    this.editor?.layout();
  }

  private createEditor(): void {
    this.editor = monaco.editor.create(this.container.nativeElement, {
      ...(this.config.options || {}),
      ...(this.options || {}),
    });
    this.loading = false;
    this.ready.emit(this.editor);
  }
}
