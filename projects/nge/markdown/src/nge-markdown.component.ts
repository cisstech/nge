import { HttpClient } from '@angular/common/http'
import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EnvironmentInjector,
  HostBinding,
  OnDestroy,
  OnInit,
  Type,
  createComponent,
  effect,
  inject,
  output,
  input,
} from '@angular/core'
import { ResourceLoaderService } from '@cisstech/nge/services'
import type { TokensList } from 'marked'
import { firstValueFrom } from 'rxjs'
import { NGE_MARKDOWN_COMPONENTS } from './nge-markdown-components'
import { NGE_MARKDOWN_THEMES, NgeMarkdownTheme } from './nge-markdown-config'
import { NGE_MARKDOWN_CONTRIBUTION, NgeMarkdownContribution } from './nge-markdown-contribution'
import { NgeMarkdownService } from './nge-markdown.service'

@Component({
  selector: 'nge-markdown, [nge-markdown]',
  templateUrl: 'nge-markdown.component.html',
  styleUrls: ['nge-markdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgeMarkdownComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly el: ElementRef<HTMLElement> = inject(ElementRef)
  private readonly http = inject(HttpClient, { optional: true })
  private readonly markdownService = inject(NgeMarkdownService)
  private readonly resourceLoader = inject(ResourceLoaderService)
  private readonly changeDetectorRef = inject(ChangeDetectorRef)
  private readonly appRef = inject(ApplicationRef)
  private readonly environmentInjector = inject(EnvironmentInjector)
  private readonly components = inject(NGE_MARKDOWN_COMPONENTS, { optional: true })
  private readonly themes = inject(NGE_MARKDOWN_THEMES, { optional: true }) as unknown as NgeMarkdownTheme[]
  private readonly contributions = inject(NGE_MARKDOWN_CONTRIBUTION, {
    optional: true,
  }) as unknown as NgeMarkdownContribution[]

  private isDark = false
  private embedded: ComponentRef<unknown>[] = []

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

  /**
   * An event that emits once the content has been mounted and revealed (the host
   * opacity is set to `1`), i.e. after `render` and after embedded components are
   * mounted. Use it to know the page has actually painted, for example to hide a
   * loading placeholder without a flash.
   */
  readonly rendered = output<void>()

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

  ngOnDestroy(): void {
    this.destroyEmbeddedComponents()
  }

  private async renderContent(file?: string, data?: string): Promise<void> {
    // Tear down the previous embeds before the content that hosts them is replaced.
    this.destroyEmbeddedComponents()
    await this.checkTheme()
    if (file) {
      await this.renderFromFile(file)
    } else if (data) {
      await this.renderFromString(data)
    } else {
      await this.renderFromString(this.el.nativeElement.innerHTML, true)
    }
    await this.mountEmbeddedComponents()
    this.el.nativeElement.style.opacity = '1'
    this.rendered.emit()
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
      const classNames = Array.isArray(darkThemeClassName) ? darkThemeClassName : [darkThemeClassName]
      this.isDark = classNames.some(
        (name) => document.querySelector(name.startsWith('.') ? name : `.${name}`) != null
      )
    }
  }

  /** Mounts the registered component for every keyword tag present in the rendered output. */
  private async mountEmbeddedComponents(): Promise<void> {
    if (!this.components) {
      return
    }
    const host = this.el.nativeElement
    for (const [tag, loader] of Object.entries(this.components)) {
      const elements = Array.from(host.querySelectorAll<HTMLElement>(tag))
      if (!elements.length) {
        continue
      }
      const loaded = await loader()
      const type = (
        loaded && typeof loaded === 'object' && 'default' in loaded ? loaded.default : loaded
      ) as Type<unknown>
      for (const element of elements) {
        // Read the author's attributes before createComponent adds Angular's own
        // (ng-version, host markers), which are not inputs.
        const attributes = Array.from(element.attributes).map((attr) => ({ name: attr.name, value: attr.value }))
        const ref = createComponent(type, { environmentInjector: this.environmentInjector, hostElement: element })
        for (const attr of attributes) {
          if (attr.name === 'class' || attr.name === 'style' || attr.name === 'id') {
            continue
          }
          try {
            ref.setInput(attr.name, attr.value)
          } catch {
            // The attribute is not a declared input; leave it as a plain attribute.
          }
        }
        this.appRef.attachView(ref.hostView)
        ref.changeDetectorRef.detectChanges()
        this.embedded.push(ref)
      }
    }
  }

  /** Destroys the components mounted by the previous render so nothing leaks. */
  private destroyEmbeddedComponents(): void {
    this.embedded.forEach((ref) => ref.destroy())
    this.embedded = []
  }
}
