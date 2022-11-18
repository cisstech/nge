// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// MODULE
import { NgeDocComponent } from './nge-doc.component';
import { DefaultLayoutModule } from './layouts/default/default-layout.module';

@NgModule({
  declarations: [NgeDocComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '**', pathMatch: 'full', component: NgeDocComponent },
    ]),
    DefaultLayoutModule,
  ],
})
export class NgeDocModule {}
