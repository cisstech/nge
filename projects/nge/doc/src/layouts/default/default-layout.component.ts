import { ChangeDetectionStrategy, Component, ViewEncapsulation, effect, inject, signal } from '@angular/core'
import { NgeDocRendererComponent } from '../../renderer/renderer.component'
import { NgeDocService } from '../../nge-doc.service'
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component'
import { HeaderComponent } from './header/header.component'
import { PagerComponent } from './pager/pager.component'
import { SidenavComponent } from './sidenav/sidenav.component'
import { TocComponent } from './toc/toc.component'

@Component({
  selector: 'nge-doc-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss', './theme.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    HeaderComponent,
    SidenavComponent,
    NgeDocRendererComponent,
    BreadcrumbComponent,
    PagerComponent,
    TocComponent,
  ],
})
export class DefaultLayoutComponent {
  private readonly docService = inject(NgeDocService)

  protected readonly sidebarOpen = signal(false)

  constructor() {
    // Close the mobile navigation drawer whenever the active page changes.
    effect(() => {
      this.docService.currLink()
      this.sidebarOpen.set(false)
    })
  }

  protected toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open)
  }

  protected closeSidebar(): void {
    this.sidebarOpen.set(false)
  }
}
