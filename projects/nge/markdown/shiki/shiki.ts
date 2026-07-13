import { isPlatformServer } from '@angular/common'
import { DOCUMENT, PLATFORM_ID, inject, provideAppInitializer } from '@angular/core'
import {
  NGE_MARKDOWN_CONFIG,
  NGE_MARKDOWN_CONTRIBUTION,
  NGE_MARKDOWN_HIGHLIGHTER_SERVICE,
  NgeMarkdownFeature,
  NgeMarkdownHighlighter,
  NgeMarkdownHighlighterService,
} from '@cisstech/nge/markdown'

/** Options of the shiki highlighter (`withShiki`). */
export interface NgeMarkdownShikiOptions {
  /**
   * Shiki theme per color scheme. Both palettes are emitted as CSS variables,
   * so switching schemes never re-highlights. Default:
   * `{ light: 'github-light', dark: 'github-dark' }`.
   */
  themes?: { light: string; dark: string }
  /**
   * Languages preloaded on the server before the first render. Server
   * rendering snapshots the page as soon as the app is stable, and a grammar
   * loading mid-render is not tracked as pending work: a language outside this
   * list may render unhighlighted in the prerendered HTML (the client pass
   * still highlights it). Defaults to the common web stack.
   */
  langs?: string[]
}

/** Languages warmed up for server rendering when `langs` is not customized. */
export const NGE_MARKDOWN_SHIKI_DEFAULT_LANGS = [
  'bash',
  'css',
  'html',
  'javascript',
  'json',
  'markdown',
  'scss',
  'shell',
  'typescript',
  'yaml',
]

/**
 * Loads shiki and the configured grammars ahead of the first render, so every
 * `codeToHtml` call during server rendering resolves without async grammar
 * fetches. Called by `withShiki` through an app initializer on the server.
 */
export async function preloadShiki(options: NgeMarkdownShikiOptions = {}): Promise<void> {
  const themes = options.themes ?? { light: 'github-light', dark: 'github-dark' }
  const langs = options.langs ?? NGE_MARKDOWN_SHIKI_DEFAULT_LANGS
  const { codeToHtml } = await import('shiki')
  await Promise.all(langs.map((lang) => codeToHtml('', { lang, themes, defaultColor: false }).catch(() => undefined)))
}

const THEME_STYLE_ID = 'nge-markdown-shiki'

/**
 * Highlighter service backed by [shiki](https://shiki.style). Unlike the monaco
 * colorizer it also runs during server rendering, so prerendered pages ship
 * highlighted HTML. Shiki is an optional peer dependency, imported lazily on
 * the first code block.
 */
export function shikiHighlighterService(options: NgeMarkdownShikiOptions = {}): NgeMarkdownHighlighterService {
  const themes = options.themes ?? { light: 'github-light', dark: 'github-dark' }
  return {
    ssr: true,
    highligtht: async (injector, highlight) => {
      const code = highlight.element
      // domino (the server DOM) lacks parentElement; parentNode is universal.
      const pre = (code.parentElement ?? code.parentNode) as HTMLElement | null
      if (!pre) {
        return
      }

      const { codeToHtml } = await import('shiki')
      let html: string
      try {
        html = await codeToHtml(code.textContent ?? '', {
          lang: highlight.language || 'plaintext',
          themes,
          defaultColor: false,
        })
      } catch {
        // Unknown language: leave the block as plain text.
        return
      }

      // Graft shiki's output onto the existing block: its pre carries the theme
      // variables, its code the highlighted lines.
      const document = injector.get(DOCUMENT)
      const holder = document.createElement('div')
      holder.innerHTML = html
      const shikiPre = holder.querySelector('pre')
      const shikiCode = holder.querySelector('pre > code')
      if (!shikiPre || !shikiCode) {
        return
      }
      pre.setAttribute('class', shikiPre.getAttribute('class') ?? 'shiki')
      pre.setAttribute('style', shikiPre.getAttribute('style') ?? '')
      code.innerHTML = shikiCode.innerHTML

      decorateLines(pre, code, highlight.lines, highlight.highlights)
      ensureThemeStyle(document, injector.get(NGE_MARKDOWN_CONFIG, null)?.darkThemeClassName)
    },
  }
}

