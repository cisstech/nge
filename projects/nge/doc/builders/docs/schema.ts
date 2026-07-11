/** Options for the `@cisstech/nge:docs` architect builder. */
export interface DocsBuilderOptions {
  /** Path to the docs folder, relative to the workspace root. */
  docsDir: string
  /** Output folder for manifest.json and the copied markdown (served as `assetsBase`). */
  outputPath: string
  /** Site name. */
  name: string
  /** Site root url. */
  root: string
  /** Base url the markdown is served from at runtime. Default: `assets/docs`. */
  assetsBase?: string
  /** Rebuild on change. */
  watch?: boolean
}
