import { HttpClient } from '@angular/common/http'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  effect,
  inject,
  output,
  input,
} from '@angular/core'
import { ResourceLoaderService } from '@cisstech/nge/services'
import type { TokensList } from 'marked'
import { firstValueFrom } from 'rxjs'
import { NGE_MARKDOWN_THEMES, NgeMarkdownTheme } from './nge-markdown-config'
import { NGE_MARKDOWN_CONTRIBUTION, NgeMarkdownContribution } from './nge-markdown-contribution'
import { NgeMarkdownService } from './nge-markdown.service'

@Component({
  selector: 'nge-markdown, [nge-markdown]',
  templateUrl: 'nge-markdown.component.html',
  styleUrls: ['nge-markdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgeMarkdownComponent implements OnInit, AfterViewInit {
  private readonly el: ElementRef<HTMLElement> = inject(ElementRef)
  private readonly http = inject(HttpClient, { optional: true })
  private readonly markdownService = inject(NgeMarkdownService)
  private readonly resourceLoader = inject(ResourceLoaderService)
  private readonly changeDetectorRef = inject(ChangeDetectorRef)
  private readonly themes = inject(NGE_MARKDOWN_THEMES, { optional: true }) as unknown as NgeMarkdownTheme[]
  private readonly contributions = inject(NGE_MARKDOWN_CONTRIBUTION, {
    optional: true,
  }) as unknown as NgeMarkdownContribution[]

  private isDark = false

  /** Link to a markdown file to render. */
  readonly file = input<string>()

  /** Markdown string to render. */
  readonly data = input<string>()

  /** Theme to apply to the markdown content. */
  readonly theme = input<string | null | undefined>('github')

  @HostBinding('class')
  get klass() {
    const theme = this.theme()
    if (!theme) return ''
    const classeNames = [`nge-markdown-theme--${theme}`]
    if (this.isDark) {
      classeNames.push(`nge-markdown-theme--${theme}--dark`)
    }
    return classeNames.join(' ')
  }

  /**
   * An event that emit after each rendering pass
   * with the list of tokens parsed from the input markdown.
   */
  readonly render = output<TokensList>()

  constructor() {
    this.themes = this.themes || []

    // Re-render whenever the file, data or theme input changes.
    effect(() => {
      const file = this.file()
      const data = this.data()
      this.theme()
      if (file || data) {
        this.renderContent(file, data)
      }
    })
  }

  ngOnInit(): void {
    this.el.nativeElement.style.opacity = '0'
  }

  async ngAfterViewInit(): Promise<void> {
    // Render the projected content when no file or data input is provided.
    if (!this.file() && !this.data()) {
      await this.renderContent()
    }
  }

  private async renderContent(file?: string, data?: string): Promise<void> {
    await this.checkTheme()
    if (file) {
      await this.renderFromFile(file)
    } else if (data) {
      await this.renderFromString(data)
    } else {
      await this.renderFromString(this.el.nativeElement.innerHTML, true)
    }
    this.el.nativeElement.style.opacity = '1'
  }

  private async renderFromFile(file: string): Promise<void> {
    if (!this.http) {
      throw new Error(
        '[nge-markdown] When using the `file` attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information'
      )
    }
    const markdown = await firstValueFrom(this.http.get(file, { responseType: 'text' }))
    await this.renderFromString(markdown)
  }

  private async renderFromString(markdown: string, isHtmlString = false) {
    const tokens = await this.markdownService.compile({
      target: this.el.nativeElement,
      markdown,
      isHtmlString,
      contributions: this.contributions,
    })
    this.render.emit(tokens)
    this.changeDetectorRef.markForCheck()
  }

  private async checkTheme(): Promise<void> {
    if (this.theme()) {
      const themeInfo = this.themes?.find((theme) => theme.name === this.theme())
      if (themeInfo) {
        await firstValueFrom(this.resourceLoader.loadAllSync([['style', themeInfo.styleUrl]])).catch()
      }
    }

    const { darkThemeClassName } = this.markdownService.config
    if (darkThemeClassName) {
      // TODO: support angular universal
      this.isDark =
        document.querySelector(darkThemeClassName.startsWith('.') ? darkThemeClassName : `.${darkThemeClassName}`) !=
        null
    }
  }
}
