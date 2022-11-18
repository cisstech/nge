import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { NgArrayPipesModule } from 'ngx-pipes';

import { ListComponent } from './list.component';
import { ListTemplateComponent } from './list-template.component';
import { ListItemArticleComponent } from './list-item-article/list-item-article.component';
import { ListItemArticleActionComponent } from './list-item-article-action/list-item-article-action.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ScrollingModule,
    NgArrayPipesModule,
  ],
  exports: [
    ListComponent,
    ListTemplateComponent,
    ListItemArticleComponent,
    ListItemArticleActionComponent,
  ],
  declarations: [
    ListComponent,
    ListTemplateComponent,
    ListItemArticleComponent,
    ListItemArticleActionComponent,
  ],
})
export class NgeUiListModule {}
