import { EnvironmentProviders, InjectionToken, Provider, Type, makeEnvironmentProviders } from '@angular/core'
import { NGE_DOC_RENDERERS, NgeDocIcon, NgeDocRenderers } from './nge-doc'
import { NGE_DOC_DEFAULT_COLOR_SCHEME, NgeDocColorScheme } from './nge-doc-theme.service'

/**
 * Loads the theme component that renders the documentation.
 *
 * A theme is a standalone component; return it directly or lazily (dynamic
 * `import()`), synchronously or as a promise. This is how a theme plugs its own
 * whole layout into the nge-doc engine.
 */
export type NgeDocLayoutLoader = () => Type<unknown> | Promise<Type<unknown> | { default: Type<unknown> }>

/** Injection token holding the active theme loader. */
export const NGE_DOC_LAYOUT = new InjectionToken<NgeDocLayoutLoader>('NGE_DOC_LAYOUT')

/**
 * The built-in default theme, dynamic-imported so it is tree-shaken away when a
 * consumer ships its own theme.
 */
export const DEFAULT_NGE_DOC_LAYOUT: NgeDocLayoutLoader = () =>
  import('./layouts/default/default-layout.component').then((m) => m.DefaultLayoutComponent)

/** A configuration feature for {@link provideNgeDoc}. */
export interface NgeDocFeature {
  readonly providers: Provider[]
}

/**
 * Configure the nge-doc engine at the application root.
 *
 * Optional: without it, the default theme is used. Compose features such as
 * {@link withTheme} to opt into a custom theme.
 *
 * ```ts
 * providers: [provideNgeDoc(withTheme(() => import('@acme/theme').then((m) => m.AcmeTheme)))]
 * ```
 */
export function provideNgeDoc(...features: NgeDocFeature[]): EnvironmentProviders {
  // Default first; a withTheme() feature appended after wins (last provider wins).
  const providers: Provider[] = [{ provide: NGE_DOC_LAYOUT, useValue: DEFAULT_NGE_DOC_LAYOUT }]
  for (const feature of features) providers.push(...feature.providers)
  return makeEnvironmentProviders(providers)
}

/** Use a custom theme instead of the default one. */
export function withTheme(loader: NgeDocLayoutLoader): NgeDocFeature {
  return { providers: [{ provide: NGE_DOC_LAYOUT, useValue: loader }] }
}

/** A top-level navigation link shown in the theme header. */
export interface NgeDocNavLink {
  /** Text of the link. */
  title: string
  /** Target url (an Angular routerLink, or an absolute url when `external`). */
  href: string
  /** Optional icon. */
  icon?: NgeDocIcon
  /** Open in a new tab as a plain anchor instead of routing internally. */
  external?: boolean
}

/** Header navigation links. When absent, a theme may derive them from the registered sites. */
export const NGE_DOC_NAVBAR = new InjectionToken<NgeDocNavLink[]>('NGE_DOC_NAVBAR')

/**
 * Declare the header navigation links (e.g. to move between documentation sites).
 *
 * Without it, the default theme lists the registered sites automatically.
 */
export function withNavbar(links: NgeDocNavLink[]): NgeDocFeature {
  return { providers: [{ provide: NGE_DOC_NAVBAR, useValue: links }] }
}

/** Register the component used to render markdown pages. */
export function withMarkdownRenderer(markdown: NgeDocRenderers['markdown']): NgeDocFeature {
  return { providers: [{ provide: NGE_DOC_RENDERERS, useValue: { markdown } }] }
}

/**
 * Set the default color scheme applied before the user picks one.
 * @param mode `auto` (follow the OS, default), `dark` or `light`.
 */
export function withDarkMode(mode: NgeDocColorScheme = 'auto'): NgeDocFeature {
  return { providers: [{ provide: NGE_DOC_DEFAULT_COLOR_SCHEME, useValue: mode }] }
}
