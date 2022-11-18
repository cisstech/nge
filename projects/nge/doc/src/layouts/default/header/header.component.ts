import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Injector,
  Output,
} from '@angular/core';
import { NgeDocLinkActionHandler } from '../../../nge-doc';
import { NgeDocService } from '../../../nge-doc.service';

@Component({
  selector: 'nge-doc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter();
  state$ = this.docService.stateChanges;

  constructor(
    readonly injector: Injector,
    readonly docService: NgeDocService
  ) {}

  async invoke(handler: NgeDocLinkActionHandler) {
    if (typeof handler === 'string') {
      window.open(handler, '_blank');
    } else {
      await handler(this.injector);
    }
  }
}
