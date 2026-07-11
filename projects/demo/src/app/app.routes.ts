import { Routes } from '@angular/router'
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
  { path: '**', redirectTo: 'docs/overview' },
]
