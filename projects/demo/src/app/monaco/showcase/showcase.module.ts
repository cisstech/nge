import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ShowcaseComponent } from './showcase.component'
import { NgeMonacoModule } from '@cisstech/nge/monaco'
import { NgeMarkdownModule } from '@cisstech/nge/markdown'

@NgModule({
  declarations: [ShowcaseComponent],
  imports: [CommonModule, NgeMarkdownModule, NgeMonacoModule],
  exports: [ShowcaseComponent],
})
export class ShowcaseModule {
  component = ShowcaseComponent
}
