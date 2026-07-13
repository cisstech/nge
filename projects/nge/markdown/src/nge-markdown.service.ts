import { Injectable, inject } from '@angular/core'
import { MarkedOptions, marked } from 'marked'
import { NgeMarkdownContribution } from './nge-markdown-contribution'
import { NgeMarkdownConfig, NGE_MARKDOWN_CONFIG } from './nge-markdown-config'
import { NgeMarkdownTransformer } from './nge-markdown-transformer'
import { ResourceLoaderService } from '@cisstech/nge/services'
import { lastValueFrom } from 'rxjs'

/**
 * Markdown compiler service.
 */
@Injectable({
  providedIn: 'root',
})
export class NgeMarkdownService {
  readonly config: NgeMarkdownConfig = inject<NgeMarkdownConfig>(NGE_MARKDOWN_CONFIG, { optional: true }) ?? {}
  private readonly resourceLoader = inject(ResourceLoaderService)

  /**
   * Compiles a markdown string to an html string.
   * @param options compilation options.
   * @returns A promise that resolve with the AST of the compiled markdown
   * (with the modifications of the contributions).
   */
  async compile(options: NgeMarkdownCompileOptions) {
    let markdown = this.trimIndent(options.markdown)
    if (options.isHtmlString) {
      markdown = this.decodeHtml(markdown)
    }

    const transformer = await this.createTransformer(options)
    const renderer = this.renderer(transformer)
    const tokenizer = this.tokenizer(transformer)

    const markedOptions: MarkedOptions = {
      gfm: true,
      ...this.config,
      renderer,
      tokenizer,
    }

    markdown = transformer.transformMarkdown(markdown)

    const tokens = transformer.transformAst(marked.lexer(markdown, markedOptions))

    options.target.innerHTML = marked.parser(tokens, markedOptions)

    await transformer.transformHTML(options.target)

    return tokens
  }

  private async createTransformer(options: NgeMarkdownCompileOptions) {
    const contributions = [...(options.contributions || [])]
    const transformer = new NgeMarkdownTransformer(this.config)
    const dependencies: ['style' | 'script', string][] = []
    for (const contrib of contributions) {
      if (contrib.dependencies) {
        dependencies.push(...contrib.dependencies())
      }
      contrib.contribute(transformer)
    }

    // Try to fix the issues described here by loading monaco editor
    // after all the other scripts.
    // https://stackoverflow.com/a/33635881
    // https://github.com/microsoft/monaco-editor/issues/662
    // https://github.com/microsoft/monaco-editor/issues/1249
    // Monaco's AMD loader clobbers a global `define`; neutralize it while the
    // dependency scripts load, then restore. Browser-only and a no-op on the
    // server (no window), which also keeps this module importable at prerender.
    const scope = typeof window !== 'undefined' ? (window as unknown as Record<string, unknown>) : undefined
    const define = scope?.['define']
    if (scope) {
      scope['define'] = undefined
    }
    await lastValueFrom(this.resourceLoader.loadAllSync(dependencies))
    if (scope) {
      scope['define'] = define
    }
    return transformer
  }

  private renderer(transformer: NgeMarkdownTransformer) {
    const renderer = transformer.transformRenderer(this.config?.renderer || new marked.Renderer())
    return renderer
  }

  private tokenizer(transformer: NgeMarkdownTransformer) {
    return transformer.transformTokenizer(this.config?.tokenizer || new marked.Tokenizer())
  }

  private decodeHtml(html: string): string {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = html
    return textarea.value
  }

  private trimIndent(markdown: string): string {
    if (!markdown) {
      return ''
    }

    let indentStart: number
    return markdown
      .split('\n')
      .map((line) => {
        let lineIdentStart = indentStart
        if (line.length > 0) {
          lineIdentStart = isNaN(lineIdentStart) ? line.search(/\S|$/) : Math.min(line.search(/\S|$/), lineIdentStart)
        }
        if (isNaN(indentStart)) {
          indentStart = lineIdentStart
        }
        return lineIdentStart ? line.substring(lineIdentStart) : line
      })
      .join('\n')
  }
}

/**
 * Parameters of NgeMarkdownService `compile` method.
 */
interface NgeMarkdownCompileOptions {
  /** Markdown string to compile. */
  markdown: string
  /** HTMLElement on which to render the compiled markdown.  */
  target: HTMLElement
  /** Is the markdown contains html code? */
  isHtmlString?: boolean
  /** List of contribution to use during the compilation. */
  contributions?: NgeMarkdownContribution[]
}
