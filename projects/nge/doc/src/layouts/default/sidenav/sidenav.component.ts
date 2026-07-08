import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { NgeDocService } from '../../../nge-doc.service'

@Component({
  selector: 'nge-doc-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SidenavComponent {
  readonly docService = inject(NgeDocService)

  state$ = this.docService.stateChanges
}
