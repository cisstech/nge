/** Options for the `@cisstech/nge:docs` architect builder. */
export interface DocsBuilderOptions {
  /** The served public dir (site root), relative to the workspace. Markdown is authored under `<publicDir>/<root>`. */
  publicDir: string
  /** Site root url, e.g. `/guide`. Sources live at `<publicDir>/<root>` and are served there. */
  root: string
  /** Site name. */
  name: string
  /** Absolute site url. When set, emits the AI/SEO files. */
  siteUrl?: string
  /** Emit `sitemap.xml` when `siteUrl` is set. Default: true. */
  sitemap?: boolean
  /** Emit `robots.txt` when `siteUrl` is set. Default: true. */
  robots?: boolean
  /** Emit `llms.txt` and `llms-full.txt` when `siteUrl` is set. Default: true. */
  llms?: boolean
  /** Rebuild on change. */
  watch?: boolean
}
