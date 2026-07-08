/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, HostBinding, HostListener, Input, TemplateRef, ChangeDetectionStrategy } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { ListComponent } from '../list.component'
import { IsTemplatePipe } from '@cisstech/nge/pipes'

@Component({
  selector: 'ui-list-item-article-action',
  templateUrl: './list-item-article-action.component.html',
  styleUrls: ['./list-item-article-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgTemplateOutlet, ListComponent, IsTemplatePipe],
})
export class ListItemArticleActionComponent {
  @Input() actionTitle?: string | number | boolean | TemplateRef<any> | null

  @Input()
  @HostBinding('class.clickable')
  clickable = false

  @HostListener('click', ['$event'])
  protected onClick($event: Event) {
    // Prevent event propagation to parent clickable elements (like the article item)
    $event.stopPropagation()
  }
}
