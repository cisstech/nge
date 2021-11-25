import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { TreeComponent } from './tree.component';
import { TreeNodeDirective } from './tree-node.directive';

import { AutofocusDirective } from './autofocus.directive';

@NgModule({
  declarations: [
    TreeComponent,
    TreeNodeDirective,
    AutofocusDirective
  ],
  imports: [
      CommonModule,
      FormsModule,

      MatTreeModule,
      MatIconModule,
      MatButtonModule,
      MatTooltipModule,
      ScrollingModule,
  ],
  exports: [
    TreeComponent,
    TreeNodeDirective,
  ]
})
export class NgeUiTreeModule { }
