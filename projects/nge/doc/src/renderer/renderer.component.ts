import { Location } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  Type,
  ViewContainerRef,
  inject,
  signal,
  viewChild,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CompilerService } from '@cisstech/nge/services'
import { Subscription, firstValueFrom } from 'rxjs'
import { parseFrontmatter } from '../frontmatter'
import { NGE_DOC_RENDERERS, NgeDocState } from '../nge-doc'
import { NgeDocService } from '../nge-doc.service'

/** A heading extracted from the rendered page, used to build a table of contents. */
export interface NgeDocHeading {
  /** Slug assigned to the heading element, usable as a url fragment. */
  id: string
  /** Text content of the heading. */
  label: string
  /** Heading level (2 for `h2`, 3 for `h3`). */
  level: number
}

/** An observable-like output a rendered component may expose to signal readiness. */
interface RenderSignal {
  subscribe(next: (value?: unknown) => void): { unsubscribe(): void }
}

/** Minimal shape of a markdown component that reports when its content is painted. */
interface MarkdownRenderSource {
  rendered?: RenderSignal
  render?: RenderSignal
}

@Component({
  selector: 'nge-doc-renderer',
  templateUrl: 'renderer.component.html',
  styleUrls: ['renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'onHostClick($event)',
  },
})
export class NgeDocRendererComponent implements OnInit, OnDestroy {
  private readonly injector = inject(Injector)
  private readonly renderers = inject(NGE_DOC_RENDERERS)
  private readonly docService = inject(NgeDocService)
  private readonly compilerService = inject(CompilerService)
  private readonly changeDetectorRef = inject(ChangeDetectorRef)
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private readonly location = inject(Location)

  private subscriptions: Subscription[] = []
  protected readonly loading = signal(false)
  protected readonly notFound = signal(false)
  protected componentRefByTypes = new Map<Type<any>, ComponentRef<any>>()

  componentRef?: ComponentRef<any>

  /** Headings of the current page, in document order. */
  readonly headings = signal<NgeDocHeading[]>([])
  /** Id of the heading currently in view, driven by scroll position. */
  readonly activeHeadingId = signal<string | null>(null)

  readonly container = viewChild.required('container', { read: ViewContainerRef })

  private contentObserver?: MutationObserver
  private headingObserver?: IntersectionObserver
  private headingElements: HTMLHeadingElement[] = []
  private readonly visibility = new Map<Element, boolean>()
  private syncScheduled = false

  ngOnInit(): void {
    this.subscriptions.push(this.docService.stateChanges.subscribe(this.onChangeState.bind(this)))

    // Markdown renders asynchronously, so watch the host for content mutations
    // and rebuild the heading list once the page settles.
    this.contentObserver = new MutationObserver(() => this.scheduleSync())
    this.contentObserver.observe(this.elementRef.nativeElement, { childList: true, subtree: true })
  }

  ngOnDestroy(): void {
    this.clearViewContainer()
    this.contentObserver?.disconnect()
    this.headingObserver?.disconnect()
    this.subscriptions.forEach((s) => s.unsubscribe())
  }

  /** Scrolls a heading into view, offset by the sticky header via `scroll-margin-top`. */
  scrollToHeading(id: string): void {
    this.headingElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    this.activeHeadingId.set(id)
  }

