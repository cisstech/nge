import type { NgeDocLink, NgeDocMeta } from '../src/nge-doc'
import type { NgeDocManifest } from '../src/manifest'
import { parseFrontmatter } from '../src/frontmatter'
import { DocFs, nodeFs } from './fs'
import { DocGit, noopGit } from './git'

/** Per-entry configuration read from a folder's `_meta.json`. */
interface MetaEntry {
  title?: string
  icon?: string
  /** An external link, when the entry is not backed by a file. */
  href?: string
  /** `hidden` keeps the entry out of the navigation. */
  display?: 'hidden'
}

/** A folder's `_meta.json`: the key order drives navigation order. */
interface MetaConfig {
  order: string[]
  byKey: Record<string, MetaEntry>
}

export interface CompileDocsOptions {
  /** Path to the docs folder. */
  dir: string
  /** Site metadata (name, root, ...). */
  meta: NgeDocMeta
  /** Filesystem to read from. Default: the real Node filesystem. */
  fs?: DocFs
  /** Source-control reader for `lastUpdated`. Default: no dates. */
  git?: DocGit
}

interface Ctx {
  root: string
  meta: NgeDocMeta
  fs: DocFs
  git: DocGit
}

/**
 * Scans a `docs/` folder into a {@link NgeDocManifest}: one page per markdown
 * file, folders as nested pages, a folder's `index.md` as its own content, and
 * ordering/labels/icons resolved as `_meta.json` > frontmatter > filename. Pure
 * given a {@link DocFs}, so it is unit-tested in memory and reused by the CLI.
 */
export function compileDocs(options: CompileDocsOptions): NgeDocManifest {
  const ctx: Ctx = {
    root: options.dir,
    meta: options.meta,
    fs: options.fs ?? nodeFs,
    git: options.git ?? noopGit,
  }

  const pages = buildDir(ctx, '')

  // A root index.md is the landing page at the site root.
  if (ctx.fs.exists(fsJoin(ctx.root, 'index.md'))) {
    const fm = frontmatterOf(ctx, 'index.md')
    pages.unshift(
      prune({
        title: fm['title'] ?? 'Introduction',
        href: ctx.meta.root,
        renderer: servedMarkdown(ctx, 'index.md'),
        description: fm['description'],
        icon: fm['icon'],
        ...sourceMeta(ctx, 'index.md'),
      })
    )
  }

  return { meta: ctx.meta, pages }
}

/** Builds the navigation entries directly under `rel` (excluding its own index.md). */
function buildDir(ctx: Ctx, rel: string): NgeDocLink[] {
  const entries = ctx.fs.readdir(fsJoin(ctx.root, rel))
  const meta = readMeta(ctx, rel, entries)
  const items: { key: string; order: number; link: NgeDocLink }[] = []

  for (const entry of entries) {
    if (entry === '_meta.json' || entry === 'index.md') {
      continue
    }

    if (ctx.fs.isDirectory(fsJoin(ctx.root, rel, entry))) {
      const childRel = joinRel(rel, entry)
      const children = buildDir(ctx, childRel)
      const hasIndex = ctx.fs.exists(fsJoin(ctx.root, childRel, 'index.md'))
      const fm = hasIndex ? frontmatterOf(ctx, joinRel(childRel, 'index.md')) : {}
      const href = routeUrl(ctx, childRel)
      items.push({
        key: entry,
        order: num(fm['order']),
        link: prune({
          title: label(meta, entry, fm['title']) ?? humanize(entry),
          href,
          renderer: hasIndex ? servedMarkdown(ctx, joinRel(childRel, 'index.md')) : undefined,
          description: fm['description'],
          icon: meta.byKey[entry]?.icon ?? fm['icon'],
          children: children.length ? children : undefined,
          ...(hasIndex ? sourceMeta(ctx, joinRel(childRel, 'index.md')) : {}),
        }),
      })
    } else if (entry.endsWith('.md')) {
      const key = entry.slice(0, -3)
      const fm = frontmatterOf(ctx, joinRel(rel, entry))
      if (fm['draft'] === 'true') {
        continue
      }
      const href = routeUrl(ctx, joinRel(rel, key))
      items.push({
        key,
        order: num(fm['order']),
        link: prune({
          title: label(meta, key, fm['title']) ?? humanize(key),
          href,
          renderer: servedMarkdown(ctx, joinRel(rel, entry)),
          description: fm['description'],
          icon: meta.byKey[key]?.icon ?? fm['icon'],
          ...sourceMeta(ctx, joinRel(rel, entry)),
        }),
      })
    }
  }

  // External links declared in _meta.json without a backing file.
  for (const key of meta.order) {
    const entry = meta.byKey[key]
    if (entry?.href && !items.some((item) => item.key === key)) {
      items.push({
        key,
        order: Number.POSITIVE_INFINITY,
        link: prune({ title: entry.title ?? humanize(key), href: entry.href, icon: entry.icon }),
      })
    }
  }

  return items
    .filter((item) => meta.byKey[item.key]?.display !== 'hidden')
    .sort((a, b) => compare(a, b, meta.order))
    .map((item) => item.link)
}

