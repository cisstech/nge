import { HttpClient } from '@angular/common/http'
import { Injectable, InjectionToken, inject } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { NgeDocLink } from './nge-doc'
import { NgeDocManifest } from './manifest'

/** A unit of the search index: one document per page, or per heading when content is indexed. */
export interface NgeDocSearchDocument {
  /** Absolute href of the page (with a `#heading` anchor for a section chunk). */
  slug: string
  /** Page title. */
  title: string
  /** Heading the chunk was extracted from, when indexing page content. */
  heading?: string
  /** Text searched against: the title (default provider) or the section content (prebuilt index). */
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
  /** A short content snippet around the match, when the provider indexes content. */
  excerpt?: string
}

/**
 * Pluggable search backend. The default builds its index in memory from the
 * manifests; {@link PrebuiltNgeDocSearchProvider} loads a build-time index
 * instead. The contract, and therefore the UI, stays the same.
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

/** Every routable page across the manifests, with its breadcrumb path (site name first). */
export function indexablePages(manifests: NgeDocManifest[]): { href: string; title: string; path: string[] }[] {
  const pages: { href: string; title: string; path: string[] }[] = []
  const walk = (nodes: NgeDocLink[], site: string, trail: string[]): void => {
    for (const node of nodes) {
      if (node.separator) {
        continue
      }
      // A link with children but no renderer is a grouping node, not a page.
      const groupOnly = !node.renderer && !!node.children?.length
      if (node.href && !groupOnly) {
        pages.push({ href: node.href, title: node.title, path: [site, ...trail] })
      }
      if (node.children?.length) {
        walk(node.children, site, [...trail, node.title])
      }
    }
  }
  for (const { meta, pages: nodes } of manifests) {
    walk(nodes, meta.name, [])
  }
  return pages
}

/** A whitespace-collapsed snippet of `content` around `needle`, with ellipses. */
function excerptAround(content: string, needle: string, radius = 90): string {
  const text = content.replace(/\s+/g, ' ').trim()
  const at = needle ? text.toLowerCase().indexOf(needle) : -1
  if (at < 0) {
    return text.length > radius * 2 ? `${text.slice(0, radius * 2).trimEnd()}…` : text
  }
  const start = Math.max(0, at - radius)
  const end = Math.min(text.length, at + needle.length + radius)
  return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`
}

/** Ranks documents by the earliest match position, then by title length; caps the list. */
function rank(scored: { result: NgeDocSearchResult; score: number }[]): NgeDocSearchResult[] {
  return scored
    .sort((a, b) => a.score - b.score || a.result.title.length - b.result.title.length)
    .slice(0, MAX_RESULTS)
    .map((entry) => entry.result)
}

/** Earliest match position across a document's title, heading and content; -1 if it does not match. */
function matchIndex(doc: NgeDocSearchDocument, needle: string): number {
  return `${doc.title}\n${doc.heading ?? ''}\n${doc.content}`.toLowerCase().indexOf(needle)
}

/**
 * Reduces the chunked index to the single best-matching section per page, so a
 * page never shows as several near-identical rows; the kept section carries its
 * heading and a snippet to locate the match.
 */
function bestSectionPerPage(
  documents: NgeDocSearchDocument[],
  needle: string,
  pathBySlug: Map<string, string[]>
): { result: NgeDocSearchResult; score: number }[] {
  const best = new Map<string, { result: NgeDocSearchResult; score: number }>()
  for (const doc of documents) {
    const score = matchIndex(doc, needle)
    if (score < 0) {
      continue
    }
    const base = doc.slug.split('#')[0]
    const current = best.get(base)
    if (current && current.score <= score) {
      continue
    }
    best.set(base, {
      score,
      result: {
        slug: doc.slug,
        title: doc.title,
        heading: doc.heading,
        path: pathBySlug.get(base) ?? [],
        excerpt: excerptAround(doc.content, needle),
      },
    })
  }
  return [...best.values()]
}

/** In-memory, title-based search over the manifests. */
export class DefaultNgeDocSearchProvider implements NgeDocSearchProvider {
  private entries: { href: string; title: string; path: string[] }[] = []

  async index(manifests: NgeDocManifest[]): Promise<void> {
    this.entries = indexablePages(manifests)
  }

  async search(query: string): Promise<NgeDocSearchResult[]> {
    const needle = query.trim().toLowerCase()
    if (!needle) {
      return []
    }
    const scored = this.entries
      .map((entry) => ({
        result: { slug: entry.href, title: entry.title, path: entry.path },
        score: entry.title.toLowerCase().indexOf(needle),
      }))
      .filter((entry) => entry.score >= 0)
    return rank(scored)
  }
}

/** Search index url for {@link PrebuiltNgeDocSearchProvider}, set via `withSearchIndex()`. */
export const NGE_DOC_SEARCH_INDEX_URL = new InjectionToken<string>('NGE_DOC_SEARCH_INDEX_URL')

/**
 * Searches a build-time index (chunked by heading) fetched from
 * {@link NGE_DOC_SEARCH_INDEX_URL}. The index loads lazily on the first search,
 * so prerendered pages do not carry it. Same contract as the default provider.
 */
@Injectable()
export class PrebuiltNgeDocSearchProvider implements NgeDocSearchProvider {
  private readonly http = inject(HttpClient, { optional: true })
  private readonly url = inject(NGE_DOC_SEARCH_INDEX_URL)
  private pathBySlug = new Map<string, string[]>()
  private documents?: Promise<NgeDocSearchDocument[]>

  async index(manifests: NgeDocManifest[]): Promise<void> {
    this.pathBySlug = new Map(indexablePages(manifests).map((page) => [page.href, page.path]))
    this.documents = undefined
  }

  async search(query: string): Promise<NgeDocSearchResult[]> {
    const needle = query.trim().toLowerCase()
    if (!needle || !this.http) {
      return []
    }
    const documents = await (this.documents ??= firstValueFrom(this.http.get<NgeDocSearchDocument[]>(this.url)))
    return rank(bestSectionPerPage(documents, needle, this.pathBySlug))
  }
}
