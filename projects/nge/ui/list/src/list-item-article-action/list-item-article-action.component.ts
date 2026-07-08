/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, HostListener, TemplateRef, input } from '@angular/core'
import { IsTemplatePipe } from '@cisstech/nge/pipes'

@Component({
  selector: 'ui-list-item-article-action',
  templateUrl: './list-item-article-action.component.html',
  styleUrls: ['./list-item-article-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, IsTemplatePipe],
  host: { '[class.clickable]': 'clickable()' },
})
export class ListItemArticleActionComponent {
  readonly actionTitle = input<string | number | boolean | TemplateRef<any> | null>()

  readonly clickable = input(false)

  @HostListener('click', ['$event'])
  protected onClick($event: Event) {
    // Prevent event propagation to parent clickable elements (like the article item)
    $event.stopPropagation()
  }
}
