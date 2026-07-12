import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr'
import { readFileSync } from 'node:fs'
import { NgeDocManifest, contentPages } from '@cisstech/nge/doc'

/**
 * Builds the prerender server route of one or more compiled docs sites, one
 * route per `nge-doc.json`. Each manifest is read at build time to enumerate
 * the pages to render; pages marked `prerender: false` in their frontmatter
 * fall back to client rendering, like any url not listed (a 404, a search url).
 *
 * ```ts
 * export const serverRoutes: ServerRoute[] = [
 *   ...ngeDocPrerenderRoutes('projects/demo/public/docs/nge-doc.json'),
 *   { path: '**', renderMode: RenderMode.Client },
 * ]
 * ```
 */
export function ngeDocPrerenderRoutes(...manifestPaths: string[]): ServerRoute[] {
  return manifestPaths.map((path) => {
    const manifest = JSON.parse(readFileSync(path, 'utf8')) as NgeDocManifest
    const root = manifest.meta.root
    return {
      path: `${root.replace(/^\/+/, '')}/**`,
      renderMode: RenderMode.Prerender,
      fallback: PrerenderFallback.Client,
      getPrerenderParams: async () =>
        contentPages(manifest.pages)
          .filter((page) => page.prerender !== false)
          .map((page) => ({ '**': (page.href ?? '').slice(root.length).replace(/^\//, '') })),
    }
  })
}
