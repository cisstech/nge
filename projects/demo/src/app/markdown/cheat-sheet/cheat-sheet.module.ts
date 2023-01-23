import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IDynamicModule } from '@cisstech/nge/services';
import { NgeMarkdownModule } from '@cisstech/nge/markdown';

import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatExpansionModule } from '@angular/material/expansion';

import { CheatSheetComponent } from './cheat-sheet.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    NgeMarkdownModule,

    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
  ],
  declarations: [CheatSheetComponent],
})
export class CheatSheetModule implements IDynamicModule {
  component = CheatSheetComponent;
}
