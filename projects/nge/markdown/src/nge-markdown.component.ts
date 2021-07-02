import { HttpClient } from '@angular/common/http';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    OnChanges,
    Optional,
    Output,
} from '@angular/core';
import {
    NgeMarkdownContribution,
    NGE_MARKDOWN_CONTRIBUTION,
} from './nge-markdown-contribution';
import { NgeMarkdownService } from './nge-markdown.service';
import { MarkedTokensList } from './marked-types';

@Component({
    selector: 'nge-markdown, [nge-markdown]',
    templateUrl: 'nge-markdown.component.html',
    styleUrls: ['nge-markdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgeMarkdownComponent implements OnChanges, AfterViewInit {
    /** Link to a markdown file to render. */
    @Input() file?: string;

    /** Markdown string to render. */
    @Input() data?: string;

    /** Theme to apply to the markdown content. */
    @Input()
    theme: 'github' | 'none' = 'github';

    @HostBinding('class')
    get klass() {
        return 'nge-markdown-theme--' + this.theme;
    }

    /**
     * An event that emit after each rendering pass
     * with the list of tokens parsed from the input markdown.
     */
    @Output() render = new EventEmitter<MarkedTokensList>();

    constructor(
        private readonly el: ElementRef<HTMLElement>,
        private readonly api: NgeMarkdownService,
        @Optional()
        private readonly http: HttpClient,
        @Optional()
        @Inject(NGE_MARKDOWN_CONTRIBUTION)
        private readonly contributions: NgeMarkdownContribution[]
    ) {}

    ngOnChanges(): void {
        if (this.file) {
            this.renderFromFile(this.file);
        } else {
            this.renderFromString(this.data || '');
        }
    }

    ngAfterViewInit(): void {
        if (!this.file && !this.data) {
            this.renderFromString(
                this.el.nativeElement.innerHTML,
                true
            );
        }
    }

    private renderFromFile(file: string) {
        if (!this.http) {
            throw new Error(
                '[nge-markdown] When using the `file` attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information'
            );
        }
        this.http.get(file, { responseType: 'text' }).subscribe({
            next: (markdown) => this.renderFromString(markdown),
        });
    }

    private async renderFromString(markdown: string, isHtmlString = false) {
        const tokens = await this.api.compile({
            target: this.el.nativeElement,
            markdown,
            isHtmlString,
            contributions: this.contributions,
        });
        this.render.emit(tokens);
    }
}
