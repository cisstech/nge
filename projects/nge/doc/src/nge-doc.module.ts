// ANGULAR
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

// MODULE
import { NgeDocComponent } from './nge-doc.component'
import { DefaultLayoutModule } from './layouts/default/default-layout.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '**', pathMatch: 'full', component: NgeDocComponent }]),
    DefaultLayoutModule,
    NgeDocComponent,
  ],
})
export class NgeDocModule {}
