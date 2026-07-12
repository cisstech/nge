import type { NgeDocManifest } from '../src/manifest'
import { buildSearchIndex } from './search'

const manifest: NgeDocManifest = {
  meta: { name: 'Docs', root: '/docs' },
  pages: [{ title: 'Intro', href: '/docs/intro', renderer: 'docs/intro.md', sourcePath: 'intro.md' }],
}

describe('buildSearchIndex', () => {
  it('creates an intro chunk plus one per heading, deep-linking via anchors', () => {
    const md = '# Intro\n\nWelcome here.\n\n## Setup steps\n\nRun install.\n\n## Usage\n\nImport it.'
    const docs = buildSearchIndex(manifest, () => md)

    // The content before the first ## is the page-level chunk (no heading, page href).
    expect(docs[0]).toMatchObject({ slug: '/docs/intro', title: 'Intro' })
    expect(docs[0].heading).toBeUndefined()
    expect(docs[0].content).toContain('Welcome here')

    // Each ##/### becomes a chunk whose slug points at the heading anchor.
    expect(docs.find((d) => d.heading === 'Setup steps')).toMatchObject({
      slug: '/docs/intro#setup-steps',
    })
    expect(docs.find((d) => d.heading === 'Setup steps')?.content).toContain('Run install')
    expect(docs.find((d) => d.heading === 'Usage')?.slug).toBe('/docs/intro#usage')
  })

  it('ignores headings inside fenced code blocks', () => {
    const md = 'Intro text\n\n```\n## not a heading\n```\n\n## Real\n\nbody'
    const docs = buildSearchIndex(manifest, () => md)

    expect(docs.map((d) => d.heading).filter(Boolean)).toEqual(['Real'])
  })
})
