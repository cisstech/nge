import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  inject
} from '@angular/core';
import { ResourceLoaderService } from '@cisstech/nge/services';
import type { TokensList } from 'marked';
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
  private readonly el: ElementRef<HTMLElement> = inject(ElementRef)
  private readonly http = inject(HttpClient, { optional: true })
  private readonly markdownService = inject(NgeMarkdownService)
  private readonly resourceLoader = inject(ResourceLoaderService)
  private readonly themes = inject(NGE_MARKDOWN_THEMES, { optional: true }) as unknown as NgeMarkdownTheme[]
  private readonly contributions = inject(NGE_MARKDOWN_CONTRIBUTION, { optional: true }) as unknown  as NgeMarkdownContribution[]


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
  @Output() render = new EventEmitter<TokensList>();

  constructor() {
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
    const tokens = await this.markdownService.compile({
      target: this.el.nativeElement,
      markdown,
      isHtmlString,
      contributions: this.contributions,
    });
    this.render.emit(tokens);
  }
}
