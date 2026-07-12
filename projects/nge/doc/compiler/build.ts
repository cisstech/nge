import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import type { NgeDocMeta } from '../src/core/nge-doc'
import type { NgeDocManifest } from '../src/core/manifest'
import { parseFrontmatter } from '../src/shared/frontmatter'
import { ApiDocsOptions, buildApiDocs } from './api'
import { compileDocs } from './compile'
import { DocFs, nodeFs } from './fs'
import { DocGit, nodeGit } from './git'
import { buildLlms, buildLlmsFull } from './llms'
import { buildSearchIndex } from './search'
import { buildRobots, buildSitemap } from './seo'

/** Write side of the filesystem, abstracted so `buildDocs` is tested in memory. */
export interface DocFsWriter {
  writeFile(path: string, content: string): void
}

/** {@link DocFsWriter} backed by the real Node filesystem (creates parent dirs). */
export const nodeFsWriter: DocFsWriter = {
  writeFile: (path, content) => {
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, content)
  },
}

export interface BuildDocsOptions {
  /** Markdown source folder, authored under the site root and served in place (e.g. `public/guide`). */
  dir: string
  /** Site metadata (name, root, ...). */
  meta: NgeDocMeta
  /** The served site root (a `public/` dir), where the root-level AI/SEO files are written. */
  outDir: string
  /** Absolute site url. When set, emits `sitemap.xml`, `robots.txt` and the `llms*.txt` files. */
  siteUrl?: string
  /** Emit `sitemap.xml` when `siteUrl` is set. Default: true. */
  sitemap?: boolean
  /** Emit `robots.txt` when `siteUrl` is set. Default: true. */
  robots?: boolean
  /** Emit `llms.txt` and `llms-full.txt` when `siteUrl` is set. Default: true. */
  llms?: boolean
  /** Emit `search.json` (the content index) next to the manifest. Default: true. */
  search?: boolean
  /** Generate an API reference from TypeScript sources under `<dir>/api`. Off when absent. */
  api?: Pick<ApiDocsOptions, 'entryPoints' | 'tsconfig'>
  fs?: DocFs
  writer?: DocFsWriter
  /** Source-control reader for `lastUpdated`. Default: the local git CLI. */
  git?: DocGit
}

/**
 * Compiles the markdown authored in {@link BuildDocsOptions.dir} (served in place)
 * and emits only the generated indexes: `manifest.json` next to the sources, and,
 * with a `siteUrl`, `sitemap.xml` / `robots.txt` / `llms.txt` / `llms-full.txt` at
 * the site root. The markdown itself is not copied - it is already served from the
 * `public/` dir - so `ng serve` and `ng build` need no postbuild. Returns the manifest.
 */
export function buildDocs(options: BuildDocsOptions): NgeDocManifest {
  const fs = options.fs ?? nodeFs
  const writer = options.writer ?? nodeFsWriter

  // Generate the API pages first, so the scan below picks them up as normal pages.
  if (options.api) {
    buildApiDocs({ ...options.api, dir: join(options.dir, 'api') }, writer)
  }

  const manifest = compileDocs({ dir: options.dir, meta: options.meta, fs, git: options.git ?? nodeGit })

  const readSource = (sourcePath: string) => parseFrontmatter(fs.readFile(join(options.dir, sourcePath))).content

  // The manifest sits with its sources, served at `<root>/nge-doc.json` (a
  // distinctive name so it never collides with a web app `manifest.json`).
  writer.writeFile(join(options.dir, 'nge-doc.json'), `${JSON.stringify(manifest, null, 2)}\n`)

  if (options.search !== false) {
    writer.writeFile(
      join(options.dir, 'search.json'),
      `${JSON.stringify(buildSearchIndex(manifest, readSource), null, 2)}\n`
    )
  }

  if (options.siteUrl) {
    if (options.sitemap !== false) {
      writer.writeFile(join(options.outDir, 'sitemap.xml'), buildSitemap(manifest, options.siteUrl))
    }
    if (options.robots !== false) {
      writer.writeFile(join(options.outDir, 'robots.txt'), buildRobots(options.siteUrl))
    }
    if (options.llms !== false) {
      writer.writeFile(join(options.outDir, 'llms.txt'), buildLlms(manifest, options.siteUrl))
      writer.writeFile(join(options.outDir, 'llms-full.txt'), buildLlmsFull(manifest, options.siteUrl, readSource))
    }
  }

  return manifest
}

function join(...segments: string[]): string {
  return segments.filter(Boolean).join('/')
}
