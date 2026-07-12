import { NgeDocClient } from './docs-client'

const MANIFEST = {
  meta: { name: 'Docs', root: '/docs' },
  pages: [{ title: 'Intro', href: '/docs/intro', renderer: 'docs/intro.md' }],
}

const SEARCH = [
  { slug: '/docs/intro', title: 'Introduction', content: 'welcome to nge-doc, a documentation engine' },
  {
    slug: '/docs/intro#setup',
    title: 'Introduction',
    heading: 'Setup',
    content: 'run the installer to set up nge-doc',
  },
  { slug: '/docs/guides/theming', title: 'Theming', content: 'customize the palette and dark mode' },
]

/** A fetch stub mapping urls to canned bodies, recording what was requested. */
function stubFetch(bodies: Record<string, unknown>) {
  const calls: string[] = []
  const fetchFn = async (url: string) => {
    calls.push(url)
    const key = Object.keys(bodies).find((k) => url.endsWith(k))
    if (key === undefined) {
      return { ok: false, status: 404, text: async () => 'not found', json: async () => ({}) }
    }
    const body = bodies[key]
    return { ok: true, status: 200, text: async () => String(body), json: async () => body }
  }
  return { fetchFn: fetchFn as unknown as typeof fetch, calls }
}

const makeClient = (bodies: Record<string, unknown>) => {
  const { fetchFn, calls } = stubFetch(bodies)
  return { client: new NgeDocClient('https://example.com/nge/docs/nge-doc.json', fetchFn), calls }
}

describe('NgeDocClient.search', () => {
  it('ranks matches from the sibling search.json and reports title, heading and an excerpt', async () => {
    const { client } = makeClient({ 'search.json': SEARCH })

    const results = await client.search('installer')

    expect(results).toHaveLength(1)
    expect(results[0]).toMatchObject({ slug: '/docs/intro#setup', title: 'Introduction', heading: 'Setup' })
    expect(results[0].excerpt).toContain('installer')
  })

  it('returns one result per page (best section), never duplicate rows', async () => {
    const { client } = makeClient({ 'search.json': SEARCH })

    // "nge-doc" is in both the intro and the #setup chunk of the same page.
    const results = await client.search('nge-doc')

    expect(results.filter((r) => r.slug.startsWith('/docs/intro'))).toHaveLength(1)
  })

  it('caps the result count', async () => {
    const many = Array.from({ length: 30 }, (_, i) => ({ slug: `/docs/p${i}`, title: `Page ${i}`, content: 'alpha' }))
    const { client } = makeClient({ 'search.json': many })

    expect(await client.search('alpha', 5)).toHaveLength(5)
  })

  it('fetches the index once, then serves later searches from memory', async () => {
    const { client, calls } = makeClient({ 'search.json': SEARCH })

    await client.search('theming')
    await client.search('setup')

    expect(calls.filter((u) => u.endsWith('search.json'))).toHaveLength(1)
  })
})

describe('NgeDocClient.readPage', () => {
  it('resolves the raw markdown url from the manifest root, relative to the manifest', async () => {
    const { client, calls } = makeClient({ 'nge-doc.json': MANIFEST, 'docs/intro.md': '# Intro\n\nHello.' })

    const md = await client.readPage('/docs/intro#setup')

    expect(md).toBe('# Intro\n\nHello.')
    expect(calls).toContain('https://example.com/nge/docs/intro.md')
  })

  it('maps the site root href to index.md, next to the manifest', async () => {
    const { client, calls } = makeClient({ 'nge-doc.json': MANIFEST, 'docs/index.md': '# Home' })

    expect(await client.readPage('/docs')).toBe('# Home')
    expect(calls).toContain('https://example.com/nge/docs/index.md')
  })

  it('returns null for a page whose markdown is missing', async () => {
    const { client } = makeClient({ 'nge-doc.json': MANIFEST })

    expect(await client.readPage('/docs/nope')).toBeNull()
  })
})
