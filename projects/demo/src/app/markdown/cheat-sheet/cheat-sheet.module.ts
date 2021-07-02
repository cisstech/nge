import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgeMarkdownModule } from 'nge/markdown';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  declarations: [CheatSheetComponent]
})
export class CheatSheetModule {
    component = CheatSheetComponent;
}
