import { RenderMode, ServerRoute } from '@angular/ssr'
import { ngeDocPrerenderRoutes } from '@cisstech/nge/doc/ssr'

export const serverRoutes: ServerRoute[] = [
  ...ngeDocPrerenderRoutes('projects/demo/public/docs/nge-doc.json'),
  { path: '**', renderMode: RenderMode.Client },
]
