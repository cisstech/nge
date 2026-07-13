import { TransferState } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { NgeDocAssets, docsAssetStateKey } from '@cisstech/nge/doc'
import { provideNgeDocSsr } from './assets'

describe('provideNgeDocSsr', () => {
  let root: string

  const setup = (roots?: string[]) => {
    TestBed.configureTestingModule({ providers: [provideNgeDocSsr(roots ? { roots } : {})] })
    return TestBed.inject(NgeDocAssets)
  }

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'nge-doc-public-'))
    mkdirSync(join(root, 'docs'), { recursive: true })
    writeFileSync(join(root, 'docs', 'intro.md'), '# Intro')
    writeFileSync(join(root, 'docs', 'nge-doc.json'), '{"meta":{"name":"Docs","root":"/docs"},"pages":[]}')
  })

  it('serves a page from the filesystem instead of http, since prerender has no server', async () => {
    const assets = setup([root])

    await expect(assets.text('docs/intro.md')).resolves.toBe('# Intro')
  })

  it('parses the manifest read from disk', async () => {
    const assets = setup([root])

    await expect(assets.json('docs/nge-doc.json')).resolves.toMatchObject({ meta: { name: 'Docs' } })
  })

  it('records what it serves in transfer state, so the hydrated page does not refetch', async () => {
    const assets = setup([root])

    await assets.text('docs/intro.md')

    expect(TestBed.inject(TransferState).get(docsAssetStateKey('docs/intro.md'), '')).toBe('# Intro')
  })

  it('tries each root in order, so the browser output can shadow the source dir', async () => {
    const other = mkdtempSync(join(tmpdir(), 'nge-doc-empty-'))
    const assets = setup([other, root])

    await expect(assets.text('docs/intro.md')).resolves.toBe('# Intro')
  })

  it('names the missing file and the searched roots when nothing matches', async () => {
    const assets = setup([root])

    await expect(assets.text('docs/nope.md')).rejects.toThrow(/docs\/nope\.md.*prerender: false/s)
  })
})
