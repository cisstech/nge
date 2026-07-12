import {
  EnvironmentProviders,
  PLATFORM_ID,
  Provider,
  Type,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core'
import { isPlatformServer } from '@angular/common'
import { NgeMarkdownAdmonitions } from './contributions/nge-markdown-admonitions'
import {
  NGE_MARKDOWN_EMOJI_OPTIONS,
  NgeMarkdownEmoji,
  NgeMarkdownEmojiOptions,
} from './contributions/nge-markdown-emoji'
import {
  NGE_MARKDOWN_HIGHLIGHTER_SERVICE,
  NgeMarkdownHighlighter,
  monacoHighlighterService,
} from './contributions/nge-markdown-highlighter'
import { NgeMarkdownIcons } from './contributions/nge-markdown-icons'
import { NgeMarkdownShikiOptions, preloadShiki, shikiHighlighterService } from './contributions/nge-markdown-shiki'
import { NGE_MARKDOWN_STACKBLITZ, NgeMarkdownStackblitzOptions } from './contributions/nge-markdown-stackblitz'
import {
  NGE_MARKDOWN_KATEX_OPTIONS,
  NgeMarkdownKatex,
  NgeMarkdownKatexOptions,
} from './contributions/nge-markdown-katex'
import { NgeMarkdownLinkAnchor } from './contributions/nge-markdown-link-anchor'
import { NgeMarkdownTabbedSet } from './contributions/nge-markdown-tabbed-set'
import { NGE_MARKDOWN_COMPONENTS, NgeMarkdownComponents } from './nge-markdown-components'
import { NGE_MARKDOWN_CONFIG, NGE_MARKDOWN_THEMES, NgeMarkdownConfig, NgeMarkdownTheme } from './nge-markdown-config'
import { NgeMarkdownContribution, NGE_MARKDOWN_CONTRIBUTION } from './nge-markdown-contribution'

/** A configuration feature for {@link provideNgeMarkdown}. */
export interface NgeMarkdownFeature {
  readonly providers: (Provider | EnvironmentProviders)[]
}

/**
 * Configure the markdown renderer at the application root, composing features:
 *
 * ```ts
 * providers: [
 *   provideNgeMarkdown(
 *     withThemes({ name: 'github', styleUrl: 'assets/nge/markdown/themes/github.css' }),
 *     withKatex(),
 *     withHighlighter(NgeMonacoColorizerService),
 *   ),
 * ]
 * ```
 */
export function provideNgeMarkdown(...features: NgeMarkdownFeature[]): EnvironmentProviders {
  return makeEnvironmentProviders(features.flatMap((feature) => feature.providers))
}

/** Global markdown options (dark theme class name...). */
export function withConfig(config: NgeMarkdownConfig | (() => NgeMarkdownConfig)): NgeMarkdownFeature {
  return {
    providers: [
      typeof config === 'function'
        ? { provide: NGE_MARKDOWN_CONFIG, useFactory: config }
        : { provide: NGE_MARKDOWN_CONFIG, useValue: config },
    ],
  }
}

/** Register stylesheet themes; the active one is picked by name. */
export function withThemes(...themes: NgeMarkdownTheme[]): NgeMarkdownFeature {
  return { providers: themes.map((theme) => ({ provide: NGE_MARKDOWN_THEMES, useValue: theme, multi: true })) }
}

/** Angular components instantiable from markdown through their custom element tag. */
export function withComponents(components: NgeMarkdownComponents): NgeMarkdownFeature {
  return { providers: [{ provide: NGE_MARKDOWN_COMPONENTS, useValue: components }] }
}

/** Render math expressions with [KaTeX](https://katex.org). */
export function withKatex(options?: NgeMarkdownKatexOptions): NgeMarkdownFeature {
  return {
    providers: [
      contribution(NgeMarkdownKatex),
      ...(options ? [{ provide: NGE_MARKDOWN_KATEX_OPTIONS, useValue: options }] : []),
    ],
  }
}

/** Render emoji short codes (`:smile:`) with [joypixels](https://www.joypixels.com). */
export function withEmoji(options?: NgeMarkdownEmojiOptions): NgeMarkdownFeature {
  return {
    providers: [
      contribution(NgeMarkdownEmoji),
      ...(options ? [{ provide: NGE_MARKDOWN_EMOJI_OPTIONS, useValue: options }] : []),
    ],
  }
}

/** Render icon short codes (`@mdi/react`-style) inside markdown. */
export function withIcons(): NgeMarkdownFeature {
  return { providers: [contribution(NgeMarkdownIcons)] }
}

/** Group content under `=== "Tab"` markers into tabbed sets. */
export function withTabbedSet(): NgeMarkdownFeature {
  return { providers: [contribution(NgeMarkdownTabbedSet)] }
}

/** Add anchor links to headings. */
export function withLinkAnchor(): NgeMarkdownFeature {
  return { providers: [contribution(NgeMarkdownLinkAnchor)] }
}

/** Render `:::` admonition blocks (note, warning...). */
export function withAdmonitions(): NgeMarkdownFeature {
  return { providers: [contribution(NgeMarkdownAdmonitions)] }
}

/**
 * Highlight fenced code blocks. Pass the `NgeMonacoColorizerService` type (from
 * `@cisstech/nge/monaco`) to colorize with Monaco; it is a parameter, not an
 * import, so markdown does not depend on monaco.
 */
export function withHighlighter(colorizer?: Type<unknown>): NgeMarkdownFeature {
  return {
    providers: [contribution(NgeMarkdownHighlighter), ...(colorizer ? [monacoHighlighter(colorizer)] : [])],
  }
}

/**
 * Highlight fenced code blocks with [shiki](https://shiki.style). Unlike
 * {@link withHighlighter}, it also runs during server rendering: prerendered
 * pages ship highlighted HTML, and both color schemes are emitted as CSS
 * variables so theme switches never re-highlight. Requires the optional
 * `shiki` peer dependency.
 */
export function withShiki(options?: NgeMarkdownShikiOptions): NgeMarkdownFeature {
  return {
    providers: [
      contribution(NgeMarkdownHighlighter),
      { provide: NGE_MARKDOWN_HIGHLIGHTER_SERVICE, useValue: shikiHighlighterService(options) },
      // On the server, grammars must be loaded before the first render: the
      // page is serialized at stability, and a grammar fetched mid-render is
      // not tracked as pending work. The browser keeps lazy loading.
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
 * Add an "Open in StackBlitz" action to fenced blocks marked with the
 * `stackblitz` flag. The snippet is injected into the project scaffold you
 * configure here (files and dependencies), so the example runs exactly as you
 * set it up. Requires the optional `@stackblitz/sdk` peer dependency.
 */
export function withStackblitz(options: NgeMarkdownStackblitzOptions): NgeMarkdownFeature {
  return { providers: [{ provide: NGE_MARKDOWN_STACKBLITZ, useValue: options }] }
}

function contribution(type: Type<NgeMarkdownContribution>): Provider {
  return { provide: NGE_MARKDOWN_CONTRIBUTION, multi: true, useClass: type }
}

function monacoHighlighter(colorizer: Type<unknown>): Provider {
  return { provide: NGE_MARKDOWN_HIGHLIGHTER_SERVICE, useValue: monacoHighlighterService(colorizer) }
}
