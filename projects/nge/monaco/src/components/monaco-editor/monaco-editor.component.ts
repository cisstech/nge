import {
    AfterViewChecked,
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    Optional,
    Output,
    ViewChild
} from '@angular/core';
import { NgeMonacoConfig, NGE_MONACO_CONFIG } from '../../monaco-config';
import { NgeMonacoLoaderService } from '../../services/monaco-loader.service';

@Component({
    selector: 'nge-monaco-editor',
    templateUrl: './monaco-editor.component.html',
    styleUrls: ['./monaco-editor.component.scss'],
})
export class NgeMonacoEditorComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

    @ViewChild('container', { static: true })
    container!: ElementRef<HTMLElement>;

    @Output()
    ready = new EventEmitter<monaco.editor.IEditor>();

    @Input() autoLayout = true;
    @Input()
    options?: monaco.editor.IStandaloneEditorConstructionOptions;

    private editor?: monaco.editor.IStandaloneCodeEditor;
    private width = 0;
    private height = 0;

    constructor(
        private readonly loader: NgeMonacoLoaderService,
        @Optional()
        @Inject(NGE_MONACO_CONFIG)
        private readonly config: NgeMonacoConfig,
    ) { }

    @HostListener('window:resize')
    onResizeWindow() {
        this.editor?.layout();
    }

    ngAfterViewInit() {
        this.loader.loadAsync().then(() => {
            this.createEditor();
        });
    }

    ngAfterViewChecked() {
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

    ngOnDestroy() {
        this.editor?.dispose();
    }

    private createEditor() {
        this.editor = monaco.editor.create(this.container.nativeElement, {
            ...(this.config.options || {}),
            ...(this.options || {}),
        });
        this.ready.emit(this.editor);
    }
}
