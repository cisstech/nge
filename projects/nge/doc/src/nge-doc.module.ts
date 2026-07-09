import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { NgeDocComponent } from './nge-doc.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '**', pathMatch: 'full', component: NgeDocComponent }]),
    NgeDocComponent,
  ],
})
export class NgeDocModule {}
