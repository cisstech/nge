import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgeMarkdownModule } from '@mcisse/nge/markdown';
import { HomeComponent } from './home.component';


@NgModule({
    imports: [
        CommonModule,
        NgeMarkdownModule,
        RouterModule.forChild([
            { path: '', component: HomeComponent }
        ])
    ],
    declarations: [HomeComponent],
})
export class HomeModule { }
