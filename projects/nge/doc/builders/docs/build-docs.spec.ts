import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { runDocsBuild } from './build-docs'

describe('runDocsBuild', () => {
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'nge-doc-'))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('builds a docs folder into a manifest and copied markdown', () => {
    mkdirSync(join(dir, 'docs'))
    writeFileSync(join(dir, 'docs', 'index.md'), '---\ntitle: Home\n---\n# Home')
    writeFileSync(join(dir, 'docs', 'guide.md'), '# Guide')
    const out = join(dir, 'out')

    const result = runDocsBuild({
      docsDir: join(dir, 'docs'),
      outputPath: out,
      name: 'Docs',
      root: '/docs',
      assetsBase: 'assets/docs',
    })

    expect(result).toEqual({ success: true, pages: 2 })
    const manifest = JSON.parse(readFileSync(join(out, 'manifest.json'), 'utf8'))
    expect(manifest.pages.map((p: { title: string }) => p.title)).toEqual(['Home', 'Guide'])
    expect(existsSync(join(out, 'guide.md'))).toBe(true)
  })

  it('reports a failure instead of throwing when the docs folder is missing', () => {
    const result = runDocsBuild({ docsDir: join(dir, 'missing'), outputPath: join(dir, 'out'), name: 'X', root: '/x' })

    expect(result.success).toBe(false)
    expect(result.error).toBeTruthy()
  })
})
