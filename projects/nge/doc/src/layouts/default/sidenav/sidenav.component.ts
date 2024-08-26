import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NgeDocLink } from '../../../nge-doc'
import { NgeDocService } from '../../../nge-doc.service'

@Component({
  selector: 'nge-doc-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  state$ = this.docService.stateChanges

  constructor(readonly docService: NgeDocService) {}

  trackBy(_: number, item: NgeDocLink) {
    return item.href
  }
}
