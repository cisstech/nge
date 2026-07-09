import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { NgeDocLink } from '../../../nge-doc'
import { NgeDocService } from '../../../nge-doc.service'
import { NgeDocIconComponent } from '../icon/icon.component'

@Component({
  selector: 'nge-doc-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RouterLink, RouterLinkActive, NgeDocIconComponent],
})
export class SidenavComponent {
  protected readonly docService = inject(NgeDocService)
  protected readonly rootLinks = this.docService.rootLinks
  protected readonly navbar = this.docService.navbar

  /** Explicit open/closed choices, keyed by href; they win over the default. */
  private readonly overrides = signal<ReadonlyMap<string, boolean>>(new Map())

  constructor() {
    // Navigating re-opens the folders leading to the active page, so the reader
    // always sees where they are even after collapsing a branch earlier.
    effect(() => {
      const trail = this.docService.breadcrumb()
      if (trail.length < 2) {
        return
      }
      const ancestors = trail
        .slice(0, -1)
        .map((link) => link.href)
        .filter((href): href is string => href != null)
      this.overrides.update((prev) => {
        if (!ancestors.some((href) => prev.has(href))) {
          return prev
        }
        const next = new Map(prev)
        ancestors.forEach((href) => next.delete(href))
        return next
      })
    })
  }

  protected isExpandable(link: NgeDocLink): boolean {
    return !!link.children?.length
  }

  /** A folder is open by default when it holds the active page; a toggle overrides that. */
  protected isOpen(link: NgeDocLink): boolean {
    const override = link.href ? this.overrides().get(link.href) : undefined
    return override ?? this.holdsActive(link)
  }

  protected toggle(link: NgeDocLink): void {
    if (!link.href) {
      return
    }
    const next = new Map(this.overrides())
    next.set(link.href, !this.isOpen(link))
    this.overrides.set(next)
  }

  /** Whether the active page is this link or lives somewhere in its subtree. */
  private holdsActive(link: NgeDocLink): boolean {
    const active = this.docService.currLink()
    if (!active) {
      return false
    }
    if (link.href === active.href) {
      return true
    }
    return (link.children ?? []).some((child) => this.holdsActive(child))
  }
}
