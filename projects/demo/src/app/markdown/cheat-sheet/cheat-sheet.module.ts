import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IDynamicModule } from '@cisstech/nge/services'
import { NgeMarkdownModule } from '@cisstech/nge/markdown'

import { CheatSheetComponent } from './cheat-sheet.component'

@NgModule({
  imports: [CommonModule, FormsModule, NgeMarkdownModule, CheatSheetComponent],
})
export class CheatSheetModule implements IDynamicModule {
  component = CheatSheetComponent
}
