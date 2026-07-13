/** One entry of the build-time search index (`search.json`). */
interface SearchDocument {
  slug: string
  title: string
  heading?: string
  content: string
}

/** A search hit returned to the MCP client. */
export interface SearchResult {
  slug: string
  title: string
  heading?: string
  excerpt: string
}

interface Manifest {
  meta: { root: string }
}

/**
 * Reads a published nge-doc site: the build-time `search.json` for searching and
 * the raw markdown for reading a page. Constructed with the url of the site's
 * `nge-doc.json`; the search index is its sibling and every page's markdown is
 * served in place, so both resolve relative to that url (base href included).
 *
 * `fetch` is injected so the client is testable without the network; it defaults
 * to the global `fetch` (Node 18+).
 */
export class NgeDocClient {
  private documents?: Promise<SearchDocument[]>
  private manifest?: Promise<Manifest>

  constructor(
    private readonly manifestUrl: string,
    private readonly fetchFn: typeof fetch = fetch
  ) {}

  /** Ranks pages against `query`, one result per page (best section), with an excerpt. */
  async search(query: string, limit = 10): Promise<SearchResult[]> {
    const needle = query.trim().toLowerCase()
    if (!needle) {
      return []
    }
    const documents = await this.loadDocuments()

    const best = new Map<string, { doc: SearchDocument; score: number }>()
    for (const doc of documents) {
      const score = `${doc.title}\n${doc.heading ?? ''}\n${doc.content}`.toLowerCase().indexOf(needle)
      if (score < 0) {
        continue
      }
      const base = doc.slug.split('#')[0]
      const current = best.get(base)
      if (!current || score < current.score) {
        best.set(base, { doc, score })
      }
    }

    return [...best.values()]
      .sort((a, b) => a.score - b.score || a.doc.title.length - b.doc.title.length)
      .slice(0, limit)
      .map(({ doc }) => ({
        slug: doc.slug,
        title: doc.title,
        ...(doc.heading ? { heading: doc.heading } : {}),
        excerpt: excerptAround(doc.content, needle),
      }))
  }

  /** Returns the raw markdown of a page, or null when it cannot be fetched. */
  async readPage(slug: string): Promise<string | null> {
    const manifest = await this.loadManifest()
    const base = slug.split('#')[0]
    const root = manifest.meta.root.replace(/\/+$/, '')
    const relative = base.startsWith(root) ? base.slice(root.length).replace(/^\/+/, '') : base.replace(/^\/+/, '')
    const url = new URL(`${relative || 'index'}.md`, this.dir()).href

    const response = await this.fetchFn(url)
    return response.ok ? response.text() : null
  }

  private loadDocuments(): Promise<SearchDocument[]> {
    return (this.documents ??= this.fetchJson<SearchDocument[]>(new URL('search.json', this.dir()).href))
  }

  private loadManifest(): Promise<Manifest> {
    return (this.manifest ??= this.fetchJson<Manifest>(this.manifestUrl))
  }

  private async fetchJson<T>(url: string): Promise<T> {
    const response = await this.fetchFn(url)
    if (!response.ok) {
      throw new Error(`[nge-doc-mcp]: could not fetch ${url} (${response.status}).`)
    }
    return response.json() as Promise<T>
  }

  /** Directory url of the manifest; the search index and pages resolve against it. */
  private dir(): string {
    return new URL('.', this.manifestUrl).href
  }
}

/** A whitespace-collapsed snippet of `content` around `needle`, with ellipses. */
function excerptAround(content: string, needle: string, radius = 100): string {
  const text = content.replace(/\s+/g, ' ').trim()
  const at = text.toLowerCase().indexOf(needle)
  if (at < 0) {
    return text.length > radius * 2 ? `${text.slice(0, radius * 2).trimEnd()}…` : text
  }
  const start = Math.max(0, at - radius)
  const end = Math.min(text.length, at + needle.length + radius)
  return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`
}
