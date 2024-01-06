import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { NgArrayPipesModule } from 'ngx-pipes';

import { IsStringPipe, IsTemplatePipe } from '@cisstech/nge/pipes';
import { ListItemArticleActionComponent } from './list-item-article-action/list-item-article-action.component';
import { ListItemArticleComponent } from './list-item-article/list-item-article.component';
import { ListTemplateComponent } from './list-template.component';
import { ListComponent } from './list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ScrollingModule,
    IsTemplatePipe,
    IsStringPipe,
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
