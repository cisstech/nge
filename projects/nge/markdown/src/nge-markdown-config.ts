import { InjectionToken, Provider } from '@angular/core';
import { MarkedOptions } from 'marked';

/**
 * Global configuration of NgeMarkdownModule
 */
export declare type NgeMarkdownConfig = MarkedOptions

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
