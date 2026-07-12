import { EnvironmentProviders, InjectionToken, Provider, Type, makeEnvironmentProviders } from '@angular/core'
import { NGE_DOC_RENDERERS, NgeDocIcon, NgeDocRenderers } from './nge-doc'
import { NGE_DOC_DEFAULT_COLOR_SCHEME, NgeDocColorScheme } from './nge-doc-theme.service'
import { NGE_DOC_SEARCH_INDEX_URL, NGE_DOC_SEARCH_PROVIDER, PrebuiltNgeDocSearchProvider } from './search'

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
  import('../ui/layouts/default/default-layout.component').then((m) => m.DefaultLayoutComponent)

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

/** The header brand: one logo and wordmark shared by every site. */
export interface NgeDocBrand {
  /** Wordmark shown next to the logo. */
  title: string
  /** Optional logo icon. */
  icon?: NgeDocIcon
  /** Where clicking the brand navigates (an Angular routerLink). Defaults to `/`. */
  href?: string
}

/** Header brand. When absent, the default theme uses the active site's name and logo. */
export const NGE_DOC_BRAND = new InjectionToken<NgeDocBrand>('NGE_DOC_BRAND')

/**
 * Set a single brand (logo and title) for the header, shared across every site.
 *
 * The default theme otherwise shows the active site's `meta.name` and `meta.logo`,
 * so the brand width follows the current site. A fixed brand keeps the header stable
 * while site names still drive breadcrumbs and page titles.
 */
export function withBrand(brand: NgeDocBrand): NgeDocFeature {
  return { providers: [{ provide: NGE_DOC_BRAND, useValue: brand }] }
}

/** Register the component used to render markdown pages. */
export function withMarkdownRenderer(markdown: NgeDocRenderers['markdown']): NgeDocFeature {
  return { providers: [{ provide: NGE_DOC_RENDERERS, useValue: { markdown } }] }
}

/** Site-wide SEO settings used to build canonical, Open Graph and Twitter tags. */
export interface NgeDocSeoConfig {
  /** Absolute site url (no trailing slash), e.g. `https://example.com/docs`. Enables canonical and `og:url`. */
  url?: string
  /** Default social image; relative paths resolve against `url`. Overridable per page via frontmatter `image`. */
  image?: string
}

/** Site-wide SEO settings. */
export const NGE_DOC_SEO = new InjectionToken<NgeDocSeoConfig>('NGE_DOC_SEO')

/**
 * Enable per-page canonical, Open Graph and Twitter tags. Titles and descriptions
 * come from each page (frontmatter overrides the manifest); `url` builds the
 * canonical and `og:url`, and `image` sets the default social card.
 */
export function withSeo(config: NgeDocSeoConfig): NgeDocFeature {
  return { providers: [{ provide: NGE_DOC_SEO, useValue: config }] }
}

/**
 * Search a build-time index emitted by the `@cisstech/nge:docs` builder instead
 * of the default in-memory title index. `url` points at the generated
 * `search.json` (e.g. `docs/search.json`); it loads on the first search.
 */
export function withSearchIndex(url: string): NgeDocFeature {
  return {
    providers: [
      { provide: NGE_DOC_SEARCH_INDEX_URL, useValue: url },
      { provide: NGE_DOC_SEARCH_PROVIDER, useClass: PrebuiltNgeDocSearchProvider },
    ],
  }
}

/** Base url a page's `sourcePath` is appended to for the "Edit this page" link. */
export const NGE_DOC_EDIT_URL = new InjectionToken<string>('NGE_DOC_EDIT_URL')

/**
 * Show an "Edit this page" link built from `baseUrl` and each page's compiler
 * `sourcePath`, e.g. `https://github.com/org/repo/edit/main/docs`.
 */
export function withEditLink(baseUrl: string): NgeDocFeature {
  return { providers: [{ provide: NGE_DOC_EDIT_URL, useValue: baseUrl }] }
}

/**
 * Set the default color scheme applied before the user picks one.
 * @param mode `auto` (follow the OS, default), `dark` or `light`.
 */
export function withDarkMode(mode: NgeDocColorScheme = 'auto'): NgeDocFeature {
  return { providers: [{ provide: NGE_DOC_DEFAULT_COLOR_SCHEME, useValue: mode }] }
}

