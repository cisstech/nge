// The @angular/ssr FESM does not load under jest's CJS transform (its beasties
// dependency breaks class interop); only the two enums matter here, and the
// demo build type-checks the real API.
jest.mock('@angular/ssr', () => ({
  RenderMode: { Server: 0, Client: 1, Prerender: 2 },
  PrerenderFallback: { Server: 0, Client: 1, None: 2 },
}))

import { RenderMode } from '@angular/ssr'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { NgeDocManifest } from '@cisstech/nge/doc'
import { ngeDocPrerenderRoutes } from './prerender'

/** Writes a manifest to a temp file and returns its path. */
function manifestFile(manifest: NgeDocManifest): string {
  const path = join(mkdtempSync(join(tmpdir(), 'nge-doc-ssr-')), 'nge-doc.json')
  writeFileSync(path, JSON.stringify(manifest))
  return path
}

const docsManifest: NgeDocManifest = {
  meta: { name: 'Docs', root: '/docs' },
  pages: [
    { title: 'Intro', href: '/docs/intro', renderer: 'docs/intro.md' },
    {
      title: 'Guides',
      href: '/docs/guides',
      children: [{ title: 'Theming', href: '/docs/guides/theming', renderer: 'docs/guides/theming.md' }],
    },
    { title: 'Playground', href: '/docs/playground', renderer: 'docs/playground.md', prerender: false },
    { title: 'Section', separator: true },
    { title: 'GitHub', href: 'https://github.com/x' },
  ],
}

describe('ngeDocPrerenderRoutes', () => {
  it('prerenders every content page of a site, under its root, with a client fallback', async () => {
    const [route] = ngeDocPrerenderRoutes(manifestFile(docsManifest))

    expect(route.path).toBe('docs/**')
    expect(route.renderMode).toBe(RenderMode.Prerender)

    const params = await (route as { getPrerenderParams?: () => Promise<Record<string, string>[]> })
      .getPrerenderParams!()
    expect(params).toEqual([{ '**': 'intro' }, { '**': 'guides/theming' }])
  })

  it('skips client-only pages (prerender: false); the fallback renders them in the browser', async () => {
    const [route] = ngeDocPrerenderRoutes(manifestFile(docsManifest))

    const params = await (route as { getPrerenderParams?: () => Promise<Record<string, string>[]> })
      .getPrerenderParams!()
    expect(params).not.toContainEqual({ '**': 'playground' })
  })

  it('returns one route per manifest, so an app can host several docs sites', () => {
    const guideManifest: NgeDocManifest = {
      meta: { name: 'Guide', root: '/guide' },
      pages: [{ title: 'Start', href: '/guide/start', renderer: 'guide/start.md' }],
    }

    const routes = ngeDocPrerenderRoutes(manifestFile(docsManifest), manifestFile(guideManifest))

    expect(routes.map((route) => route.path)).toEqual(['docs/**', 'guide/**'])
  })
})
