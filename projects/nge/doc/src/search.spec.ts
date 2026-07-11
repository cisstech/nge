import { NgeDocManifest } from './manifest'
import { DefaultNgeDocSearchProvider } from './search'

const site = (pages: NgeDocManifest['pages'], name = 'Docs', root = '/docs'): NgeDocManifest => ({
  meta: { name, root },
  pages,
})

describe('DefaultNgeDocSearchProvider', () => {
  it('finds an indexed page by a case-insensitive title match', async () => {
    const provider = new DefaultNgeDocSearchProvider()
    await provider.index([site([{ title: 'Installation', href: '/docs/installation', renderer: 'x.md' }])])

    const results = await provider.search('INSTALL')

    expect(results.map((r) => r.slug)).toEqual(['/docs/installation'])
  })

  it('returns the ancestor path, site name first and the match excluded', async () => {
    const provider = new DefaultNgeDocSearchProvider()
    await provider.index([
      site([
        {
          title: 'Guides',
          href: '/docs/guides',
          children: [{ title: 'Theming', href: '/docs/guides/theming', renderer: 'x.md' }],
        },
      ]),
    ])

    const [result] = await provider.search('theming')

    expect(result).toMatchObject({ slug: '/docs/guides/theming', title: 'Theming', path: ['Docs', 'Guides'] })
  })

  it('skips group-only links (no renderer, only children)', async () => {
    const provider = new DefaultNgeDocSearchProvider()
    await provider.index([
      site([
        {
          title: 'Group',
          href: '/docs/group',
          children: [{ title: 'Child', href: '/docs/group/child', renderer: 'x.md' }],
        },
      ]),
    ])

    expect(await provider.search('group')).toEqual([])
  })

  it('skips separators', async () => {
    const provider = new DefaultNgeDocSearchProvider()
    await provider.index([site([{ title: 'Section', separator: true }])])

    expect(await provider.search('section')).toEqual([])
  })

  it('ranks earlier title matches first, then shorter titles', async () => {
    const provider = new DefaultNgeDocSearchProvider()
    await provider.index([
      site([
        { title: 'Advanced config', href: '/docs/a', renderer: 'x.md' },
        { title: 'Config', href: '/docs/b', renderer: 'x.md' },
      ]),
    ])

    const results = await provider.search('config')

    expect(results.map((r) => r.title)).toEqual(['Config', 'Advanced config'])
  })

  it('caps the results at 20', async () => {
    const provider = new DefaultNgeDocSearchProvider()
    const pages = Array.from({ length: 30 }, (_, i) => ({ title: `Page ${i}`, href: `/docs/${i}`, renderer: 'x.md' }))
    await provider.index([site(pages)])

    expect((await provider.search('page')).length).toBe(20)
  })

  it('returns nothing for a blank query', async () => {
    const provider = new DefaultNgeDocSearchProvider()
    await provider.index([site([{ title: 'X', href: '/docs/x', renderer: 'x.md' }])])

    expect(await provider.search('   ')).toEqual([])
  })

  it('searches across every registered site', async () => {
    const provider = new DefaultNgeDocSearchProvider()
    await provider.index([
      site([{ title: 'Alpha', href: '/a/alpha', renderer: 'x.md' }], 'A', '/a'),
      site([{ title: 'Alphabet', href: '/b/alphabet', renderer: 'x.md' }], 'B', '/b'),
    ])

    const results = await provider.search('alpha')

    expect(results.map((r) => r.slug).sort()).toEqual(['/a/alpha', '/b/alphabet'])
  })

  it('re-indexing replaces the previous set', async () => {
    const provider = new DefaultNgeDocSearchProvider()
    await provider.index([site([{ title: 'Old', href: '/docs/old', renderer: 'x.md' }])])
    await provider.index([site([{ title: 'New', href: '/docs/new', renderer: 'x.md' }])])

    expect(await provider.search('old')).toEqual([])
    expect((await provider.search('new')).map((r) => r.slug)).toEqual(['/docs/new'])
  })
})
