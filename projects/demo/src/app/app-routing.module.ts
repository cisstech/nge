import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { NGE_DOC } from './docs/nge-doc'
import { NGE_MARKDOWN } from './docs/nge-markdown'
import { NGE_MONACO } from './docs/nge-monaco'
import { NGE_OVERVIEW } from './docs/overview'

const routes: Routes = [
  { path: '', redirectTo: 'docs/overview', pathMatch: 'full' },
  {
    path: 'docs',
    loadChildren: () => import('@cisstech/nge/doc').then((m) => m.NgeDocModule),
    data: [NGE_OVERVIEW, NGE_DOC, NGE_MONACO, NGE_MARKDOWN],
  },
  { path: '**', redirectTo: 'docs/overview' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollOffset: [0, 64],
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
