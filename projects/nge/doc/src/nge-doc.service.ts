import { Location } from '@angular/common'
import { Injectable, Injector, OnDestroy, computed, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Meta, Title } from '@angular/platform-browser'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { BehaviorSubject, Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'
import { NgeDocLink, NgeDocLinkActionHandler, NgeDocMeta, NgeDocState, extractNgeDocSettings } from './nge-doc'
import { NGE_DOC_NAVBAR, NgeDocNavLink } from './nge-doc.providers'

/** A page matched by {@link NgeDocService.search}. */
export interface NgeDocSearchResult {
  /** The matched link. */
  link: NgeDocLink
  /** Title of the matched link. */
  title: string
  /** Titles of the ancestor links, from the top of the tree down (excludes the match). */
  path: string[]
}

@Injectable()
export class NgeDocService implements OnDestroy {
  private readonly router = inject(Router)
  private readonly injector = inject(Injector)
  private readonly location = inject(Location)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly title = inject(Title)
  private readonly metaTags = inject(Meta)
  private readonly explicitNavbar = inject(NGE_DOC_NAVBAR, { optional: true })

  private readonly state = new BehaviorSubject<NgeDocState>({
    meta: {
      root: '',
      name: '',
    },
    links: [],
    prevLink: undefined,
    nextLink: undefined,
    currLink: undefined,
  })

  private readonly pages = new Map<
    string,
    {
      meta: NgeDocMeta
      links: NgeDocLink[]
    }
  >()

  private readonly links: NgeDocLink[] = []

  private readonly subscriptions: Subscription[] = []

  private readonly snapshot = toSignal(this.state, { initialValue: this.state.value })

  /** Metadata of every registered documentation site, in declaration order. */
  readonly sites = signal<NgeDocMeta[]>([])

  /**
   * Header navigation links: the ones declared with `withNavbar`, or one per
   * registered site (its name and root) as a sensible default.
   */
  readonly navbar = computed<NgeDocNavLink[]>(
    () =>
      this.explicitNavbar ??
      this.sites().map((meta) => ({ title: meta.name, href: meta.root, icon: meta.logo }))
  )

  /** Metadata of the active documentation site. */
  readonly meta = computed(() => this.snapshot().meta)
  /** Root links of the active documentation site (the navigation tree). */
  readonly rootLinks = computed(() => this.snapshot().links)
  /** Active link, or `undefined` before the first navigation resolves. */
  readonly currLink = computed(() => this.snapshot().currLink)
  /** Link before the active one in reading order. */
  readonly prevLink = computed(() => this.snapshot().prevLink)
  /** Link after the active one in reading order. */
  readonly nextLink = computed(() => this.snapshot().nextLink)
  /** Ancestor chain from a root link down to the active one, inclusive. */
  readonly breadcrumb = computed(() => this.trailTo(this.snapshot()))

  /** documentation state */
  get stateChanges() {
    return this.state.pipe(filter((state) => !!state.currLink))
  }

  ngOnDestroy(): void {
    this.reset()
  }

  /**
   * Loads navigation from the router configuration.
   */
  async setup(): Promise<void> {
    this.reset()

    const { data } = this.activatedRoute.snapshot
    const settings = extractNgeDocSettings(data)

    for (const setting of settings) {
      const links: NgeDocLink[] = []

      let meta: NgeDocMeta | undefined
      if (typeof setting.meta === 'function') {
        meta = await setting.meta(this.injector)
      } else {
        meta = setting.meta
      }

      if (!meta) {
        throw new Error('[nge-doc]: Missing setting.meta')
      }

      for (const item of setting.pages) {
        const pages: NgeDocLink[] = []

        let object: NgeDocLink | NgeDocLink[]
        if (typeof item === 'function') {
          object = await item(this.injector)
        } else {
          object = item
        }

        if (Array.isArray(object)) {
          pages.push(...object)
        } else {
          pages.push(object)
        }

        pages.forEach((page) => {
          links.push(page)
          this.resolvePageLinks(meta!, page)
        })

        this.pages.set(meta.root, {
          meta,
          links: links,
        })
      }
    }

    this.sites.set(Array.from(this.pages.values()).map((page) => page.meta))

    this.subscriptions.push(
      this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(this.onChangeRoute.bind(this))
    )

    this.onChangeRoute()
  }

  /**
   * Checks whether the given `link` is active.
   * @param link The link to test.
   */
  isActive(link: NgeDocLink): boolean {
    const tree = this.location.path().split('/')
    for (let i = 0; i < tree.length; i++) {
      const path = tree.slice(0, tree.length - i).join('/')
      if (path && path.endsWith(link.href)) {
        return true
      }
    }
    return false
  }

  /**
   * Checks whether the given `link` includes sub links.
   * @param link The link to test.
   */
  isExpandable(link: NgeDocLink): boolean {
    return !!link.children?.length
  }

  private join(a: string, b: string): string {
    if (a.endsWith('/')) {
      a = a.slice(0, a.length - 1)
    }
    if (b.startsWith('/')) {
      b = b.slice(1)
    }
    return a + '/' + b
  }

  private resolvePageLinks(meta: NgeDocMeta, page: NgeDocLink) {
    const createLink = (link: NgeDocLink, parent: string) => {
      link.href = this.join(parent, link.href)
      this.links.push(link)
      link.children?.forEach((child) => {
        createLink(child, link.href)
      })
    }
    createLink(page, meta.root)
  }

  private async onChangeRoute(): Promise<void> {
    if (!this.pages.size) {
      return
    }

    const path = this.location.path()
    const paths = [path, path + '/']

    let meta: NgeDocMeta | undefined
    let links: NgeDocLink[] = []

    for (const [k, v] of this.pages) {
      if (paths.some((path) => path.includes(k))) {
        meta = v.meta
        links = v.links
        break
      }
    }

    if (!meta) {
      throw new Error('[nge-doc]: Unregisted page ' + path)
    }

    let { currLink, prevLink, nextLink } = this.state.value

    // ignore same page navigation (fragment navigation)
    if (currLink && paths.some((p) => p.endsWith(currLink!.href))) {
      return
    }

    // calculate current, previous and next links (no wrap-around at the ends)
    for (let i = 0; i < this.links.length; i++) {
      const link = this.links[i]
      if (paths.some((path) => path.endsWith(link.href))) {
        currLink = link
        prevLink = i > 0 ? this.links[i - 1] : undefined
        nextLink = i < this.links.length - 1 ? this.links[i + 1] : undefined
        break
      }
    }

    // navigate to first page if currLink is not defined
    if (!currLink) {
      this.router.navigateByUrl(links[0].href, {
        replaceUrl: true,
      })
      return
    }

    // navigate to first children if currLink doesn't have a renderer
    if (!currLink.renderer && currLink.children?.length) {
      this.router.navigateByUrl(currLink.children[0].href, {
        replaceUrl: true,
      })
      return
    }

    // expand visible links

    this.links.forEach((link) => {
      if (paths.some((path) => path.endsWith(link.href))) {
        link.expanded = true
      }
    })

    // notify state change

    this.state.next({
      meta,
      links,
      prevLink,
      currLink,
      nextLink,
    })

    this.setSeo(currLink.title, currLink.description)
  }

  /**
   * Runs a link action.
   *
   * A string handler is treated as a url to open in a new tab; a function
   * handler is invoked with the environment injector.
   * @param run The action handler declared on a link.
   */
  async runAction(run: NgeDocLinkActionHandler): Promise<void> {
    if (typeof run === 'string') {
      window.open(run, '_blank', 'noopener')
      return
    }
    await run(this.injector)
  }

  /**
   * Searches the registered pages by title.
   * @param query Free text to match against link titles (case-insensitive).
   * @returns Up to 20 renderable pages, best matches first.
   */
  search(query: string): NgeDocSearchResult[] {
    const needle = query.trim().toLowerCase()
    if (!needle) {
      return []
    }

    const scored: { result: NgeDocSearchResult; score: number }[] = []
    for (const link of this.links) {
      // Skip pure grouping links that cannot be rendered on their own.
      if (!link.renderer && link.children?.length) {
        continue
      }
      const title = link.title ?? ''
      const index = title.toLowerCase().indexOf(needle)
      if (index >= 0) {
        scored.push({ result: { link, title, path: this.trailTitles(link) }, score: index })
      }
    }

    return scored
      .sort((a, b) => a.score - b.score || a.result.title.length - b.result.title.length)
      .slice(0, 20)
      .map((entry) => entry.result)
  }

  /** Site name then a link's ancestor titles across the navigation trees, target excluded. */
  private trailTitles(target: NgeDocLink): string[] {
    for (const { meta, links } of this.pages.values()) {
      const trail: string[] = []
      if (this.collectTitles(links, target, trail)) {
        return [meta.name, ...trail.slice(0, -1)].filter(Boolean)
      }
    }
    return []
  }

  private collectTitles(nodes: NgeDocLink[], target: NgeDocLink, acc: string[]): boolean {
    for (const node of nodes) {
      acc.push(node.title)
      if (node.href === target.href) {
        return true
      }
      if (node.children?.length && this.collectTitles(node.children, target, acc)) {
        return true
      }
      acc.pop()
    }
    return false
  }

  /**
   * Updates the document title and meta description for the active page.
   *
   * Called automatically on navigation from the link's `title`/`description`;
   * the renderer calls it again to apply values found in a page's frontmatter.
   */
  setSeo(title: string, description?: string): void {
    const siteName = this.state.value.meta.name
    const pageTitle = title?.trim()
    this.title.setTitle(pageTitle && pageTitle !== siteName ? `${pageTitle} · ${siteName}` : pageTitle || siteName)
    if (description?.trim()) {
      this.metaTags.updateTag({ name: 'description', content: description.trim() })
    }
  }

  /** Whether a header navigation link points to the active site. */
  isNavLinkActive(link: NgeDocNavLink): boolean {
    if (link.external) {
      return false
    }
    const strip = (url: string) => url.replace(/\/+$/, '')
    const current = strip(this.meta().root)
    const target = strip(link.href)
    return current === target || current.startsWith(target + '/')
  }

  /** Walks the navigation tree to the active link, collecting its ancestors. */
  private trailTo(state: NgeDocState): NgeDocLink[] {
    const { currLink, links } = state
    if (!currLink) {
      return []
    }

    const trail: NgeDocLink[] = []
    const walk = (nodes: NgeDocLink[], ancestors: NgeDocLink[]): boolean => {
      for (const node of nodes) {
        const path = [...ancestors, node]
        if (node.href === currLink.href) {
          trail.push(...path)
          return true
        }
        if (node.children?.length && walk(node.children, path)) {
          return true
        }
      }
      return false
    }

    walk(links, [])
    return trail
  }

  private reset(): void {
    this.subscriptions.forEach((s) => s.unsubscribe())
    this.subscriptions.splice(0, this.subscriptions.length)
    this.pages.clear()
    this.links.splice(0, this.links.length)
  }
}
