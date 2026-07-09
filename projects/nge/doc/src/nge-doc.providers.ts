import { EnvironmentProviders, InjectionToken, Provider, Type, makeEnvironmentProviders } from '@angular/core'

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
