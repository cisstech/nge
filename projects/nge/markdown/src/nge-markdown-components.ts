import { InjectionToken, Provider, Type } from '@angular/core'

/** Loads the component mounted for a keyword. */
export type NgeMarkdownComponentLoader = () => Type<unknown> | Promise<Type<unknown> | { default: Type<unknown> }>

/** Map of a custom tag name to the component it mounts. */
export type NgeMarkdownComponents = Record<string, NgeMarkdownComponentLoader>

/**
 * Registry of components embedded in Markdown by keyword.
 *
 * A registered keyword written as a tag (`<color-picker></color-picker>`) is replaced by its
 * component once the Markdown is rendered. Only registered keywords are mounted; every other tag
 * stays plain HTML, so the feature is opt-in and never collides with real markup.
 */
export const NGE_MARKDOWN_COMPONENTS = new InjectionToken<NgeMarkdownComponents>('NGE_MARKDOWN_COMPONENTS')

/**
 * Register components that can be embedded in Markdown by keyword.
 *
 * ```ts
 * NgeMarkdownComponentsProvider({
 *   'color-picker': () => import('./color-picker.component').then((m) => m.ColorPickerComponent),
 * })
 * ```
 *
 * Then in Markdown, write the keyword as a tag: `<color-picker></color-picker>`. Tag attributes are
 * passed to the component as inputs, so `<color-picker theme="dark"></color-picker>` sets `theme`.
 * Prefer hyphenated keywords so they are valid custom-element names.
 *
 * @deprecated Use `provideNgeMarkdown(withComponents(...))` instead; will be removed in the next major.
 */
export const NgeMarkdownComponentsProvider = (components: NgeMarkdownComponents): Provider => ({
  provide: NGE_MARKDOWN_COMPONENTS,
  useValue: components,
})
