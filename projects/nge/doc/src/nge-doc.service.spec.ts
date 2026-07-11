import { HttpClient } from '@angular/common/http'
import { Location } from '@angular/common'
import { TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject, of } from 'rxjs'
import { NgeDocLink, NgeDocSettings, NgeDocState } from './nge-doc'
import { docsFromManifest } from './manifest'
import { NgeDocService } from './nge-doc.service'

// The engine resolves hrefs by mutating the links in
// place, so each test needs a fresh, independent copy.
function makeSettings(): NgeDocSettings[] {
  return [
    {
      meta: { name: 'Alpha', root: '/docs/alpha/' },
      pages: [
        { title: 'Intro', href: 'intro', renderer: 'intro.md' },
        {
          title: 'Guide',
          href: 'guide',
          children: [{ title: 'Setup', href: 'setup', renderer: 'setup.md' }],
        },
      ],
    },
    {
      meta: { name: 'Beta', root: '/docs/beta/' },
      pages: [{ title: 'Start', href: 'start', renderer: 'start.md' }],
    },
  ]
}

describe('NgeDocService', () => {
  let service: NgeDocService
  let currentPath: string
  let settings: NgeDocSettings[]

  beforeEach(() => {
    currentPath = '/docs/alpha/intro'
    settings = makeSettings()
    TestBed.configureTestingModule({
      providers: [
        NgeDocService,
        { provide: Router, useValue: { events: new Subject(), navigateByUrl: jest.fn(), url: '/' } },
        { provide: ActivatedRoute, useValue: { snapshot: { data: settings, fragment: null } } },
        { provide: Location, useValue: { path: () => currentPath } },
      ],
    })
    service = TestBed.inject(NgeDocService)
  })

  // stateChanges is a BehaviorSubject-backed stream, so subscribing after setup
  // replays the latest resolved state synchronously.
  function latestState(): NgeDocState {
    let state!: NgeDocState
    service.stateChanges.subscribe((s) => (state = s)).unsubscribe()
    return state
  }

  it('resolves the current link without wrapping prev/next at the first page', async () => {
    currentPath = '/docs/alpha/intro'
    await service.setup()
    const state = latestState()
    expect(state.currLink?.title).toBe('Intro')
    expect(state.prevLink).toBeUndefined()
    expect(state.nextLink?.title).toBe('Guide')
  })

  it('does not wrap next at the last page', async () => {
    currentPath = '/docs/beta/start'
    await service.setup()
    const state = latestState()
    expect(state.currLink?.title).toBe('Start')
    expect(state.nextLink).toBeUndefined()
    expect(state.prevLink?.title).toBe('Setup')
  })

  it('searches pages by title and exposes their site/section path', async () => {
    await service.setup()
    const setup = (await service.search('set')).find((r) => r.title === 'Setup')
    expect(setup).toBeDefined()
    expect(setup?.slug).toBe('/docs/alpha/guide/setup')
    expect(setup?.path).toEqual(['Alpha', 'Guide'])
    // Pure grouping links (no renderer) are excluded from results.
    expect((await service.search('guide')).some((r) => r.title === 'Guide')).toBe(false)
    expect(await service.search('   ')).toEqual([])
  })

  it('builds the breadcrumb trail down to the active page', async () => {
    currentPath = '/docs/alpha/guide/setup'
    await service.setup()
    expect(service.breadcrumb().map((l) => l.title)).toEqual(['Guide', 'Setup'])
  })

  it('exposes registered sites and derives the navbar from them', async () => {
    await service.setup()
    expect(service.sites().map((m) => m.name)).toEqual(['Alpha', 'Beta'])
    expect(service.navbar().map((l) => l.href)).toEqual(['/docs/alpha/', '/docs/beta/'])
  })

  it('flags the navbar link of the active site', async () => {
    currentPath = '/docs/alpha/intro'
    await service.setup()
    expect(service.isNavLinkActive({ title: 'Alpha', href: '/docs/alpha/' })).toBe(true)
    expect(service.isNavLinkActive({ title: 'Beta', href: '/docs/beta/' })).toBe(false)
    expect(service.isNavLinkActive({ title: 'Ext', href: 'https://x.dev', external: true })).toBe(false)
  })

  it('does not mutate the input settings and can be set up repeatedly', async () => {
    await service.setup()
    // The consumer's link hrefs stay relative (resolution works on a copy).
    expect((settings[0].pages[0] as NgeDocLink).href).toBe('intro')
    // A second setup (e.g. re-navigating to the docs) still resolves correctly.
    await service.setup()
    expect(latestState().currLink?.title).toBe('Intro')
  })

  it('updates the document title and meta description', async () => {
    currentPath = '/docs/alpha/intro'
    await service.setup()
    expect(document.title).toBe('Intro · Alpha')

    service.setSeo('Custom', 'A description')
    expect(document.title).toBe('Custom · Alpha')
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('A description')
  })
})

describe('NgeDocService with a manifest source (docsFromManifest)', () => {
  const manifest = {
    meta: { name: 'Built', root: '/built' },
    pages: [
      { title: 'Home', href: '/built/home', renderer: 'assets/built/home.md' },
      { title: 'Next', href: '/built/next', renderer: 'assets/built/next.md' },
    ],
  }
  let service: NgeDocService
  let get: jest.Mock

  beforeEach(() => {
    get = jest.fn().mockReturnValue(of(manifest))
    TestBed.configureTestingModule({
      providers: [
        NgeDocService,
        { provide: Router, useValue: { events: new Subject(), navigateByUrl: jest.fn(), url: '/' } },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: [docsFromManifest('assets/docs/manifest.json')], fragment: null } },
        },
        { provide: Location, useValue: { path: () => '/built/home' } },
        { provide: HttpClient, useValue: { get } },
      ],
    })
    service = TestBed.inject(NgeDocService)
  })

  it('fetches the manifest and resolves navigation from it', async () => {
    await service.setup()

    expect(get).toHaveBeenCalledWith('assets/docs/manifest.json')
    expect(service.sites().map((m) => m.name)).toEqual(['Built'])

    let state!: NgeDocState
    service.stateChanges.subscribe((s) => (state = s)).unsubscribe()
    expect(state.currLink?.title).toBe('Home')
    expect(state.nextLink?.title).toBe('Next')
  })
})
