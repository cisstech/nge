import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgeDocService } from '../../../nge-doc.service'
import { NgeDocIconComponent } from '../icon/icon.component'

@Component({
  selector: 'nge-doc-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RouterLink, NgeDocIconComponent],
})
export class SidenavComponent {
  protected readonly docService = inject(NgeDocService)
  protected readonly rootLinks = this.docService.rootLinks
  protected readonly navbar = this.docService.navbar
}