/** User-facing wording of the default theme, so it can be translated or reworded. */
export interface NgeDocLabels {
  /** Search control and palette (label, aria and placeholder). */
  search: string
  /** Empty search state, shown before the query. */
  searchEmpty: string
  /** Table of contents heading and its landmark label. */
  tableOfContents: string
  /** Table of contents scroll-to-top action. */
  backToTop: string
  /** Previous page, on the pager. */
  previous: string
  /** Next page, on the pager. */
  next: string
  /** Pager landmark label. */
  pagination: string
  /** Breadcrumb landmark label. */
  breadcrumb: string
  /** Footer credit, shown before the engine name. */
  poweredBy: string
  /** Mobile navigation toggle label. */
  toggleNavigation: string
  /** Sidebar collapse toggle label when the sidebar is hidden. */
  showSidebar: string
  /** Sidebar collapse toggle label when the sidebar is visible. */
  hideSidebar: string
  /** Site navigation landmark label (header and mobile drawer). */
  sections: string
  /** Folder toggle label when the folder is collapsed. */
  expand: string
  /** Folder toggle label when the folder is expanded. */
  collapse: string
  /** Theme toggle label to switch to the light scheme. */
  switchToLight: string
  /** Theme toggle label to switch to the dark scheme. */
  switchToDark: string
  /** Repository link label, used when the repo has no name. */
  repository: string
  /** Header action label, used when an action has no title. */
  action: string
  /** Link to edit the current page's source. */
  editThisPage: string
  /** Prefix for the date the current page was last updated. */
  lastUpdated: string
  /** Action that copies the page's markdown to the clipboard. */
  copyAsMarkdown: string
  /** Confirmation shown briefly after copying. */
  copied: string
  /** Action that opens the page in ChatGPT. */
  openInChatGpt: string
  /** Action that opens the page in Claude. */
  openInClaude: string
}

/** Default (English) theme wording. */
export const DEFAULT_NGE_DOC_LABELS: NgeDocLabels = {
  search: 'Search documentation',
  searchEmpty: 'No results for',
  tableOfContents: 'On this page',
  backToTop: 'Back to top',
  previous: 'Previous',
  next: 'Next',
  pagination: 'Pagination',
  breadcrumb: 'Breadcrumb',
  poweredBy: 'Powered by',
  toggleNavigation: 'Toggle navigation',
  showSidebar: 'Show sidebar',
  hideSidebar: 'Hide sidebar',
  sections: 'Documentation sections',
  expand: 'Expand',
  collapse: 'Collapse',
  switchToLight: 'Switch to light theme',
  switchToDark: 'Switch to dark theme',
  repository: 'Repository',
  action: 'Action',
  editThisPage: 'Edit this page',
  lastUpdated: 'Last updated',
  copyAsMarkdown: 'Copy as Markdown',
  copied: 'Copied!',
  openInChatGpt: 'Open in ChatGPT',
  openInClaude: 'Open in Claude',
}

/** Ready-made English wording, an alias of {@link DEFAULT_NGE_DOC_LABELS}. */
export const NGE_DOC_LABELS_EN: NgeDocLabels = DEFAULT_NGE_DOC_LABELS

/** Ready-made French wording. Use it with `withLabels(NGE_DOC_LABELS_FR)`. */
export const NGE_DOC_LABELS_FR: NgeDocLabels = {
  search: 'Rechercher dans la documentation',
  searchEmpty: 'Aucun résultat pour',
  tableOfContents: 'Sur cette page',
  backToTop: 'Retour en haut',
  previous: 'Précédent',
  next: 'Suivant',
  pagination: 'Pagination',
  breadcrumb: "Fil d'Ariane",
  poweredBy: 'Propulsé par',
  toggleNavigation: 'Afficher la navigation',
  showSidebar: 'Afficher la barre latérale',
  hideSidebar: 'Masquer la barre latérale',
  sections: 'Sections de la documentation',
  expand: 'Déplier',
  collapse: 'Replier',
  switchToLight: 'Passer au thème clair',
  switchToDark: 'Passer au thème sombre',
  repository: 'Dépôt',
  action: 'Action',
  editThisPage: 'Modifier cette page',
  lastUpdated: 'Dernière mise à jour',
  copyAsMarkdown: 'Copier en Markdown',
  copied: 'Copié !',
  openInChatGpt: 'Ouvrir dans ChatGPT',
  openInClaude: 'Ouvrir dans Claude',
}

/** Overridden theme wording. Merged over {@link DEFAULT_NGE_DOC_LABELS}. */
export const NGE_DOC_LABELS = new InjectionToken<Partial<NgeDocLabels>>('NGE_DOC_LABELS')

/** Translate or reword the default theme. Pass only the labels you want to change. */
export function withLabels(labels: Partial<NgeDocLabels>): NgeDocFeature {
  return { providers: [{ provide: NGE_DOC_LABELS, useValue: labels }] }
}
