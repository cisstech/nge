import { Inject, Injectable, InjectionToken, Optional, Provider } from '@angular/core';
import { NgeMarkdownTransformer } from '../nge-markdown-transformer';
import {
    NgeMarkdownContribution,
    NGE_MARKDOWN_CONTRIBUTION,
} from '../nge-markdown-contribution';

/** Custom options to pass to NgeMarkdownKatex contribution. */
export interface NgeMarkdownKatexOptions {
    /** Base url to load katex scripts and styles. (default https://cdn.jsdelivr.net/npm/katex@0.12.0/dist) */
    baseUrl?: string;
    /** Options to pass to katex render function. https://katex.org/docs/options.html */
    options?: Record<string, any>;
    /** Katex extensions to include. https://katex.org/docs/libs.html  */
    extensions?: {
        /** https://github.com/Khan/KaTeX/tree/master/contrib/mhchem (default to `true`) */
        mhchem?: boolean;
        /** https://github.com/Khan/KaTeX/tree/master/contrib/copy-tex (default to `true`) */
        copyTex?: boolean;
    };
}

/** Custom options to pass to NgeMarkdownKatex contribution. */
export const NGE_MARKDOWN_KATEX_OPTIONS = new InjectionToken<
    NgeMarkdownKatexOptions
>('NGE_MARKDOWN_KATEX_OPTIONS');

/**
 * Contribution to render math expressions in markdown using [Katex](https://katex.org) library.
 */
@Injectable()
export class NgeMarkdownKatex implements NgeMarkdownContribution {
    constructor(
        @Optional()
        @Inject(NGE_MARKDOWN_KATEX_OPTIONS)
        private readonly options: NgeMarkdownKatexOptions
    ) {
        this.options = options || {
            extensions: {
                mhchem: true,
                copyTex: true
            }
        };
        this.options.extensions = this.options.extensions || {};
        this.options.extensions.copyTex = this.options.extensions.copyTex ?? true;
        this.options.extensions.mhchem = this.options.extensions.mhchem ?? true;
    }

    dependencies() {
        if ('katex' in window)  {
            return [];
        }

        let baseUrl = this.options?.baseUrl || 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/';
        if (!baseUrl.endsWith('/')) {
            baseUrl += '/';
        }

        const deps = [
            ['style', `${baseUrl}katex.min.css`],
            ['script', `${baseUrl}katex.js`],
            ['script', `${baseUrl}contrib/auto-render.js`],
        ];

        if (this.options.extensions?.copyTex) {
            deps.push(
                ['style', `${baseUrl}contrib/copy-tex.min.css`],
                ['script', `${baseUrl}contrib/copy-tex.min.js`],
            );
        }

        if (this.options.extensions?.mhchem) {
            deps.push(
                ['script', `${baseUrl}contrib/mhchem.js`]
            );
        }

        return deps as any;
    }

    contribute(transformer: NgeMarkdownTransformer) {
        // pattern to search multiline latex between $$...$$ or inline latex between $...$
        // const pattern = /(\$\$\n((.|\s|\n)+?)\n\$\$)|(\$([^\s][^$\n]+?[^\s])\$)/gm;
        transformer.addHtmlTransformer((element) => {
            const { renderMathInElement } = window as any;
            try {
                renderMathInElement(element, this.options.options || {
                    delimiters: [
                        { left: '$$', right: '$$', display: false },
                        { left: '$', right: '$', display: false },
                        { left: '\\(', right: '\\)', display: false },
                        { left: '\\[', right: '\\]', display: false },
                    ],
                });
            } catch (error) {
                console.error(error);
            }
        });
    }

}

/**
 * Provider to render math expressions in markdown using [Katex](https://katex.org) library.
 */
export const NgeMarkdownKatexProvider: Provider = {
    provide: NGE_MARKDOWN_CONTRIBUTION,
    multi: true,
    useClass: NgeMarkdownKatex,
};

/**
 * Provider to pass options to `NgeMarkdownKatex` contribution.
 * @param options `NgeMarkdownKatex` options.
 */
export function NgeMarkdownKatexOptionsProvider(options: NgeMarkdownKatexOptions): Provider {
    return {
        provide: NGE_MARKDOWN_KATEX_OPTIONS,
        useValue: options,
    };
}

