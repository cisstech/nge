import { readFileSync } from 'node:fs'
import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr'

/** Built manifest for the `/docs` site, read at prerender to enumerate pages. */
const DOCS_MANIFEST = 'projects/demo/public/docs/nge-doc.json'

/** Pages rendered on the client only (interactive editors that need the browser). */
const CLIENT_ONLY = new Set(['/docs/nge-monaco/showcase', '/docs/nge-markdown/cheatsheet'])

interface ManifestLink {
  href: string
  renderer?: string
  children?: ManifestLink[]
}

/** Depth-first list of the pages that have content to render. */
function routablePages(pages: ManifestLink[]): ManifestLink[] {
  return pages.flatMap((page) => [...(page.renderer ? [page] : []), ...routablePages(page.children ?? [])])
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'docs/**',
    renderMode: RenderMode.Prerender,
    // Pages not returned here (the interactive editors) render on the client.
    fallback: PrerenderFallback.Client,
    getPrerenderParams: async () => {
      const manifest = JSON.parse(readFileSync(DOCS_MANIFEST, 'utf8')) as {
        meta: { root: string }
        pages: ManifestLink[]
      }
      const root = manifest.meta.root
      return routablePages(manifest.pages)
        .filter((page) => !CLIENT_ONLY.has(page.href))
        .map((page) => ({ '**': page.href.slice(root.length).replace(/^\//, '') }))
    },
  },
  { path: '**', renderMode: RenderMode.Client },
]
