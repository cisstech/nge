import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgeDocRendererComponent } from './renderer.component';
import { NgeDocTocDirective } from './toc.directive';

const declarations = [NgeDocRendererComponent, NgeDocTocDirective];

@NgModule({
  imports: [CommonModule],
  exports: declarations,
  declarations,
})
export class NgeDocRendererModule {}
