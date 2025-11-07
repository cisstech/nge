/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core'
import { ListItemTag } from '../list'

@Component({
  selector: 'ui-list-item-article',
  templateUrl: './list-item-article.component.html',
  styleUrls: ['./list-item-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemArticleComponent implements OnInit {
  @Input() articleTitle?: string | TemplateRef<any>
  @Input() articleUrl?: string | any[]
  @Input() articleBannerUrl?: string
  @Input() articleBannerAlt?: string
  @Input() articleIconUrl?: string
  @Input() articleIconAlt?: string
  @Input() articleDescription?: string | TemplateRef<any>
  @Input() articleTags: string[] | ListItemTag[] = []

  @Input() articleIconTemplate?: TemplateRef<any>
  @Input() articleTagIconTemplate?: TemplateRef<{ text: string; data?: any }>

  @Output() didClick = new EventEmitter()
  @Output() didClickTag = new EventEmitter<string>()
  @Output() didClickTitle = new EventEmitter()
  @Output() didClickTagItem = new EventEmitter<ListItemTag>()

  protected isClickable = false
  protected isTagsClickable = false
  protected isTitleClickable = false

  ngOnInit(): void {
    this.isClickable = this.didClick.observed
    this.isTitleClickable = this.didClickTitle.observed
    this.isTagsClickable = this.didClickTag.observed || this.didClickTagItem.observed
  }

  protected onClickHost() {
    this.didClick.emit()
  }

  protected onClickTitle($event: Event) {
    $event.stopPropagation()
    $event.preventDefault()
    this.didClickTitle.emit()
  }

  protected onClickTag($event: Event, tag: string) {
    $event.stopPropagation()
    $event.preventDefault()
    this.didClickTag.emit(tag)
  }

  protected onClickTagItem($event: Event, tag: ListItemTag) {
    $event.stopPropagation()
    $event.preventDefault()
    this.didClickTagItem.emit(tag)
  }

}
