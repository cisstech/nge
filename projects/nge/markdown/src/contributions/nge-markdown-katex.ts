import { Injectable, InjectionToken, Provider, inject } from '@angular/core'
import { NgeMarkdownTransformer } from '../nge-markdown-transformer'
import { NgeMarkdownContribution, NGE_MARKDOWN_CONTRIBUTION } from '../nge-markdown-contribution'

/** Custom options to pass to NgeMarkdownKatex contribution. */
export interface NgeMarkdownKatexOptions {
  /** Base url to load katex scripts and styles. (default https://cdn.jsdelivr.net/npm/katex@0.15.1/dist) */
  baseUrl?: string
  /** Options to pass to katex render function. https://katex.org/docs/options.html */
  options?: Record<string, any>
  /** Katex extensions to include. https://katex.org/docs/libs.html  */
  extensions?: {
    /** https://github.com/Khan/KaTeX/tree/master/contrib/mhchem (default to `true`) */
    mhchem?: boolean
    /** https://github.com/Khan/KaTeX/tree/master/contrib/copy-tex (default to `true`) */
    copyTex?: boolean
  }
}

/** Custom options to pass to NgeMarkdownKatex contribution. */
export const NGE_MARKDOWN_KATEX_OPTIONS = new InjectionToken<NgeMarkdownKatexOptions>('NGE_MARKDOWN_KATEX_OPTIONS')

/**
 * Contribution to render math expressions in markdown using [Katex](https://katex.org) library.
 */
@Injectable()
export class NgeMarkdownKatex implements NgeMarkdownContribution {
  private readonly options: NgeMarkdownKatexOptions =
    inject<NgeMarkdownKatexOptions>(NGE_MARKDOWN_KATEX_OPTIONS, { optional: true }) ?? {}

  constructor() {
    this.options.extensions = this.options.extensions || {}
    this.options.extensions.mhchem = this.options.extensions.mhchem ?? true
    this.options.extensions.copyTex = this.options.extensions.copyTex ?? true
  }

  dependencies() {
    // KaTeX ships as browser scripts; under SSR declare no dependencies and let
    // the math render on the client after hydration.
    if (typeof window === 'undefined' || 'katex' in window) {
      return []
    }

    let baseUrl = this.options?.baseUrl || 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/'
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/'
    }

    const deps = [
      ['style', `${baseUrl}katex.min.css`],
      ['script', `${baseUrl}katex.js`],
      ['script', `${baseUrl}contrib/auto-render.js`],
    ]

    if (this.options.extensions?.copyTex) {
      deps.push(['script', `${baseUrl}contrib/copy-tex.min.js`])
    }

    if (this.options.extensions?.mhchem) {
      deps.push(['script', `${baseUrl}contrib/mhchem.js`])
    }

    return deps as any
  }

  contribute(transformer: NgeMarkdownTransformer) {
    // Display math ($$...$$ and \[...\]) spans several lines, so protect it from
    // the markdown parser before lexing. Otherwise a line that starts with "- "
    // (a negative term in an equation, for instance) is turned into a bullet list
    // before KaTeX ever sees it. Each block is stashed and restored verbatim just
    // before rendering. See https://github.com/cisstech/nge/issues/335.
    const mathBlocks: string[] = []
    transformer.addMarkdownTransformer((markdown) =>
      // The first branch matches (and preserves) fenced or inline code, so a `$$`
      // shown as an example inside code is left untouched.
      markdown.replace(
        /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`)|(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\])/g,
        (match, code: string | undefined, math: string | undefined) => {
          if (code != null) return code
          const index = mathBlocks.push(math as string) - 1
          return `\n\n<div class="nge-markdown-math" data-math="${index}"></div>\n\n`
        }
      )
    )

    transformer.addHtmlTransformer((element) => {
      Array.from(element.querySelectorAll<HTMLElement>('.nge-markdown-math')).forEach((placeholder) => {
        const holder = element.ownerDocument.createElement('div')
        holder.textContent = mathBlocks[Number(placeholder.getAttribute('data-math'))] ?? ''
        placeholder.parentNode?.replaceChild(holder, placeholder)
      })

      // KaTeX renders in the browser; under SSR leave the math placeholders for
      // the client to render after hydration.
      if (typeof window === 'undefined') {
        return
      }

      const { renderMathInElement } = window as any
      try {
        renderMathInElement(
          element,
          this.options.options || {
            delimiters: [
              { left: '$$', right: '$$', display: false },
              { left: '$', right: '$', display: false },
              { left: '\\(', right: '\\)', display: false },
              { left: '\\[', right: '\\]', display: false },
            ],
          }
        )
      } catch (error) {
        console.error(error)
      }
    })
  }
}

/**
 * Provider to render math expressions in markdown using [Katex](https://katex.org) library.
 */
export const NgeMarkdownKatexProvider: Provider = {
  provide: NGE_MARKDOWN_CONTRIBUTION,
  multi: true,
  useClass: NgeMarkdownKatex,
}

/**
 * Provider to pass options to `NgeMarkdownKatex` contribution.
 * @param options `NgeMarkdownKatex` options.
 */
export function NgeMarkdownKatexOptionsProvider(options: NgeMarkdownKatexOptions): Provider {
  return {
    provide: NGE_MARKDOWN_KATEX_OPTIONS,
    useValue: options,
  }
}
