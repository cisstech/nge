import { Injector } from '@angular/core'
import { NgeDocSettings } from './nge-doc'
import { docsFromManifest, extractManifestSources, flattenPages, settingsToManifest } from './manifest'

// Static settings never touch the injector; dynamic factories receive it but the
// tests don't need a real one.
const injector = {} as Injector

describe('settingsToManifest', () => {
  it('resolves a static site into a manifest carrying its meta and pages', async () => {
    const settings: NgeDocSettings = {
      meta: { name: 'Docs', root: '/docs' },
      pages: [{ title: 'Intro', href: 'intro', renderer: 'intro.md' }],
    }

    const manifest = await settingsToManifest(settings, injector)

    expect(manifest.meta).toEqual({ name: 'Docs', root: '/docs' })
    expect(manifest.pages.map((p) => p.title)).toEqual(['Intro'])
  })

  it('makes page hrefs absolute under the site root', async () => {
    const manifest = await settingsToManifest(
      { meta: { name: 'Docs', root: '/docs' }, pages: [{ title: 'Getting started', href: 'getting-started' }] },
      injector
    )

    expect(manifest.pages[0].href).toBe('/docs/getting-started')
  })

  it('nests children under their parent href', async () => {
    const manifest = await settingsToManifest(
      {
        meta: { name: 'Docs', root: '/docs' },
        pages: [{ title: 'Guides', href: 'guides', children: [{ title: 'Install', href: 'install' }] }],
      },
      injector
    )

    expect(manifest.pages[0].href).toBe('/docs/guides')
    expect(manifest.pages[0].children?.[0].href).toBe('/docs/guides/install')
  })

  it('collapses redundant slashes between the root and the href', async () => {
    const manifest = await settingsToManifest(
      { meta: { name: 'Docs', root: '/docs/' }, pages: [{ title: 'X', href: '/x' }] },
      injector
    )

    expect(manifest.pages[0].href).toBe('/docs/x')
  })

  it('keeps separators in the tree but leaves them unrouted', async () => {
    const manifest = await settingsToManifest(
      {
        meta: { name: 'Docs', root: '/docs' },
        pages: [
          { title: 'Section', separator: true },
          { title: 'A', href: 'a' },
        ],
      },
      injector
    )

    expect(manifest.pages[0]).toMatchObject({ title: 'Section', separator: true })
    expect(manifest.pages[0].href).toBeUndefined()
    expect(manifest.pages[1].href).toBe('/docs/a')
  })

  it('leaves the consumer settings untouched so they stay reusable', async () => {
    const page = { title: 'Intro', href: 'intro' }
    await settingsToManifest({ meta: { name: 'Docs', root: '/docs' }, pages: [page] }, injector)

    expect(page.href).toBe('intro')
  })

  it('resolves a dynamic meta factory', async () => {
    const manifest = await settingsToManifest({ meta: () => ({ name: 'Dyn', root: '/dyn' }), pages: [] }, injector)

    expect(manifest.meta).toEqual({ name: 'Dyn', root: '/dyn' })
  })

  it('resolves dynamic pages that return a single link or an array', async () => {
    const manifest = await settingsToManifest(
      {
        meta: { name: 'Docs', root: '/docs' },
        pages: [
          () => ({ title: 'One', href: 'one' }),
          () => [
            { title: 'Two', href: 'two' },
            { title: 'Three', href: 'three' },
          ],
        ],
      },
      injector
    )

    expect(manifest.pages.map((p) => p.title)).toEqual(['One', 'Two', 'Three'])
    expect(manifest.pages[2].href).toBe('/docs/three')
  })

  it('rejects when the resolved meta is missing', async () => {
    await expect(settingsToManifest({ meta: () => undefined as never, pages: [] }, injector)).rejects.toThrow(/meta/i)
  })
})

describe('docsFromManifest / extractManifestSources', () => {
  it('wraps a url as a manifest source', () => {
    expect(docsFromManifest('assets/docs/manifest.json')).toEqual({ ngeDocManifestUrl: 'assets/docs/manifest.json' })
  })

  it('extracts manifest sources from route data, ignoring plain settings', () => {
    const data = [
      { meta: { name: 'Code', root: '/code' }, pages: [] },
      docsFromManifest('assets/a.json'),
      docsFromManifest('assets/b.json'),
    ]

    expect(extractManifestSources(data).map((s) => s.ngeDocManifestUrl)).toEqual(['assets/a.json', 'assets/b.json'])
  })

  it('finds no sources in settings-only data', () => {
    expect(extractManifestSources([{ meta: { name: 'X', root: '/x' }, pages: [] }])).toEqual([])
  })
})

describe('flattenPages', () => {
  it('lists routable links in reading order (depth-first, parents before children)', () => {
    const flat = flattenPages([
      { title: 'A', href: '/a', children: [{ title: 'A1', href: '/a/1' }] },
      { title: 'B', href: '/b' },
    ])

    expect(flat.map((l) => l.title)).toEqual(['A', 'A1', 'B'])
  })

  it('drops separators and everything under them', () => {
    const flat = flattenPages([
      { title: 'Section', separator: true, children: [{ title: 'Hidden', href: '/hidden' }] },
      { title: 'A', href: '/a' },
    ])

    expect(flat.map((l) => l.title)).toEqual(['A'])
  })
})
