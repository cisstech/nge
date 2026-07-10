import { InjectionToken } from '@angular/core'

/**
 * Monaco editor loader configuration.
 */
export interface NgeMonacoConfig {
  /**
   * Base path for monaco editor default: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0'
   */
  assets?: string

  /**
   * Default locale (en).
   */
  locale?: 'de' | 'en' | 'es' | 'fr' | 'it' | 'ja' | 'ko' | 'ru' | 'zh-ch' | 'zh-tw'

  /**
   * Monaco editor default options.
   */
  options?: monaco.editor.IEditorOptions

  /** Monaco editor theming configuration. */
  theming?: {
    /** path to theme files. */
    themes?: string[]
    /** default theme 'vs' */
    default?: string
    /**
     * Theme to apply when the color scheme is light.
     *
     * Setting both `light` and `dark` enables automatic switching: Monaco picks
     * the matching theme and updates whenever the scheme changes. This lets any
     * app (or nge-doc, without depending on it) drive Monaco's theme.
     */
    light?: string
    /** Theme to apply when the color scheme is dark (see {@link light}). */
    dark?: string
    /**
     * How dark mode is detected for automatic switching:
     * - a class name (or an array of class names) that means "dark" when present
     *   on the document root (e.g. `nge-doc-dark` or `dark`), observed live. Pass
     *   an array to match any of several dark classes across a multi-page app.
     * - omit to follow the `(prefers-color-scheme: dark)` media query
     *
     * Named to mirror `NgeMarkdownConfig.darkThemeClassName` so both libraries
     * read the same class.
     */
    darkThemeClassName?: string | string[]
  }
}

/**
 * Monaco editor loader configuration token.
 */
export const NGE_MONACO_CONFIG = new InjectionToken<NgeMonacoConfig>('NGE_MONACO_CONFIG')
