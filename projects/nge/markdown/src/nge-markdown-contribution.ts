import { InjectionToken } from '@angular/core';
import { NgeMarkdownTransformer } from './nge-markdown-transformer';

/**
 * Implements this interface to contribute to nge-markdown.
 */
export interface NgeMarkdownContribution {
    /**
     * List of scripts and styles dependencies to loads
     * before calling the `transform` methods.
     *
     * The dependencies are to be loaded only once.
     */
    dependencies?(): ['style'|'script', string][];

    /**
     * Contributes to nge-markdown api.
     * @param api nge-markdown api.
     */
    contribute(api: NgeMarkdownTransformer): void;
}

/** Inject this token to get the list of contributions to nge-markdown api.  */
export const NGE_MARKDOWN_CONTRIBUTION = new InjectionToken<
    NgeMarkdownContribution
>('NGE_MARKDOWN_CONTRIBUTION');
