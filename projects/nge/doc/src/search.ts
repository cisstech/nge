import { InjectionToken } from '@angular/core'
import { NgeDocLink } from './nge-doc'
import { NgeDocManifest } from './manifest'

/** A unit of the search index: one entry per routable page (later, per heading). */
export interface NgeDocSearchDocument {
  /** Absolute href of the page the document belongs to. */
  slug: string
  /** Page title. */
  title: string
  /** Heading the chunk was extracted from, when indexing page content. */
  heading?: string
  /** Text searched against. Title-only today; page content later. */
  content: string
}

/** A page returned by a {@link NgeDocSearchProvider} for a query. */
export interface NgeDocSearchResult {
  /** Absolute href to navigate to. */
  slug: string
  /** Page title to display. */
  title: string
  /** Ancestor titles, site name first, the match excluded. */
  path: string[]
  /** Matched heading, when the provider indexes page content. */
  heading?: string
}

/**
 * Pluggable search backend. The default builds its index in memory from the
 * manifests; a build-time provider (later) loads a precomputed index instead —
 * the contract, and therefore the UI, stays the same.
 */
export interface NgeDocSearchProvider {
  /** (Re)builds the index from the registered sites. Replaces any previous set. */
  index(manifests: NgeDocManifest[]): Promise<void>
  /** Returns the best matches for `query`, or an empty list for a blank query. */
  search(query: string): Promise<NgeDocSearchResult[]>
}

/** Override this to plug a custom search backend via `withSearch()`. */
export const NGE_DOC_SEARCH_PROVIDER = new InjectionToken<NgeDocSearchProvider>('NGE_DOC_SEARCH_PROVIDER')

const MAX_RESULTS = 20

/** In-memory, title-based search over the manifests. */
export class DefaultNgeDocSearchProvider implements NgeDocSearchProvider {
  private entries: { doc: NgeDocSearchDocument; path: string[] }[] = []

  async index(manifests: NgeDocManifest[]): Promise<void> {
    const entries: { doc: NgeDocSearchDocument; path: string[] }[] = []

    const walk = (nodes: NgeDocLink[], site: string, trail: string[]): void => {
      for (const node of nodes) {
        if (node.separator) {
          continue
        }
        // A link with children but no renderer is a grouping node, not a page.
        const groupOnly = !node.renderer && !!node.children?.length
        if (node.href && !groupOnly) {
          entries.push({
            doc: { slug: node.href, title: node.title, content: node.title },
            path: [site, ...trail],
          })
        }
        if (node.children?.length) {
          walk(node.children, site, [...trail, node.title])
        }
      }
    }

    for (const { meta, pages } of manifests) {
      walk(pages, meta.name, [])
    }
    this.entries = entries
  }

  async search(query: string): Promise<NgeDocSearchResult[]> {
    const needle = query.trim().toLowerCase()
    if (!needle) {
      return []
    }

    const scored: { result: NgeDocSearchResult; score: number }[] = []
    for (const { doc, path } of this.entries) {
      const at = doc.content.toLowerCase().indexOf(needle)
      if (at >= 0) {
        scored.push({ result: { slug: doc.slug, title: doc.title, path }, score: at })
      }
    }

    return scored
      .sort((a, b) => a.score - b.score || a.result.title.length - b.result.title.length)
      .slice(0, MAX_RESULTS)
      .map((entry) => entry.result)
  }
}
