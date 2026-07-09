import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgeDocService } from '../../../nge-doc.service'
import { NgeDocIconComponent } from '../icon/icon.component'
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component'

@Component({
  selector: 'nge-doc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgTemplateOutlet, ThemeToggleComponent, NgeDocIconComponent],
})
export class HeaderComponent {
  protected readonly docService = inject(NgeDocService)
  protected readonly meta = this.docService.meta
  protected readonly currLink = this.docService.currLink
  protected readonly navbar = this.docService.navbar
  protected readonly brand = this.docService.brand

  /** Whether the desktop sidebar is currently collapsed. */
  readonly collapsed = input(false)

  /** Emitted when the mobile navigation toggle is pressed. */
  readonly toggleSidebar = output()
  /** Emitted when the desktop sidebar collapse toggle is pressed. */
  readonly toggleCollapse = output()
  /** Emitted when the search trigger is pressed (wired by the search feature). */
  readonly openSearch = output()
}
