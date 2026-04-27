import { NgModule } from '@angular/core'
import { NgeMarkdownComponent } from './nge-markdown.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [NgeMarkdownComponent],
  imports: [RouterModule],
  exports: [NgeMarkdownComponent],
})
export class NgeMarkdownModule {}
