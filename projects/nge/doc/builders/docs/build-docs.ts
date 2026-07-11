import { DocFs, DocFsWriter, buildDocs } from '../../compiler'
import { DocsBuilderOptions } from './schema'

/** Outcome of one build, decoupled from architect so it is easy to test. */
export interface DocsBuildResult {
  success: boolean
  /** Number of top-level pages, on success. */
  pages?: number
  /** Message, on failure. */
  error?: string
}

/**
 * Core of the builder: runs {@link buildDocs} and reports the outcome. Kept free
 * of architect so it can be unit-tested directly (real fs or an injected one).
 */
export function runDocsBuild(
  options: DocsBuilderOptions,
  deps: { fs?: DocFs; writer?: DocFsWriter } = {}
): DocsBuildResult {
  try {
    const manifest = buildDocs({
      dir: options.docsDir,
      outDir: options.outputPath,
      meta: { name: options.name, root: options.root },
      assetsBase: options.assetsBase,
      siteUrl: options.siteUrl,
      fs: deps.fs,
      writer: deps.writer,
    })
    return { success: true, pages: manifest.pages.length }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}
