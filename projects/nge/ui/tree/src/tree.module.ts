import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { ScrollingModule } from '@angular/cdk/scrolling'

import { TreeComponent } from './tree.component'
import { TreeNodeDirective } from './tree-node.directive'

import { AutofocusDirective } from './autofocus.directive'

@NgModule({
  imports: [CommonModule, FormsModule, ScrollingModule, TreeComponent, TreeNodeDirective, AutofocusDirective],
  exports: [TreeComponent, TreeNodeDirective],
})
export class NgeUiTreeModule {}
