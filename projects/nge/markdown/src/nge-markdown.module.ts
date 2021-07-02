import { NgModule } from '@angular/core';
import { NgeMarkdownComponent } from './nge-markdown.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule],
    declarations: [NgeMarkdownComponent],
    exports: [NgeMarkdownComponent],
})
export class NgeMarkdownModule {}
