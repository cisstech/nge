/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core'
import { outputFromObservable } from '@angular/core/rxjs-interop'
import { Subject } from 'rxjs'
import { ListItemTag } from '../list'
import { NgTemplateOutlet } from '@angular/common'
import { RouterLink } from '@angular/router'
import { IsTemplatePipe, IsStringPipe } from '@cisstech/nge/pipes'

@Component({
  selector: 'ui-list-item-article',
  templateUrl: './list-item-article.component.html',
  styleUrls: ['./list-item-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RouterLink, IsTemplatePipe, IsStringPipe],
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

  private readonly didClick$ = new Subject<void>()
  readonly didClick = outputFromObservable(this.didClick$)

  private readonly didClickTag$ = new Subject<string>()
  readonly didClickTag = outputFromObservable(this.didClickTag$)

  private readonly didClickTitle$ = new Subject<void>()
  readonly didClickTitle = outputFromObservable(this.didClickTitle$)

  private readonly didClickTagItem$ = new Subject<ListItemTag>()
  readonly didClickTagItem = outputFromObservable(this.didClickTagItem$)

  protected isClickable = false
  protected isTagsClickable = false
  protected isTitleClickable = false

  ngOnInit(): void {
    this.isClickable = this.didClick$.observed
    this.isTitleClickable = this.didClickTitle$.observed
    this.isTagsClickable = this.didClickTag$.observed || this.didClickTagItem$.observed
  }

  protected onClickHost() {
    this.didClick$.next()
  }

  protected onClickTitle($event: Event) {
    $event.stopPropagation()
    $event.preventDefault()
    this.didClickTitle$.next()
  }

  protected onClickTag($event: Event, tag: string) {
    $event.stopPropagation()
    $event.preventDefault()
    this.didClickTag$.next(tag)
  }

  protected onClickTagItem($event: Event, tag: ListItemTag) {
    $event.stopPropagation()
    $event.preventDefault()
    this.didClickTagItem$.next(tag)
  }
}
