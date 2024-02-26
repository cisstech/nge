import {
  Component,
  HostBinding,
  Input,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'ui-list-item-article-action',
  templateUrl: './list-item-article-action.component.html',
  styleUrls: ['./list-item-article-action.component.scss'],
})
export class ListItemArticleActionComponent {
  @Input() actionTitle?: string | number | boolean | TemplateRef<any> | null;

  @Input()
  @HostBinding('class.clickable')
  clickable = false;
}