  /**
   * Routes clicks on internal links through the Angular router. Authored Markdown
   * links are plain anchors (for example `/docs/getting-started`); left to the
   * browser they trigger a full-page load to an absolute path that ignores the
   * deployed `<base href>`, so under a base href such as `/nge/` the segment is
   * dropped. Routing them keeps navigation in the SPA and re-applies the base href.
   */
  protected onHostClick(event: MouseEvent): void {
    // Let the browser handle modified clicks (new tab, download, ...).
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    const anchor = (event.target as HTMLElement | null)?.closest('a')
    if (!anchor) {
      return
    }

    const target = anchor.getAttribute('target')
    if ((target && target !== '_self') || anchor.hasAttribute('download')) {
      return
    }

    let url: URL
    try {
      url = new URL(anchor.href)
    } catch {
      return
    }

    // Leave links to other origins to the browser.
    if (url.origin !== window.location.origin) {
      return
    }

    event.preventDefault()

    // `normalize` strips the base href, giving a path the router understands; the
    // router re-applies the base href when it updates the address bar.
    const path = this.location.normalize(url.pathname)
    const fragment = url.hash.replace(/^#/, '')

    if (fragment && path === this.location.path().split('?')[0]) {
      this.scrollToHeading(fragment)
      return
    }

    this.router.navigateByUrl(path + url.search + url.hash)
  }

  private showLoading(): void {
    this.loading.set(true)

    // if loading is still true after 1s then we force change detection
    // This is useful to show the loading indicator only if the loading is not too fast
    // so that the loading indicator does not blink.
    setTimeout(() => {
      if (this.loading()) {
        this.changeDetectorRef.markForCheck()
      }
    }, 1000)
  }

  private clearViewContainer(): void {
    const componentRefs = Array.from(this.componentRefByTypes.values())
    if (this.componentRef && componentRefs.includes(this.componentRef)) {
      while (this.container().length > 0) {
        this.container().detach()
      }
    } else {
      this.componentRef?.destroy()
      this.componentRef = undefined
      this.container().clear()
    }
  }

  private async onChangeState(state: NgeDocState): Promise<void> {
    try {
      this.showLoading()
      this.clearViewContainer()

      if (state.currLink) {
        const renderer = await state.currLink.renderer
        switch (typeof renderer) {
          case 'string':
            // Markdown paints asynchronously; renderMarkdown keeps the skeleton
            // up until it has rendered so the reader never sees the render shift.
            await this.renderMarkdown(renderer)
            break
          case 'function':
            this.componentRef = await this.compilerService.render({
              type: await renderer(),
              inputs: state.currLink.inputs,
              container: this.container(),
            })
            this.loading.set(false)
            break
        }
      } else {
        this.loading.set(false)
      }
    } catch (error) {
      console.error(error)
      this.loading.set(false)
    } finally {
      this.notFound.set(!this.componentRef)
      this.changeDetectorRef.markForCheck()
      this.scheduleSync()
    }
  }

  private async renderMarkdown(data: string): Promise<void> {
    if (!this.renderers?.markdown) {
      throw new Error('[nge-doc]: missing markdown renderer.')
    }

    const renderer = this.renderers.markdown
    const type = await renderer.component()

    const createInputs = async (): Promise<Record<string, any>> => {
      let inputs: Record<string, any> = {
        data, // we assume that data is a markdown content.
      }

      if (!data.includes('\n')) {
        // if data does not include at least two lines then it's an url
        const http = this.injector.get(HttpClient, null)
        if (!http) {
          throw new Error(
            '[nge-doc] When using the `file` renderer you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information'
          )
        }

        inputs = {
          data: await firstValueFrom(http.get(data, { responseType: 'text' })),
        }
      }

      // Strip an optional frontmatter block and feed its title/description to SEO.
      const parsed = parseFrontmatter(inputs['data'])
      inputs['data'] = parsed.content
      this.applyFrontmatterSeo(parsed.data)

      let customInputs: Record<string, any> = {}
      if (typeof renderer.inputs === 'function') {
        customInputs = await renderer.inputs(this.injector)
      } else if (typeof renderer.inputs === 'object') {
        customInputs = renderer.inputs
      }

      return { ...customInputs, ...inputs }
    }

    const markdownComponent = this.componentRefByTypes.get(type)
    if (markdownComponent) {
      this.attachComponent(markdownComponent, await createInputs())
      this.awaitMarkdownRender(markdownComponent)
      return
    }

    const componentRef = await this.compilerService.render({
      type,
      inputs: await createInputs(),
      container: this.container(),
    })

    this.componentRef = componentRef
    this.componentRefByTypes.set(type, componentRef)
    this.awaitMarkdownRender(componentRef)
  }

  /**
   * Hides the loading skeleton once the markdown content has painted. It prefers
   * the component's `rendered` output (emitted after the content is revealed) and
   * falls back to `render` (emitted after compile) for a custom renderer that
   * lacks it. The guard ignores stale emits from a previous navigation, and the
   * timeout is a safety net for a renderer that never emits (for example when
   * compilation throws).
   */
  private awaitMarkdownRender(componentRef: ComponentRef<unknown>): void {
    const done = () => {
      if (this.componentRef === componentRef) {
        this.loading.set(false)
        this.changeDetectorRef.markForCheck()
      }
    }

    const instance = componentRef.instance as MarkdownRenderSource | null
    const ready = instance?.rendered ?? instance?.render
    if (ready && typeof ready.subscribe === 'function') {
      const subscription = ready.subscribe(() => {
        done()
        subscription.unsubscribe()
      })
      setTimeout(done, 5000)
    } else {
      done()
    }
  }

  private attachComponent(componentRef: ComponentRef<any>, inputs: Record<string, any>): void {
    this.container().insert(componentRef.hostView)
    this.componentRef = componentRef

    Object.keys(inputs).forEach((key) => {
      componentRef.setInput(key, inputs[key])
    })

    componentRef.changeDetectorRef.markForCheck()
  }

  /** Debounces heading extraction so a burst of DOM mutations rebuilds the list once. */
  private scheduleSync(): void {
    if (this.syncScheduled) {
      return
    }
    this.syncScheduled = true
    setTimeout(() => {
      this.syncScheduled = false
      this.syncHeadings()
    }, 50)
  }

  private syncHeadings(): void {
    const host = this.elementRef.nativeElement
    const elements = Array.from(host.querySelectorAll<HTMLHeadingElement>('h2, h3')).filter((el) =>
      el.textContent?.trim()
    )

    const used = new Set<string>()
    const headings = elements.map((el) => {
      const label = el.textContent!.trim()
      const base = el.id || this.slugify(label) || 'section'
      let id = base
      let index = 2
      while (used.has(id)) {
        id = `${base}-${index++}`
      }
      used.add(id)

      el.id = id
      el.style.scrollMarginTop = 'var(--nge-doc-scroll-margin, 5rem)'
      return { id, label, level: el.tagName === 'H2' ? 2 : 3 }
    })

    this.headingElements = elements
    this.headings.set(headings)
    this.observeHeadings()
    this.scrollToInitialFragment()
  }

  private observeHeadings(): void {
    this.headingObserver?.disconnect()
    this.visibility.clear()
    if (!this.headingElements.length || typeof IntersectionObserver === 'undefined') {
      return
    }

    this.headingObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          this.visibility.set(entry.target, entry.isIntersecting)
        }
        const active = this.headingElements.find((el) => this.visibility.get(el))
        if (active) {
          this.activeHeadingId.set(active.id)
        }
      },
      { rootMargin: '-80px 0px -66% 0px', threshold: 0 }
    )

    this.headingElements.forEach((el) => this.headingObserver!.observe(el))
  }

  /** Re-applies the url fragment once the (async) content that owns it exists. */
  private scrollToInitialFragment(): void {
    const fragment = this.activatedRoute.snapshot.fragment
    if (!fragment) {
      return
    }
    const target = this.headingElementById(fragment)
    if (target) {
      target.scrollIntoView({ block: 'start' })
      this.activeHeadingId.set(fragment)
    }
  }

  private headingElementById(id: string): HTMLHeadingElement | null {
    const escaped = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(id) : id
    return this.elementRef.nativeElement.querySelector<HTMLHeadingElement>(`#${escaped}`)
  }

  /** Refines the page SEO with a title/description declared in the frontmatter. */
  private applyFrontmatterSeo(frontmatter: Record<string, string>): void {
    if (!frontmatter['title'] && !frontmatter['description']) {
      return
    }
    const link = this.docService.currLink()
    this.docService.setSeo(frontmatter['title'] ?? link?.title ?? '', frontmatter['description'] ?? link?.description)
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
}
