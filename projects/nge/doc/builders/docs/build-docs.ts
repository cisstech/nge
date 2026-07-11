import { join } from 'node:path'
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

/** The markdown source folder for a site: authored under the public dir at the site root. */
export function docsDirOf(options: Pick<DocsBuilderOptions, 'publicDir' | 'root'>): string {
  return join(options.publicDir, options.root.replace(/^\/+/, ''))
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
      dir: docsDirOf(options),
      outDir: options.publicDir,
      meta: { name: options.name, root: options.root },
      siteUrl: options.siteUrl,
      sitemap: options.sitemap,
      robots: options.robots,
      llms: options.llms,
      fs: deps.fs,
      writer: deps.writer,
    })
    return { success: true, pages: manifest.pages.length }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}
