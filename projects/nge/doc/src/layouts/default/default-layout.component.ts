import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewEncapsulation,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core'
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router'
import { NgeDocRendererComponent } from '../../renderer/renderer.component'
import { NgeDocLink } from '../../nge-doc'
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
    DatePipe,
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
  private readonly router = inject(Router)

  protected readonly labels = this.docService.labels
  /** "Edit this page" url for the active page, when `withEditLink` is set. */
  protected readonly editUrl = this.docService.editUrl
  /** ISO date the active page was last updated, when the compiler recorded it. */
  protected readonly lastUpdated = this.docService.lastUpdated
  protected readonly sidebarOpen = signal(false)
  protected readonly searchOpen = signal(false)
  /** Desktop: whether the sidebar is collapsed to give the content more room. */
  protected readonly sidebarCollapsed = signal(this.readCollapsed())

  /** The scroll region, focused on navigation so the keyboard scrolls the page. */
  private readonly main = viewChild<ElementRef<HTMLElement>>('main')

  constructor() {
    effect(() => {
      this.docService.currLink()
      // Close the mobile navigation drawer whenever the active page changes.
      this.sidebarOpen.set(false)
      // Move focus to the content so the page can be scrolled with the keyboard
      // right away, and so assistive tech lands on the new page.
      this.main()?.nativeElement.focus({ preventScroll: true })
    })
  }

  @HostListener('document:keydown', ['$event'])
  protected onDocumentKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault()
      this.searchOpen.update((open) => !open)
      return
    }

    // Page shortcuts stay out of the way while typing, with a modifier held, or
    // when the search palette is open.
    if (
      this.searchOpen() ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey ||
      this.isTypingTarget(event.target)
    ) {
      return
    }

    if (event.key === 'ArrowRight' && this.goto(this.docService.nextLink())) {
      event.preventDefault()
    } else if (event.key === 'ArrowLeft' && this.goto(this.docService.prevLink())) {
      event.preventDefault()
    }
  }

  /** Navigates to a link when it exists; returns whether it did. */
  private goto(link: NgeDocLink | undefined): boolean {
    if (!link?.href) {
      return false
    }
    this.router.navigateByUrl(link.href)
    return true
  }

  /** Whether the event target is an editable control that owns the arrow keys. */
  private isTypingTarget(target: EventTarget | null): boolean {
    const el = target as HTMLElement | null
    if (!el?.tagName) {
      return false
    }
    return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable
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

  protected toggleCollapse(): void {
    const collapsed = !this.sidebarCollapsed()
    this.sidebarCollapsed.set(collapsed)
    try {
      localStorage?.setItem(COLLAPSE_KEY, collapsed ? '1' : '0')
    } catch {
      // storage may be unavailable (private mode, SSR); the choice just resets.
    }
  }

  private readCollapsed(): boolean {
    try {
      return localStorage?.getItem(COLLAPSE_KEY) === '1'
    } catch {
      return false
    }
  }
}

const COLLAPSE_KEY = 'nge-doc-sidebar-collapsed'
