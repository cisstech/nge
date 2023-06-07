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
  Output
} from '@angular/core';
import { ResourceLoaderService } from '@cisstech/nge/services';
import { marked } from 'marked';
import { firstValueFrom } from 'rxjs';
import { NGE_MARKDOWN_THEMES, NgeMarkdownTheme } from './nge-markdown-config';
import {
  NGE_MARKDOWN_CONTRIBUTION,
  NgeMarkdownContribution,
} from './nge-markdown-contribution';
import { NgeMarkdownService } from './nge-markdown.service';

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
  @Input() theme: string = 'github'

  @HostBinding('class')
  get klass() {
    return `nge-markdown-theme--${this.theme}`;
  }

  /**
   * An event that emit after each rendering pass
   * with the list of tokens parsed from the input markdown.
   */
  @Output() render = new EventEmitter<marked.TokensList>();

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly api: NgeMarkdownService,
    private readonly resourceLoader: ResourceLoaderService,

    @Optional()
    private readonly http: HttpClient,

    @Optional()
    @Inject(NGE_MARKDOWN_THEMES)
    private readonly themes: NgeMarkdownTheme[],

    @Optional()
    @Inject(NGE_MARKDOWN_CONTRIBUTION)
    private readonly contributions: NgeMarkdownContribution[]
  ) {
    this.themes = this.themes || []
  }

  ngOnChanges(): void {
    if (this.file) {
      this.renderFromFile(this.file);
    } else {
      this.renderFromString(this.data || '');
    }

    if (this.theme) {
      const themeInfo = this.themes?.find((theme) => theme.name === this.theme);
      if (themeInfo) {
        firstValueFrom(
          this.resourceLoader.loadAllSync([
            ['style', themeInfo.styleUrl]
          ])
        ).catch()
      }
    }
  }

  ngAfterViewInit(): void {
    if (!this.file && !this.data) {
      this.renderFromString(this.el.nativeElement.innerHTML, true);
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