/** `_meta.json` label wins over frontmatter, per the resolution order. */
function label(meta: MetaConfig, key: string, frontmatterTitle?: string): string | undefined {
  return meta.byKey[key]?.title ?? frontmatterTitle
}

function readMeta(ctx: Ctx, rel: string, entries: string[]): MetaConfig {
  if (!entries.includes('_meta.json')) {
    return { order: [], byKey: {} }
  }
  const parsed = JSON.parse(ctx.fs.readFile(fsJoin(ctx.root, rel, '_meta.json'))) as Record<string, MetaEntry>
  return { order: Object.keys(parsed), byKey: parsed }
}

function frontmatterOf(ctx: Ctx, rel: string): Record<string, string> {
  return parseFrontmatter(ctx.fs.readFile(fsJoin(ctx.root, rel))).data
}

/** `sourcePath` (relative to the docs folder) and `lastUpdated` for a markdown file. */
function sourceMeta(ctx: Ctx, rel: string): { sourcePath: string; lastUpdated: string | undefined } {
  return { sourcePath: rel, lastUpdated: ctx.git.lastCommitDate(fsJoin(ctx.root, rel)) }
}

function compare(a: { key: string; order: number }, b: { key: string; order: number }, order: string[]): number {
  const rankA = metaRank(a.key, order)
  const rankB = metaRank(b.key, order)
  if (rankA !== rankB) {
    return rankA - rankB
  }
  if (a.order !== b.order) {
    return a.order - b.order
  }
  return a.key.localeCompare(b.key)
}

function metaRank(key: string, order: string[]): number {
  const index = order.indexOf(key)
  return index < 0 ? order.length + 1 : index
}

function num(value: string | undefined): number {
  const n = Number(value)
  return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY
}

/** `getting-started` -> `Getting started`. */
function humanize(key: string): string {
  const spaced = key.replace(/[-_]+/g, ' ').trim()
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

function routeUrl(ctx: Ctx, rel: string): string {
  return urlJoin(ctx.meta.root, rel)
}

/** The served url of a source markdown file (authored under the site root), e.g. `index.md` -> `guide/index.md`. */
function servedMarkdown(ctx: Ctx, rel: string): string {
  return urlJoin(ctx.meta.root, rel).replace(/^\/+/, '')
}

function urlJoin(base: string, rel: string): string {
  return rel ? `${base.replace(/\/$/, '')}/${rel.replace(/^\//, '')}` : base
}

function fsJoin(...segments: string[]): string {
  return segments.filter(Boolean).join('/')
}

function joinRel(parent: string, child: string): string {
  return parent ? `${parent}/${child}` : child
}

/** Drops `undefined` properties so the emitted manifest stays clean. */
function prune<T extends object>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined)) as T
}
