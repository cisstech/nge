import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  ViewEncapsulation,
  effect,
  inject,
  signal,
} from '@angular/core'
import { NgeDocRendererComponent } from '../../renderer/renderer.component'
import { NgeDocService } from '../../nge-doc.service'
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component'
import { HeaderComponent } from './header/header.component'
import { PagerComponent } from './pager/pager.component'
import { SearchPaletteComponent } from './search/search-palette.component'
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
    SearchPaletteComponent,
  ],
})
export class DefaultLayoutComponent {
  private readonly docService = inject(NgeDocService)

  protected readonly sidebarOpen = signal(false)
  protected readonly searchOpen = signal(false)

  constructor() {
    // Close the mobile navigation drawer whenever the active page changes.
    effect(() => {
      this.docService.currLink()
      this.sidebarOpen.set(false)
    })
  }

  @HostListener('document:keydown', ['$event'])
  protected onDocumentKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault()
      this.searchOpen.update((open) => !open)
    }
  }

  protected openSearch(): void {
    this.searchOpen.set(true)
  }

  protected closeSearch(): void {
    this.searchOpen.set(false)
  }

  protected toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open)
  }

  protected closeSidebar(): void {
    this.sidebarOpen.set(false)
  }
}
