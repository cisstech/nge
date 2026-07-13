import { EnvironmentProviders, Provider, Type, makeEnvironmentProviders } from '@angular/core'
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

function contribution(type: Type<NgeMarkdownContribution>): Provider {
  return { provide: NGE_MARKDOWN_CONTRIBUTION, multi: true, useClass: type }
}

function monacoHighlighter(colorizer: Type<unknown>): Provider {
  return { provide: NGE_MARKDOWN_HIGHLIGHTER_SERVICE, useValue: monacoHighlighterService(colorizer) }
}
