import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NgeDocService } from '../../../nge-doc.service'

@Component({
    selector: 'nge-doc-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SidenavComponent {
  state$ = this.docService.stateChanges

  constructor(readonly docService: NgeDocService) {}
}
