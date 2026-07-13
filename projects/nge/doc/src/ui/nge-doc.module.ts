import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { NgeDocComponent } from './nge-doc.component'

/**
 * Routes that render the documentation. Load them directly from a standalone
 * route configuration:
 *
 * ```ts
 * { path: 'docs', loadChildren: () => import('@cisstech/nge/doc').then((m) => m.NGE_DOC_ROUTES), data: [...] }
 * ```
 */
export const NGE_DOC_ROUTES: Routes = [{ path: '**', pathMatch: 'full', component: NgeDocComponent }]

/**
 * @deprecated Prefer {@link NGE_DOC_ROUTES} with `loadChildren` and configure the
 * engine with `provideNgeDoc()`. Kept as a thin façade for backward compatibility.
 */
@NgModule({
  imports: [CommonModule, RouterModule.forChild(NGE_DOC_ROUTES), NgeDocComponent],
})
export class NgeDocModule {}
