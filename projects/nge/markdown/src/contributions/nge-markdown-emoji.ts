import {
    Inject,
    Injectable,
    InjectionToken,
    Optional,
    Provider,
} from '@angular/core';
import { NgeMarkdownTransformer } from '../nge-markdown-transformer';
import {
    NgeMarkdownContribution,
    NGE_MARKDOWN_CONTRIBUTION,
} from '../nge-markdown-contribution';


/** Options to pass to `NgeMarkdownEmoji` contribution. */
export interface NgeMarkdownEmojiOptions {
    /** URL to load joypixels script (default https://cdn.jsdelivr.net/npm/emoji-toolkit@6.0.1/lib/js/joypixels.min.js). */
    url: string;
}

/** Injection token to pass custom options to `NgeMarkdownEmoji` contribution. */
export const NGE_MARKDOWN_EMOJI_OPTIONS = new InjectionToken<
    NgeMarkdownEmojiOptions
>('NGE_MARKDOWN_EMOJI_OPTIONS');

/**
 * Contribution to use emoji in markdown using [emoji-toolkit](https://github.com/joypixels/emoji-toolkit) library.
 */
@Injectable()
export class NgeMarkdownEmoji implements NgeMarkdownContribution {
    constructor(
        @Optional()
        @Inject(NGE_MARKDOWN_EMOJI_OPTIONS)
        private readonly options: NgeMarkdownEmojiOptions
    ) {
        this.options = options || {};
        this.options.url = this.options.url || 'https://cdn.jsdelivr.net/npm/emoji-toolkit@6.0.1/lib/js/joypixels.min.js';
    }

    dependencies() {
        const deps: any[] = [];
        if (!('joypixels' in window)) {
            deps.push(
                ['script', this.options.url]
            );
        }
        return deps;
    }

    contribute(transformer: NgeMarkdownTransformer) {
        transformer.addMarkdownTransformer((markdown) => {
            const { joypixels } = window as any;
            const lines = markdown.split('\n');
            const length = lines.length;
            let insideCodeBlock = false;
            for (let i = 0; i < length; i++) {
                const curr = lines[i];
                if (curr.startsWith('```')) {
                    insideCodeBlock = !insideCodeBlock;
                }
                if (insideCodeBlock) {
                    continue;
                }
                lines[i] = joypixels.shortnameToUnicode(lines[i]);
            }
            return lines.join('\n');
        });
    }
}

/**
 * Provider to register `NgeMarkdownEmoji` contribution.
 */
export const NgeMarkdownEmojiProvider: Provider = {
    provide: NGE_MARKDOWN_CONTRIBUTION,
    multi: true,
    useClass: NgeMarkdownEmoji,
};

/**
 * Provider to pass options to `NgeMarkdownEmoji` contribution.
 * @param options `NgeMarkdownEmoji` options.
 */
export function NgeMarkdownEmojiOptionsProvider(options: NgeMarkdownEmojiOptions): Provider {
    return {
        provide: NGE_MARKDOWN_EMOJI_OPTIONS,
        useValue: options,
    };
}
