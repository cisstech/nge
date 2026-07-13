# API reference

Generated from the source. Every export, grouped by kind.

## Functions

- [contentPages](/docs/api/functions/contentPages) - Content pages (an `href` plus a renderer) of a navigation tree, depth-first.
- [docsAssetStateKey](/docs/api/functions/docsAssetStateKey) - Transfer-state key of a docs asset, shared by the browser and server implementations.
- [docsFromManifest](/docs/api/functions/docsFromManifest) - Declares a documentation site loaded at runtime from a build-time manifest.
- [extractManifestSources](/docs/api/functions/extractManifestSources) - Collects manifest sources from route data (mirrors `extractNgeDocSettings`).
- [extractNgeDocSettings](/docs/api/functions/extractNgeDocSettings)
- [flattenPages](/docs/api/functions/flattenPages) - Routable links of a manifest in reading order (depth-first, a parent before
- [indexablePages](/docs/api/functions/indexablePages) - Every routable page across the manifests, with its breadcrumb path (site name first).
- [isNgeDocManifestSource](/docs/api/functions/isNgeDocManifestSource) - Type guard for a NgeDocManifestSource.
- [isNgeDocSettings](/docs/api/functions/isNgeDocSettings)
- [joinUrl](/docs/api/functions/joinUrl) - Joins two url segments with exactly one slash between them.
- [provideNgeDoc](/docs/api/functions/provideNgeDoc) - Configure the nge-doc engine at the application root.
- [settingsToManifest](/docs/api/functions/settingsToManifest) - Converts code-first NgeDocSettings into a NgeDocManifest:
- [withBrand](/docs/api/functions/withBrand) - Set a single brand (logo and title) for the header, shared across every site.
- [withDarkMode](/docs/api/functions/withDarkMode) - Set the default color scheme applied before the user picks one.
- [withEditLink](/docs/api/functions/withEditLink) - Show an "Edit this page" link built from `baseUrl` and each page's compiler
- [withLabels](/docs/api/functions/withLabels) - Translate or reword the default theme. Pass only the labels you want to change.
- [withMarkdownRenderer](/docs/api/functions/withMarkdownRenderer) - Register the component used to render markdown pages.
- [withNavbar](/docs/api/functions/withNavbar) - Declare the header navigation links (e.g. to move between documentation sites).
- [withSearchIndex](/docs/api/functions/withSearchIndex) - Search a build-time index emitted by the `@cisstech/nge:docs` builder instead
- [withSeo](/docs/api/functions/withSeo) - Enable per-page canonical, Open Graph and Twitter tags. Titles and descriptions
- [withTheme](/docs/api/functions/withTheme) - Use a custom theme instead of the default one.

## Classes

- [DefaultNgeDocSearchProvider](/docs/api/classes/DefaultNgeDocSearchProvider) - In-memory, title-based search over the manifests.
- [HttpNgeDocAssets](/docs/api/classes/HttpNgeDocAssets) - Reads transfer state first, so a hydrated page reuses the content embedded
- [NgeDocAssets](/docs/api/classes/NgeDocAssets) - Fetch port for the docs assets: the manifest (`nge-doc.json`) and the
- [NgeDocModule](/docs/api/classes/NgeDocModule)
- [NgeDocRendererComponent](/docs/api/classes/NgeDocRendererComponent)
- [NgeDocService](/docs/api/classes/NgeDocService)
- [NgeDocThemeService](/docs/api/classes/NgeDocThemeService) - Owns the documentation color scheme.
- [PrebuiltNgeDocSearchProvider](/docs/api/classes/PrebuiltNgeDocSearchProvider) - Searches a build-time index (chunked by heading) fetched from

## Interfaces

- [NgeDocBrand](/docs/api/interfaces/NgeDocBrand) - The header brand: one logo and wordmark shared by every site.
- [NgeDocFeature](/docs/api/interfaces/NgeDocFeature) - A configuration feature for provideNgeDoc.
- [NgeDocHeading](/docs/api/interfaces/NgeDocHeading) - A heading extracted from the rendered page, used to build a table of contents.
- [NgeDocLabels](/docs/api/interfaces/NgeDocLabels) - User-facing wording of the default theme, so it can be translated or reworded.
- [NgeDocLink](/docs/api/interfaces/NgeDocLink) - Representation of a link in the documentation navigation.
- [NgeDocLinkAction](/docs/api/interfaces/NgeDocLinkAction)
- [NgeDocManifest](/docs/api/interfaces/NgeDocManifest) - A resolved documentation site: its metadata and the navigation tree with every
- [NgeDocManifestSource](/docs/api/interfaces/NgeDocManifestSource) - A file-first source: the url of a manifest emitted by the build. Declared in a
- [NgeDocMeta](/docs/api/interfaces/NgeDocMeta) - Metadata informations about a documentation site.
- [NgeDocNavLink](/docs/api/interfaces/NgeDocNavLink) - A top-level navigation link shown in the theme header.
- [NgeDocSearchDocument](/docs/api/interfaces/NgeDocSearchDocument) - A unit of the search index: one document per page, or per heading when content is indexed.
- [NgeDocSearchProvider](/docs/api/interfaces/NgeDocSearchProvider) - Pluggable search backend. The default builds its index in memory from the
- [NgeDocSearchResult](/docs/api/interfaces/NgeDocSearchResult) - A page returned by a NgeDocSearchProvider for a query.
- [NgeDocSeoConfig](/docs/api/interfaces/NgeDocSeoConfig) - Site-wide SEO settings used to build canonical, Open Graph and Twitter tags.
- [NgeDocSettings](/docs/api/interfaces/NgeDocSettings) - Documentation site config.
- [NgeDocState](/docs/api/interfaces/NgeDocState) - Representation of the documentation state.

## Type aliases

- [DynamicMeta](/docs/api/type-aliases/DynamicMeta)
- [DynamicPage](/docs/api/type-aliases/DynamicPage)
- [NgeDocColorScheme](/docs/api/type-aliases/NgeDocColorScheme) - Color scheme preference. `auto` follows the operating system setting.
- [NgeDocIcon](/docs/api/type-aliases/NgeDocIcon) - An icon reference.
- [NgeDocLayoutLoader](/docs/api/type-aliases/NgeDocLayoutLoader) - Loads the theme component that renders the documentation.
- [NgeDocLinAction](/docs/api/type-aliases/NgeDocLinAction)
- [NgeDocLinkActionHandler](/docs/api/type-aliases/NgeDocLinkActionHandler)
- [NgeDocRenderer](/docs/api/type-aliases/NgeDocRenderer)
- [NgeDocRenderers](/docs/api/type-aliases/NgeDocRenderers)
- [StaticMeta](/docs/api/type-aliases/StaticMeta)
- [StaticPage](/docs/api/type-aliases/StaticPage)

## Variables

- [DEFAULT_NGE_DOC_LABELS](/docs/api/variables/DEFAULT_NGE_DOC_LABELS) - Default (English) theme wording.
- [DEFAULT_NGE_DOC_LAYOUT](/docs/api/variables/DEFAULT_NGE_DOC_LAYOUT) - The built-in default theme, dynamic-imported so it is tree-shaken away when a
- [NGE_DOC_BRAND](/docs/api/variables/NGE_DOC_BRAND) - Header brand. When absent, the default theme uses the active site's name and logo.
- [NGE_DOC_DEFAULT_COLOR_SCHEME](/docs/api/variables/NGE_DOC_DEFAULT_COLOR_SCHEME) - Default color scheme used when the user has not chosen one yet (see `withDarkMode`).
- [NGE_DOC_EDIT_URL](/docs/api/variables/NGE_DOC_EDIT_URL) - Base url a page's `sourcePath` is appended to for the "Edit this page" link.
- [NGE_DOC_LABELS](/docs/api/variables/NGE_DOC_LABELS) - Overridden theme wording. Merged over DEFAULT_NGE_DOC_LABELS.
- [NGE_DOC_LABELS_EN](/docs/api/variables/NGE_DOC_LABELS_EN) - Ready-made English wording, an alias of DEFAULT_NGE_DOC_LABELS.
- [NGE_DOC_LABELS_FR](/docs/api/variables/NGE_DOC_LABELS_FR) - Ready-made French wording. Use it with `withLabels(NGE_DOC_LABELS_FR)`.
- [NGE_DOC_LAYOUT](/docs/api/variables/NGE_DOC_LAYOUT) - Injection token holding the active theme loader.
- [NGE_DOC_NAVBAR](/docs/api/variables/NGE_DOC_NAVBAR) - Header navigation links. When absent, a theme may derive them from the registered sites.
- [NGE_DOC_RENDERERS](/docs/api/variables/NGE_DOC_RENDERERS) - Custom renderers components
- [NGE_DOC_ROUTES](/docs/api/variables/NGE_DOC_ROUTES) - Routes that render the documentation. Load them directly from a standalone
- [NGE_DOC_SEARCH_INDEX_URL](/docs/api/variables/NGE_DOC_SEARCH_INDEX_URL) - Search index url for PrebuiltNgeDocSearchProvider, set via `withSearchIndex()`.
- [NGE_DOC_SEARCH_PROVIDER](/docs/api/variables/NGE_DOC_SEARCH_PROVIDER) - Override this to plug a custom search backend via `withSearch()`.
- [NGE_DOC_SEO](/docs/api/variables/NGE_DOC_SEO) - Site-wide SEO settings.
