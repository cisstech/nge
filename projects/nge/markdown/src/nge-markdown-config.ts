import { marked } from 'marked';
import { InjectionToken, Provider } from '@angular/core';

/**
 * Global configuration of NgeMarkdownModule
 */
export declare type NgeMarkdownConfig = Omit<
  marked.MarkedOptions,
  'highlight' | 'langPrefix'
>;

export interface NgeMarkdownTheme {
  name: string;
  styleUrl: string;
}

export const NGE_MARKDOWN_CONFIG = new InjectionToken<NgeMarkdownConfig>(
  'NGE_MARKDOWN_CONFIG'
);


export const NGE_MARKDOWN_THEMES = new InjectionToken<NgeMarkdownTheme>(
  'NGE_MARKDOWN_THEMES'
);


export const NgeMarkdownThemeProvider = (
  ...themes: NgeMarkdownTheme[]
): Provider[] => themes.map((theme) => ({
  provide: NGE_MARKDOWN_THEMES,
  useValue: theme,
  multi: true
}));
