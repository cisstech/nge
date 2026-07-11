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

  it('compiles markdown authored under public/<root> into nge-doc.json, in place', () => {
    mkdirSync(join(dir, 'public', 'docs'), { recursive: true })
    writeFileSync(join(dir, 'public', 'docs', 'index.md'), '---\ntitle: Home\n---\n# Home')
    writeFileSync(join(dir, 'public', 'docs', 'guide.md'), '# Guide')

    const result = runDocsBuild({ publicDir: join(dir, 'public'), root: '/docs', name: 'Docs' })

    expect(result).toEqual({ success: true, pages: 2 })
    const manifest = JSON.parse(readFileSync(join(dir, 'public', 'docs', 'nge-doc.json'), 'utf8'))
    expect(manifest.pages.map((p: { title: string }) => p.title)).toEqual(['Home', 'Guide'])
    // The renderer points at the served source; the builder copies no markdown.
    expect(manifest.pages[1].renderer).toBe('docs/guide.md')
    expect(existsSync(join(dir, 'public', 'docs', 'guide.md'))).toBe(true)
  })

  it('reports a failure instead of throwing when the docs folder is missing', () => {
    const result = runDocsBuild({ publicDir: join(dir, 'missing'), root: '/x', name: 'X' })

    expect(result.success).toBe(false)
    expect(result.error).toBeTruthy()
  })
})
