import { readFileSync } from 'node:fs'
import { RenderMode, ServerRoute } from '@angular/ssr'

/** Built manifest for the `/guide` site, read at prerender to enumerate pages. */
const GUIDE_MANIFEST = 'projects/demo/public/guide/nge-doc.json'

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
    path: 'guide/**',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const manifest = JSON.parse(readFileSync(GUIDE_MANIFEST, 'utf8')) as {
        meta: { root: string }
        pages: ManifestLink[]
      }
      const root = manifest.meta.root
      return routablePages(manifest.pages).map((page) => ({ '**': page.href.slice(root.length).replace(/^\//, '') }))
    },
  },
  // The code-first showcase under /docs keeps rendering on the client.
  { path: '**', renderMode: RenderMode.Client },
]
