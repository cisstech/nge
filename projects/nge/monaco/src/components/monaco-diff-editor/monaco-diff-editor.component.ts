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
    ViewChild,
} from '@angular/core';
import { NgeMonacoConfig, NGE_MONACO_CONFIG } from '../../monaco-config';
import { NgeMonacoLoaderService } from '../../services/monaco-loader.service';

@Component({
    selector: 'nge-monaco-diff-editor',
    templateUrl: './monaco-diff-editor.component.html',
    styleUrls: ['./monaco-diff-editor.component.scss'],
})
export class NgeMonacoDiffEditorComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
    @ViewChild('container', { static: true })
    container!: ElementRef<HTMLElement>;

    @Output()
    ready = new EventEmitter<monaco.editor.IEditor>();

    @Input()
    autoLayout = true;

    private editor?: monaco.editor.IStandaloneDiffEditor;
    private width = 0;
    private height = 0;

    constructor(
        private readonly loader: NgeMonacoLoaderService,
        @Optional()
        @Inject(NGE_MONACO_CONFIG)
        private readonly config: NgeMonacoConfig
    ) {}

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
        this.editor = monaco.editor.createDiffEditor(
            this.container.nativeElement,
            this.config.options || {}
        );
        this.ready.emit(this.editor);
    }
}
