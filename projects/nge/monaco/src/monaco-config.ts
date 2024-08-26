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
  }
}

/**
 * Monaco editor loader configuration token.
 */
export const NGE_MONACO_CONFIG = new InjectionToken<NgeMonacoConfig>('NGE_MONACO_CONFIG')
