import { Injectable, InjectionToken, Provider, inject } from '@angular/core'
import { NgeMarkdownTransformer } from '../nge-markdown-transformer'
import { NgeMarkdownContribution, NGE_MARKDOWN_CONTRIBUTION } from '../nge-markdown-contribution'

/** Options to pass to `NgeMarkdownEmoji` contribution. */
export interface NgeMarkdownEmojiOptions {
  /** URL to load joypixels script (default https://cdn.jsdelivr.net/npm/emoji-toolkit@6.0.1/lib/js/joypixels.min.js). */
  url: string
}

/** Injection token to pass custom options to `NgeMarkdownEmoji` contribution. */
export const NGE_MARKDOWN_EMOJI_OPTIONS = new InjectionToken<NgeMarkdownEmojiOptions>('NGE_MARKDOWN_EMOJI_OPTIONS')

/**
 * Contribution to use emoji in markdown using [emoji-toolkit](https://github.com/joypixels/emoji-toolkit) library.
 */
@Injectable()
export class NgeMarkdownEmoji implements NgeMarkdownContribution {
  private readonly options: NgeMarkdownEmojiOptions = inject<NgeMarkdownEmojiOptions>(NGE_MARKDOWN_EMOJI_OPTIONS, {
    optional: true,
  }) ?? { url: 'https://cdn.jsdelivr.net/npm/emoji-toolkit@8.0.0/lib/js/joypixels.min.js' }

  dependencies() {
    const deps: any[] = []
    // joypixels is a browser script; under SSR declare no dependency and let the
    // emoji shortcodes resolve on the client after hydration.
    if (typeof window !== 'undefined' && !('joypixels' in window)) {
      deps.push(['script', this.options.url])
    }
    return deps
  }

  contribute(transformer: NgeMarkdownTransformer) {
    transformer.addMarkdownTransformer((markdown) => {
      // joypixels only exists in the browser; leave shortcodes untouched on the
      // server so they resolve after hydration.
      if (typeof window === 'undefined' || !('joypixels' in window)) {
        return markdown
      }
      const { joypixels } = window as any
      const lines = markdown.split('\n')
      const length = lines.length
      let insideCodeBlock = false
      for (let i = 0; i < length; i++) {
        const curr = lines[i]
        if (curr.startsWith('```')) {
          insideCodeBlock = !insideCodeBlock
        }
        if (insideCodeBlock) {
          continue
        }
        if (lines[i].match(/:[a-z0-9_+-]+:/g)) {
          lines[i] = joypixels.shortnameToUnicode(lines[i])
        }
      }
      return lines.join('\n')
    })
  }
}

/**
 * Provider to register `NgeMarkdownEmoji` contribution.
 *
 * @deprecated Use `provideNgeMarkdown(withEmoji())` instead; will be removed in the next major.
 */
export const NgeMarkdownEmojiProvider: Provider = {
  provide: NGE_MARKDOWN_CONTRIBUTION,
  multi: true,
  useClass: NgeMarkdownEmoji,
}

/**
 * Provider to pass options to `NgeMarkdownEmoji` contribution.
 * @param options `NgeMarkdownEmoji` options.
 *
 * @deprecated Use `provideNgeMarkdown(withEmoji(options))` instead; will be removed in the next major.
 */
export function NgeMarkdownEmojiOptionsProvider(options: NgeMarkdownEmojiOptions): Provider {
  return {
    provide: NGE_MARKDOWN_EMOJI_OPTIONS,
    useValue: options,
  }
}
