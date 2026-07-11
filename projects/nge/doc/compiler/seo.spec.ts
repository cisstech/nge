import type { NgeDocManifest } from '../src/manifest'
import { buildRobots, buildSitemap } from './seo'

const manifest: NgeDocManifest = {
  meta: { name: 'Docs', root: '/guide' },
  pages: [
    { title: 'Intro', href: '/guide', renderer: 'guide.md' },
    {
      title: 'Group',
      href: '/guide/group',
      children: [{ title: 'Child', href: '/guide/group/child', renderer: 'guide/group/child.md' }],
    },
    { title: 'External', href: 'https://x.dev' },
  ],
}

describe('buildSitemap', () => {
  it('lists every content page as an absolute url, trimming a trailing slash on the base', () => {
    const xml = buildSitemap(manifest, 'https://example.com/nge/')
    expect(xml).toContain('<loc>https://example.com/nge/guide</loc>')
    expect(xml).toContain('<loc>https://example.com/nge/guide/group/child</loc>')
  })

  it('excludes links without a renderer (groups and external links)', () => {
    const xml = buildSitemap(manifest, 'https://example.com')
    expect(xml).not.toContain('<loc>https://example.com/guide/group</loc>')
    expect(xml).not.toContain('x.dev')
  })
})

describe('buildRobots', () => {
  it('allows crawling and points at the sitemap at the site root', () => {
    const robots = buildRobots('https://example.com/nge/')
    expect(robots).toContain('Allow: /')
    expect(robots).toContain('Sitemap: https://example.com/nge/sitemap.xml')
  })
})
