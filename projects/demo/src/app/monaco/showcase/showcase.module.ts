import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseComponent } from './showcase.component';
import { NgeMonacoModule } from '@mcisse/nge/monaco';
import { NgeMarkdownModule } from '@mcisse/nge/markdown';

@NgModule({
  imports: [
    CommonModule,
    NgeMarkdownModule,
    NgeMonacoModule,
  ],
  exports: [
      ShowcaseComponent
  ],
  declarations: [ShowcaseComponent]
})
export class ShowcaseModule {
    component = ShowcaseComponent;
}