/**
 * Highlight fenced code blocks with [shiki](https://shiki.style). Unlike
 * `withHighlighter`, it also runs during server rendering: prerendered pages
 * ship highlighted HTML, and both color schemes are emitted as CSS variables so
 * theme switches never re-highlight.
 *
 * Import from `@cisstech/nge/markdown/shiki`: shiki lives behind this entry
 * point, so only apps that opt into it pull the SDK and need the `shiki`
 * dependency installed.
 */
export function withShiki(options?: NgeMarkdownShikiOptions): NgeMarkdownFeature {
  return {
    providers: [
      { provide: NGE_MARKDOWN_CONTRIBUTION, multi: true, useClass: NgeMarkdownHighlighter },
      { provide: NGE_MARKDOWN_HIGHLIGHTER_SERVICE, useValue: shikiHighlighterService(options) },
      // On the server, grammars must be loaded before the first render: the page
      // is serialized at stability, and a grammar fetched mid-render is not
      // tracked as pending work. The browser keeps lazy loading.
      provideAppInitializer(() => {
        if (isPlatformServer(inject(PLATFORM_ID))) {
          return preloadShiki(options)
        }
        return undefined
      }),
    ],
  }
}

/**
 * Applies the fence options shared with the monaco colorizer: `highlights`
 * marks lines, `lines` shows line numbers (a single value numbers every line
 * from it, a list only the listed ones, always with their real line number).
 */
function decorateLines(pre: HTMLElement, code: HTMLElement, lines?: string, highlights?: string): void {
  const spans = Array.from(code.querySelectorAll('.line'))

  for (const n of parseLineNumbers(highlights ?? '')) {
    const span = spans[n - 1]
    span?.setAttribute('class', `${span.getAttribute('class') ?? ''} nge-highlighted`.trim())
  }

  const numbered = parseLineNumbers(lines ?? '')
  if (!numbered.length) {
    return
  }
  if (numbered.length === 1) {
    for (let n = numbered[0] + 1; n <= spans.length; n++) {
      numbered.push(n)
    }
  }
  pre.setAttribute('class', `${pre.getAttribute('class') ?? ''} nge-numbered`.trim())
  for (const n of numbered) {
    spans[n - 1]?.setAttribute('data-line', `${n}`)
  }
}

/** `"2 4-7 9"` -> `[2, 4, 5, 6, 7, 9]`. */
function parseLineNumbers(spec: string): number[] {
  const numbers: number[] = []
  for (const part of spec.split(' ').filter(Boolean)) {
    const range = part.match(/^(\d+)-(\d+)$/)
    if (range) {
      for (let n = Number(range[1]); n <= Number(range[2]); n++) {
        numbers.push(n)
      }
    } else if (/^\d+$/.test(part)) {
      numbers.push(Number(part))
    }
  }
  return [...new Set(numbers)]
}

/**
 * Activates the light palette by default and the dark one under the configured
 * dark class(es), by pointing the shiki CSS variables at the current scheme.
 */
function ensureThemeStyle(document: Document, darkThemeClassName?: string | string[]): void {
  if (document.getElementById(THEME_STYLE_ID)) {
    return
  }
  const darkClasses = darkThemeClassName ? [darkThemeClassName].flat() : ['dark-theme']
  const dark = darkClasses
    .map(
      (name) =>
        `.${name} .shiki, .${name} .shiki span { color: var(--shiki-dark); background-color: var(--shiki-dark-bg); }`
    )
    .join('\n')
  const style = document.createElement('style')
  style.id = THEME_STYLE_ID
  style.textContent = [
    '.shiki, .shiki span { color: var(--shiki-light); background-color: var(--shiki-light-bg); }',
    dark,
    '.shiki { padding: 0.75em 1em; border-radius: 6px; overflow: auto; }',
    '.shiki .nge-highlighted { display: inline-block; width: 100%; background-color: color-mix(in srgb, currentColor 12%, transparent); }',
    '.shiki.nge-numbered .line::before { content: attr(data-line); display: inline-block; min-width: 2.5ch; margin-right: 1.25em; text-align: right; opacity: 0.45; }',
  ].join('\n')
  document.head.appendChild(style)
}
