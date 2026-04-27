import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgeMarkdownModule } from '@cisstech/nge/markdown'
import { HomeComponent } from './home.component'

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, NgeMarkdownModule, RouterModule.forChild([{ path: '', component: HomeComponent }])],
})
export class HomeModule {}
