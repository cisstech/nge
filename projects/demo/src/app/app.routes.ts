import { Routes } from '@angular/router'
import { docsFromManifest } from '@cisstech/nge/doc'

export const routes: Routes = [
  { path: '', redirectTo: 'docs/overview/introduction', pathMatch: 'full' },
  {
    // The documentation, compiled from projects/demo/public/docs and prerendered (SSG).
    path: 'docs',
    loadChildren: () => import('@cisstech/nge/doc').then((m) => m.NGE_DOC_ROUTES),
    data: docsFromManifest('docs/nge-doc.json'),
  },
  { path: '**', redirectTo: 'docs/overview/introduction' },
]
