import { Routes } from '@angular/router'
import { docsFromManifest } from '@cisstech/nge/doc'
import { NGE_DOC } from './docs/nge-doc'
import { NGE_MARKDOWN } from './docs/nge-markdown'
import { NGE_MONACO } from './docs/nge-monaco'
import { NGE_OVERVIEW } from './docs/overview'
import { NGE_UI } from './docs/nge-ui'
import { NGE_UTILITIES } from './docs/utilities'

export const routes: Routes = [
  { path: '', redirectTo: 'docs/overview', pathMatch: 'full' },
  {
    path: 'docs',
    loadChildren: () => import('@cisstech/nge/doc').then((m) => m.NgeDocModule),
    data: [NGE_OVERVIEW, NGE_DOC, NGE_MONACO, NGE_MARKDOWN, NGE_UI, NGE_UTILITIES],
  },
  {
    // Manifest-driven docs, compiled from projects/demo/docs and prerendered (SSG).
    path: 'guide',
    loadChildren: () => import('@cisstech/nge/doc').then((m) => m.NGE_DOC_ROUTES),
    data: docsFromManifest('assets/guide/manifest.json'),
  },
  { path: '**', redirectTo: 'docs/overview' },
]
