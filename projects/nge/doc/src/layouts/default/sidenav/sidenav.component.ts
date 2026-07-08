import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { NgeDocService } from '../../../nge-doc.service'
import { NgTemplateOutlet, AsyncPipe } from '@angular/common'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'nge-doc-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RouterLink, AsyncPipe],
})
export class SidenavComponent {
  readonly docService = inject(NgeDocService)

  state$ = this.docService.stateChanges
}
