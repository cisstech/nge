import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import type { NgeDocMeta } from '../src/nge-doc'
import type { NgeDocManifest } from '../src/manifest'
import { compileDocs } from './compile'
import { DocFs, nodeFs } from './fs'
import { DocGit, nodeGit } from './git'
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
  /** Path to the docs folder. */
  dir: string
  /** Site metadata (name, root, ...). */
  meta: NgeDocMeta
  /** Output folder served as {@link assetsBase} (receives manifest.json + the copied markdown). */
  outDir: string
  /** Base url the markdown is served from at runtime. Default: `assets/docs`. */
  assetsBase?: string
  /** Absolute site url. When set, emits `sitemap.xml` and `robots.txt`. */
  siteUrl?: string
  fs?: DocFs
  writer?: DocFsWriter
  /** Source-control reader for `lastUpdated`. Default: the local git CLI. */
  git?: DocGit
}

/**
 * Compiles `docs/` and emits the runtime artifacts: `manifest.json` plus a copy
 * of every markdown file under {@link BuildDocsOptions.outDir}, so the manifest's
 * `renderer` urls resolve. Returns the manifest.
 */
export function buildDocs(options: BuildDocsOptions): NgeDocManifest {
  const fs = options.fs ?? nodeFs
  const writer = options.writer ?? nodeFsWriter

  const manifest = compileDocs({
    dir: options.dir,
    meta: options.meta,
    assetsBase: options.assetsBase,
    fs,
    git: options.git ?? nodeGit,
  })

  writer.writeFile(join(options.outDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  for (const rel of listMarkdown(fs, options.dir, '')) {
    writer.writeFile(join(options.outDir, rel), fs.readFile(join(options.dir, rel)))
  }

  if (options.siteUrl) {
    writer.writeFile(join(options.outDir, 'sitemap.xml'), buildSitemap(manifest, options.siteUrl))
    writer.writeFile(join(options.outDir, 'robots.txt'), buildRobots(options.siteUrl))
  }

  return manifest
}

/** Relative paths of every markdown file under `rel`, depth-first. */
function listMarkdown(fs: DocFs, root: string, rel: string): string[] {
  const files: string[] = []
  for (const entry of fs.readdir(join(root, rel))) {
    const childRel = rel ? `${rel}/${entry}` : entry
    if (fs.isDirectory(join(root, childRel))) {
      files.push(...listMarkdown(fs, root, childRel))
    } else if (entry.endsWith('.md')) {
      files.push(childRel)
    }
  }
  return files
}

function join(...segments: string[]): string {
  return segments.filter(Boolean).join('/')
}
