import { Injector, InjectionToken, Injectable, Provider, Type, inject } from '@angular/core'
import { NgeMarkdownTransformer } from '../nge-markdown-transformer'
import { NgeMarkdownContribution, NGE_MARKDOWN_CONTRIBUTION } from '../nge-markdown-contribution'

const DATA_LINES = 'data-nge-md-hl-lines'
const DATA_LANGUAGE = 'data-nge-md-hl-language'
const DATA_HIGHLIGHTS = 'data-nge-md-hl-highlights'
const DATA_FILENAME = 'data-nge-md-hl-filename'

/**
 * Highlight options.
 */
export interface NgeMarkdownHighlightOptions {
  /** &lt;code&gt;&lt;/code&gt; element to colorize. */
  element: HTMLElement

  /** Target language (default plaintext) */
  language?: string

  /**
   * Start line number or a space separated list of line numbers to show.
   *
   * Example:
   *
   * *Show all line numbers starting 1*
   *
   * `"1"`
   *
   * *Show all line numbers from 1 to 4*
   *
   * `"1-4"`
   *
   * *Show lines 2 4 5 6 7 9*
   *
   * `"2 4-7 9"`
   *
   */
  lines?: string

  /**
   * A space separated list of line numbers to highlight.
   *
   * Example:
   *
   * *Highlight line 1*
   *
   * `"1"`
   *
   * *Highlight all lines from 1 to 4*
   *
   * `"1-4"`
   *
   * *Highlightw lines 2 4 5 6 7 9*
   *
   * `"2 4-7 9"`
   */
  highlights?: string

  /** Filename to display */
  filename?: string
}

/**
 * Highlighter service representation.
 */
export interface NgeMarkdownHighlighterService {
  /**
   * Function called to hightlight an HTMLElement code.
   * @param injector Injector reference to use Angular dependency injection.
   * @param options Highlight options.
   */
  highligtht?(injector: Injector, options: NgeMarkdownHighlightOptions): void | Promise<void>
}

/**
 * Injection token to register a highlighter service.
 */
export const NGE_MARKDOWN_HIGHLIGHTER_SERVICE = new InjectionToken<NgeMarkdownHighlighterService>(
  'NGE_MARKDOWN_HIGHLIGHTER_SERVICE'
)

/**
 * Contribution to add an abstract syntax highlighter.
 */
@Injectable()
export class NgeMarkdownHighlighter implements NgeMarkdownContribution {
  private readonly injector = inject(Injector)
  private readonly options = inject<NgeMarkdownHighlighterService>(NGE_MARKDOWN_HIGHLIGHTER_SERVICE, { optional: true })

  contribute(transformer: NgeMarkdownTransformer) {
    this.createAttributes(transformer)
    this.colorizeCodes(transformer)
  }

  private createAttributes(transformer: NgeMarkdownTransformer) {
    transformer.addRendererTransformer((renderer) => {
      renderer.code = (code, args) => {
        args = args || ''
        const attributes = new Map<string, string>()

        // LANGUAGE
        const language = args.split(' ').slice(0, 1).pop() || 'plaintext'
        attributes.set(DATA_LANGUAGE, language)

        // LINE NUMBERING
        let match = args.match(/lines="(.+?)"/)
        if (match) {
          attributes.set(DATA_LINES, match[1])
        }

        // LINE HIGHLIGHTING
        match = args.match(/highlights="(.+?)"/)
        if (match) {
          attributes.set(DATA_HIGHLIGHTS, match[1])
        }

        // FILENAME
        match = args.match(/filename="(.+?)"/)
        if (match) {
          attributes.set(DATA_FILENAME, match[1])
        }

        const attribs = Array.from(attributes.entries())
          .map(([attributeName, attributeValue]) => {
            return `${attributeName}="${attributeValue}"`
          })
          .join(' ')
        console.log(attribs)
        return `<pre ${attribs}><code>${this.escapeHtml(code)}</code></pre>`
      }
      return renderer
    })
  }

  private colorizeCodes(transformer: NgeMarkdownTransformer) {
    if (!this.options?.highligtht) {
      return
    }
    const highlight = this.options.highligtht
    transformer.addHtmlTransformer(async (element) => {
      // Colorizing needs the browser (monaco); under SSR the code blocks render
      // plain and are colorized on the client after hydration.
      if (typeof document === 'undefined') {
        return
      }
      const preElements = Array.from(element.querySelectorAll(`pre[${DATA_LANGUAGE}]`))
      for (const pre of preElements) {
        highlight(this.injector, {
          lines: pre.getAttribute(DATA_LINES) || '',
          element: pre.querySelector('code') as HTMLElement,
          language: pre.getAttribute(DATA_LANGUAGE) || 'plaintext',
          highlights: pre.getAttribute(DATA_HIGHLIGHTS) || '',
          filename: pre.getAttribute(DATA_FILENAME) || '',
        })
      }
    })
  }

  private escapeHtml(input: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map: any = {
      '<': '&lt;',
      '>': '&gt;',
    }
    return input.replace(/[<>]/g, (tag) => map[tag] || tag)
  }
}

/**
 * Injection token to register `NgeMarkdownHighlighter` contribution.
 *
 * @deprecated Use `provideNgeMarkdown(withHighlighter())` instead; will be removed in the next major.
 */
export const NgeMarkdownHighlighterProvider: Provider = {
  provide: NGE_MARKDOWN_CONTRIBUTION,
  multi: true,
  useClass: NgeMarkdownHighlighter,
}

/**
 * Highlighter service backed by a Monaco colorizer (`NgeMonacoColorizerService`),
 * resolved lazily through the injector so markdown never imports monaco.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function monacoHighlighterService(type: Type<any>): NgeMarkdownHighlighterService {
  return {
    highligtht: (injector, options) => {
      const colorizer = injector.get(type, null)
      const code = options.element
      const pre = code.parentElement as HTMLElement
      pre.style.margin = '0.5em 0'
      pre.style.overflow = 'auto'
      pre.style.border = '1px solid #F2F2F2'
      colorizer?.colorizeElement({
        element: code,
        language: options.language,
        code: code.textContent,
        lines: options.lines,
        filename: options.filename,
        highlights: options.highlights,
      })
    },
  } as NgeMarkdownHighlighterService
}

/**
 * Provider to register `NgeMonacoColorizerService` as the syntax highlighter.
 * @param type A reference to NgeMonacoColorizerService type.
 * @deprecated Use `provideNgeMarkdown(withHighlighter(NgeMonacoColorizerService))` instead; will be removed in the next major.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function NgeMarkdownHighlighterMonacoProvider(type: Type<any>) {
  return {
    provide: NGE_MARKDOWN_HIGHLIGHTER_SERVICE,
    useValue: monacoHighlighterService(type),
  }
}
