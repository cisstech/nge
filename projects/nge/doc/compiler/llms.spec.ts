import type { NgeDocManifest } from '../src/manifest'
import { buildLlms, buildLlmsFull } from './llms'

const manifest: NgeDocManifest = {
  meta: { name: 'Docs', root: '/guide' },
  pages: [
    {
      title: 'Intro',
      href: '/guide',
      renderer: 'guide.md',
      description: 'Start here',
      sourcePath: 'index.md',
    },
    {
      title: 'Group',
      href: '/guide/group',
      children: [
        {
          title: 'Child',
          href: '/guide/group/child',
          renderer: 'guide/group/child.md',
          sourcePath: 'group/child.md',
        },
      ],
    },
    { title: 'External', href: 'https://x.dev' },
  ],
}

describe('buildLlms', () => {
  it('lists content pages as absolute links with descriptions, excluding non-pages', () => {
    const txt = buildLlms(manifest, 'https://example.com/nge')

    expect(txt).toContain('# Docs')
    expect(txt).toContain('- [Intro](https://example.com/nge/guide): Start here')
    expect(txt).toContain('- [Child](https://example.com/nge/guide/group/child)')
    expect(txt).not.toContain('External')
  })
})

describe('buildLlmsFull', () => {
  it('inlines each page body under its title and source url, separated by a rule', () => {
    const bodies: Record<string, string> = { 'index.md': '# Intro\nhello', 'group/child.md': '# Child\nworld' }
    const txt = buildLlmsFull(manifest, 'https://example.com/nge', (sourcePath) => bodies[sourcePath])

    expect(txt).toContain('Source: https://example.com/nge/guide')
    expect(txt).toContain('hello')
    expect(txt).toContain('world')
    expect(txt).toContain('\n---\n')
  })
})
