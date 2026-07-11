import { Injector } from '@angular/core'
import { NgeDocLink, NgeDocMeta, NgeDocSettings } from './nge-doc'

/**
 * A resolved documentation site: its metadata and the navigation tree with every
 * href made absolute.
 *
 * It is the single shape the runtime consumes, no matter where the docs come
 * from: code-first settings (via {@link settingsToManifest}) or, later, a
 * manifest emitted by the build. `NgeDocLink` stays the authoring API; the
 * manifest is just its resolved form.
 */
export interface NgeDocManifest {
  meta: NgeDocMeta
  /** Navigation tree, hrefs resolved relative to `meta.root`. */
  pages: NgeDocLink[]
}

/**
 * Converts code-first {@link NgeDocSettings} into a {@link NgeDocManifest}:
 * resolves dynamic `meta`/`pages` factories and returns a fresh tree with hrefs
 * joined under `meta.root`. The input is never mutated, so settings stay reusable
 * across navigations.
 */
export async function settingsToManifest(settings: NgeDocSettings, injector: Injector): Promise<NgeDocManifest> {
  const meta = typeof settings.meta === 'function' ? await settings.meta(injector) : settings.meta
  if (!meta) {
    throw new Error('[nge-doc]: Missing setting.meta')
  }

  const pages: NgeDocLink[] = []
  for (const item of settings.pages) {
    const resolved = typeof item === 'function' ? await item(injector) : item
    for (const link of Array.isArray(resolved) ? resolved : [resolved]) {
      const clone = cloneLink(link)
      resolveHrefs(meta.root, clone)
      pages.push(clone)
    }
  }

  return { meta, pages }
}

/**
 * A file-first source: the url of a manifest emitted by the build. Declared in a
 * route's `data` next to (or instead of) code-first {@link NgeDocSettings}.
 */
export interface NgeDocManifestSource {
  ngeDocManifestUrl: string
}

/** Declares a documentation site loaded at runtime from a build-time manifest. */
export function docsFromManifest(url: string): NgeDocManifestSource {
  return { ngeDocManifestUrl: url }
}

/** Type guard for a {@link NgeDocManifestSource}. */
export function isNgeDocManifestSource(value: unknown): value is NgeDocManifestSource {
  return (
    !!value && typeof value === 'object' && typeof (value as NgeDocManifestSource).ngeDocManifestUrl === 'string'
  )
}

/** Collects manifest sources from route data (mirrors `extractNgeDocSettings`). */
export function extractManifestSources(value: unknown): NgeDocManifestSource[] {
  if (isNgeDocManifestSource(value)) {
    return [value]
  }
  if (value && typeof value === 'object') {
    return Object.values(value).flatMap(extractManifestSources)
  }
  return []
}

/**
 * Routable links of a manifest in reading order (depth-first, a parent before
 * its children). Separators, being visual headings, are skipped along with their
 * subtree. Used to compute prev/next and to feed search.
 */
export function flattenPages(pages: NgeDocLink[]): NgeDocLink[] {
  const flat: NgeDocLink[] = []
  const walk = (nodes: NgeDocLink[]): void => {
    for (const node of nodes) {
      if (node.separator) {
        continue
      }
      flat.push(node)
      if (node.children?.length) {
        walk(node.children)
      }
    }
  }
  walk(pages)
  return flat
}

/**
 * Deep-copies a link's `children` tree while sharing functions and options
 * (`renderer`, `actions`, `inputs`) by reference, so href resolution never
 * touches the consumer's settings objects.
 */
function cloneLink(link: NgeDocLink): NgeDocLink {
  return { ...link, children: link.children?.map(cloneLink) }
}

/** Makes a link's href absolute under `parent`, recursing into its children. */
function resolveHrefs(parent: string, link: NgeDocLink): void {
  // Separators are visual headings, never routed: they keep no href and the
  // entries around them keep their own urls.
  if (link.separator) {
    return
  }
  link.href = join(parent, link.href ?? '')
  link.children?.forEach((child) => resolveHrefs(link.href as string, child))
}

/** Joins two url segments with exactly one slash between them. */
function join(a: string, b: string): string {
  return `${a.replace(/\/$/, '')}/${b.replace(/^\//, '')}`
}
