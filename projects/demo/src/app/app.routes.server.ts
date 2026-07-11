import { RenderMode, ServerRoute } from '@angular/ssr'

// The code-first docs pages render on the client for now; M3.2 turns the
// manifest-driven docs route into prerendered pages with transfer state.
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Client }]
