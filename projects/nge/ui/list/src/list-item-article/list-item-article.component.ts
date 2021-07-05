import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'ui-list-item-article',
  templateUrl: './list-item-article.component.html',
  styleUrls: ['./list-item-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemArticleComponent {
    @Input() articleTitle?: string;
    @Input() articleUrl?: string | any[];
    @Input() articleBannerUrl?: string;
    @Input() articleBannerAlt?: string;
    @Input() articleIconUrl?: string;
    @Input() articleIconAlt?: string;
    @Input() articleDescription?: string;
    @Input() articleTags: string[] = [];

    @Input() articleIconTemplate?: TemplateRef<any>;

    @Output() didClickTag = new EventEmitter<string>();
    @Output() didClickTitle = new EventEmitter();


    get isTagsCliclable(): boolean {
        return !!this.didClickTag?.observers.length;
    }
}
