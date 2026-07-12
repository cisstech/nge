import { Location } from '@angular/common'
import { Injectable, Injector, OnDestroy, computed, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { BehaviorSubject, Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'
import { NgeDocLink, NgeDocLinkActionHandler, NgeDocMeta, NgeDocState } from './nge-doc'
import { flattenPages, joinUrl, NgeDocManifest } from './manifest'
import { NgeDocSeoService } from './seo.service'
import { NgeDocSitesLoader } from './sites-loader'
import {
  DefaultNgeDocSearchProvider,
  NGE_DOC_SEARCH_PROVIDER,
  NgeDocSearchProvider,
  NgeDocSearchResult,
} from './search'
import {
  DEFAULT_NGE_DOC_LABELS,
  NGE_DOC_BRAND,
  NGE_DOC_EDIT_URL,
  NGE_DOC_LABELS,
  NGE_DOC_NAVBAR,
  NGE_DOC_SEO,
  NgeDocBrand,
  NgeDocLabels,
  NgeDocNavLink,
} from './nge-doc.providers'

@Injectable()
export class NgeDocService implements OnDestroy {
  private readonly router = inject(Router)
  private readonly injector = inject(Injector)
  private readonly location = inject(Location)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly seoService = inject(NgeDocSeoService)
  private readonly sitesLoader = inject(NgeDocSitesLoader)
  private readonly seo = inject(NGE_DOC_SEO, { optional: true })
  private readonly editUrlBase = inject(NGE_DOC_EDIT_URL, { optional: true })
  private readonly explicitNavbar = inject(NGE_DOC_NAVBAR, { optional: true })
  private readonly explicitBrand = inject(NGE_DOC_BRAND, { optional: true })
  private readonly searchProvider: NgeDocSearchProvider =
    inject(NGE_DOC_SEARCH_PROVIDER, { optional: true }) ?? new DefaultNgeDocSearchProvider()

  /** Resolved theme wording: the English defaults merged with any `withLabels` overrides. */
  readonly labels: NgeDocLabels = { ...DEFAULT_NGE_DOC_LABELS, ...inject(NGE_DOC_LABELS, { optional: true }) }

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

  /** Resolved documentation sites, in declaration order. */
  private manifests: NgeDocManifest[] = []

  /** Routable links across every site, in reading order (used for prev/next). */
  private routable: NgeDocLink[] = []

  private readonly subscriptions: Subscription[] = []

  private readonly snapshot = toSignal(this.state, { initialValue: this.state.value })

  /** Metadata of every registered documentation site, in declaration order. */
  readonly sites = signal<NgeDocMeta[]>([])

  /**
   * Header navigation links: the ones declared with `withNavbar`, or one per
   * registered site (its name and root) as a sensible default.
   */
  readonly navbar = computed<NgeDocNavLink[]>(
    () => this.explicitNavbar ?? this.sites().map((meta) => ({ title: meta.name, href: meta.root, icon: meta.logo }))
  )

  /**
   * Header brand: the one declared with `withBrand`, or the active site's name
   * and logo as a fallback. A fixed brand keeps the header stable across sites.
   */
  readonly brand = computed<NgeDocBrand>(() => {
    const meta = this.meta()
    return this.explicitBrand ?? { title: meta.name, icon: meta.logo }
  })

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
  /** "Edit this page" url for the active page, when `withEditLink` is set and the page has a source. */
  readonly editUrl = computed(() => {
    const link = this.currLink()
    return this.editUrlBase && link?.sourcePath ? joinUrl(this.editUrlBase, link.sourcePath) : undefined
  })
  /** ISO date the active page was last updated, when the compiler recorded it. */
  readonly lastUpdated = computed(() => this.currLink()?.lastUpdated)
  /** Relative url of the active page's raw markdown, used by "copy as markdown". */
  readonly markdownUrl = computed(() => {
    const renderer = this.currLink()?.renderer
    return typeof renderer === 'string' ? renderer : undefined
  })
  /** Absolute url of the active page's raw markdown (`<page>.md`), when `withSeo` is set. */
  readonly markdownAbsoluteUrl = computed(() => {
    const link = this.currLink()
    return this.seo?.url && link?.href ? joinUrl(this.seo.url, `${link.href}.md`) : undefined
  })

  /** documentation state */
  get stateChanges() {
    return this.state.pipe(filter((state) => !!state.currLink))
  }

  ngOnDestroy(): void {
    this.reset()
  }

  /**
   * Loads navigation from the router configuration: resolves each settings object
   * into a manifest, flattens it for prev/next, and hands the set to search.
   */
  async setup(): Promise<void> {
    this.reset()

    this.manifests = await this.sitesLoader.load(this.activatedRoute.snapshot.data)

    this.routable = this.manifests.flatMap((manifest) => flattenPages(manifest.pages))
    this.sites.set(this.manifests.map((manifest) => manifest.meta))
    await this.searchProvider.index(this.manifests)

    this.subscriptions.push(
      this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(this.onChangeRoute.bind(this))
    )

    this.onChangeRoute()
  }

  private async onChangeRoute(): Promise<void> {
    if (!this.manifests.length) {
      return
    }

    const path = this.location.path()
    const paths = [path, path + '/']

    const active = this.manifests.find((manifest) => paths.some((p) => p.includes(manifest.meta.root)))
    if (!active) {
      throw new Error('[nge-doc]: Unregistered page ' + path)
    }
    const { meta, pages: links } = active

    let { currLink } = this.state.value

    // ignore same page navigation (fragment navigation)
    if (currLink?.href && paths.some((p) => p.endsWith(currLink!.href!))) {
      return
    }

    // Resolve from scratch: a path that matches no page (a site root reached from
    // the navbar) must fall through to the redirect below instead of keeping the
    // previously active link, which would leave stale content under a new sidebar.
    let prevLink: NgeDocLink | undefined
    let nextLink: NgeDocLink | undefined
    currLink = undefined

    // calculate current, previous and next links (no wrap-around at the ends)
    for (let i = 0; i < this.routable.length; i++) {
      const link = this.routable[i]
      if (link.href && paths.some((p) => p.endsWith(link.href!))) {
        currLink = link
        prevLink = i > 0 ? this.routable[i - 1] : undefined
        nextLink = i < this.routable.length - 1 ? this.routable[i + 1] : undefined
        break
      }
    }

    // navigate to the first routable page if currLink is not defined
    if (!currLink) {
      const firstPage = links.find((link) => !link.separator && link.href)
      if (firstPage?.href) {
        this.router.navigateByUrl(firstPage.href, { replaceUrl: true })
      }
      return
    }

    // navigate to first children if currLink doesn't have a renderer
    if (!currLink.renderer && currLink.children?.length) {
      const firstChild = currLink.children.find((child) => child.href)
      if (firstChild?.href) {
        this.router.navigateByUrl(firstChild.href, { replaceUrl: true })
      }
      return
    }

    // expand visible links
    this.routable.forEach((link) => {
      if (link.href && paths.some((p) => p.endsWith(link.href!))) {
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
   * Searches the registered pages through the configured search provider.
   * @param query Free text to match (case-insensitive).
   */
  search(query: string): Promise<NgeDocSearchResult[]> {
    return this.searchProvider.search(query)
  }

  /**
   * Updates the document title, meta description and social tags for the active
   * page (canonical, Open Graph, Twitter). Canonical and `og:url` need `withSeo`.
   *
   * Called automatically on navigation from the link's `title`/`description`;
   * the renderer calls it again to apply values found in a page's frontmatter.
   */
  setSeo(title: string, description?: string, image?: string): void {
    this.seoService.apply({
      title,
      description,
      image,
      siteName: this.state.value.meta.name,
      href: this.state.value.currLink?.href,
    })
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
    this.manifests = []
    this.routable = []
  }
}
