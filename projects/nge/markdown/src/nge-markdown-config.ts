import { InjectionToken, Provider } from '@angular/core'
import { MarkedOptions } from 'marked'

/**
 * Global configuration of NgeMarkdownModule
 */
export declare type NgeMarkdownConfig = MarkedOptions & {
  /**
   * Class name (or names) indicating that the page is currently in dark mode.
   * Pass an array to match any of several dark classes across a multi-page app.
   */
  darkThemeClassName?: string | string[]
}

/**
 * Theme configuration of NgeMarkdownModule
 */
export interface NgeMarkdownTheme {
  /**
   * Name of the theme (the @Input() theme property of NgeMarkdownComponent)
   */
  name: string

  /**
   * Style URL for the theme
   */
  styleUrl: string
}

export const NGE_MARKDOWN_CONFIG = new InjectionToken<NgeMarkdownConfig>('NGE_MARKDOWN_CONFIG')

export const NGE_MARKDOWN_THEMES = new InjectionToken<NgeMarkdownTheme>('NGE_MARKDOWN_THEMES')

/** @deprecated Use `provideNgeMarkdown(withConfig(...))` instead; will be removed in the next major. */
export const NgeMarkdownConfigProvider = (config: NgeMarkdownConfig | (() => NgeMarkdownConfig)): Provider =>
  typeof config === 'function'
    ? {
        provide: NGE_MARKDOWN_CONFIG,

        useFactory: config,
      }
    : {
        provide: NGE_MARKDOWN_CONFIG,

        useValue: config,
      }

//  darkThemeClassName: 'dark-theme',

/** @deprecated Use `provideNgeMarkdown(withThemes(...))` instead; will be removed in the next major. */
export const NgeMarkdownThemeProvider = (...themes: NgeMarkdownTheme[]): Provider[] =>
  themes.map((theme) => ({
    provide: NGE_MARKDOWN_THEMES,
    useValue: theme,
    multi: true,
  }))
