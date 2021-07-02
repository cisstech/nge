import * as marked from 'marked';
import { InjectionToken } from '@angular/core';

/**
 * Global configuration of NgeMarkdownModule
 */
export declare type NgeMarkdownConfig = Omit<
    marked.MarkedOptions,
    'highlight' | 'langPrefix'
>;

export const NGE_MARKDOWN_CONFIG = new InjectionToken<NgeMarkdownConfig>(
    'NGE_MARKDOWN_CONFIG'
);
