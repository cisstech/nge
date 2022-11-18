import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ui-list-item-article-action',
  templateUrl: './list-item-article-action.component.html',
  styleUrls: ['./list-item-article-action.component.scss'],
})
export class ListItemArticleActionComponent {
  @Input() actionTitle?: string | number | boolean | null;
  @Input()
  @HostBinding('class.clickable')
  clickable = false;
}
