import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemTag } from '../list';

@Component({
  selector: 'ui-list-item-article',
  templateUrl: './list-item-article.component.html',
  styleUrls: ['./list-item-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemArticleComponent implements OnInit {
  @Input() articleTitle?: string | TemplateRef<any>;
  @Input() articleUrl?: string | any[];
  @Input() articleBannerUrl?: string;
  @Input() articleBannerAlt?: string;
  @Input() articleIconUrl?: string;
  @Input() articleIconAlt?: string;
  @Input() articleDescription?: string | TemplateRef<any>;
  @Input() articleTags: string[] | ListItemTag[] = [];

  @Input() articleIconTemplate?: TemplateRef<any>;
  @Input() articleTagIconTemplate?: TemplateRef<{ text: string; data?: any }>;

  @Output() didClickTag = new EventEmitter<string>();
  @Output() didClickTagItem = new EventEmitter<ListItemTag>();
  @Output() didClickTitle = new EventEmitter();

  protected isTagsCliclable = false

  ngOnInit(): void {
    this.isTagsCliclable = this.didClickTag.observed || this.didClickTagItem.observed;
  }
}
