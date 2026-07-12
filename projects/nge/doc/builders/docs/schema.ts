/** Options for the `@cisstech/nge:docs` architect builder. */
export interface DocsBuilderOptions {
  /** The served public dir (site root), relative to the workspace. Markdown is authored under `<publicDir>/<root>`. */
  publicDir: string
  /** Site root url, e.g. `/guide`. Sources live at `<publicDir>/<root>` and are served there. */
  root: string
  /** Site name. */
  name: string
  /** Where the top-level sections live: in the sidebar tree (default) or as navbar tabs. */
  nav?: 'sidebar' | 'tabs'
  /** Absolute site url. When set, emits the AI/SEO files. */
  siteUrl?: string
  /** Emit `sitemap.xml` when `siteUrl` is set. Default: true. */
  sitemap?: boolean
  /** Emit `robots.txt` when `siteUrl` is set. Default: true. */
  robots?: boolean
  /** Emit `llms.txt` and `llms-full.txt` when `siteUrl` is set. Default: true. */
  llms?: boolean
  /** Emit `search.json` (the content index). Default: true. */
  search?: boolean
  /** Generate an API reference (needs the optional `typedoc` dependency). */
  api?: {
    /** Entry point source files typedoc reads, e.g. `["projects/lib/src/index.ts"]`. */
    entryPoints: string[]
    /** tsconfig used to resolve types. Default: the nearest `tsconfig.json`. */
    tsconfig?: string
  }
  /** Rebuild on change. */
  watch?: boolean
}
