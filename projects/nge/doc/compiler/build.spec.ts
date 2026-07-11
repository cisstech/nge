import { buildDocs, DocFsWriter } from './build'
import { DocFs } from './fs'

function memFs(files: Record<string, string>): DocFs {
  const norm = (p: string) => p.replace(/\/+/g, '/').replace(/(^\/)|(\/$)/g, '')
  const byPath = new Map<string, string>()
  const dirs = new Set<string>()
  for (const [path, content] of Object.entries(files)) {
    const key = norm(path)
    byPath.set(key, content)
    const parts = key.split('/')
    for (let i = 1; i < parts.length; i++) {
      dirs.add(parts.slice(0, i).join('/'))
    }
  }
  return {
    readdir(dir) {
      const prefix = norm(dir) ? `${norm(dir)}/` : ''
      const names = new Set<string>()
      for (const key of byPath.keys()) {
        if (key.startsWith(prefix) && key.length > prefix.length) {
          names.add(key.slice(prefix.length).split('/')[0])
        }
      }
      return [...names]
    },
    isDirectory: (path) => dirs.has(norm(path)),
    readFile: (path) => byPath.get(norm(path)) ?? '',
    exists: (path) => byPath.has(norm(path)) || dirs.has(norm(path)),
  }
}

function memWriter(): { writer: DocFsWriter; written: Record<string, string> } {
  const written: Record<string, string> = {}
  return { writer: { writeFile: (path, content) => (written[path] = content) }, written }
}

const meta = { name: 'Docs', root: '/docs' }

describe('buildDocs', () => {
  it('writes nge-doc.json next to the sources, and copies no markdown (served in place)', () => {
    const { writer, written } = memWriter()
    const fs = memFs({ 'docs/index.md': '---\ntitle: Home\n---\n# Home', 'docs/guide.md': '# Guide' })

    const manifest = buildDocs({ dir: 'docs', meta, outDir: 'out', fs, writer })

    expect(written['docs/nge-doc.json']).toBeDefined()
    expect(JSON.parse(written['docs/nge-doc.json'])).toEqual(manifest)
    expect(manifest.pages.map((p) => p.title)).toEqual(['Home', 'Guide'])
    // Sources are served in place; the builder never copies markdown.
    expect(Object.keys(written).filter((path) => path.endsWith('.md'))).toEqual([])
  })

  it('emits the AI/SEO files only when a siteUrl is given, and honors the opt-out flags', () => {
    const files = { 'docs/index.md': '# Home', 'docs/guide.md': '# Guide' }

    const withoutUrl = memWriter()
    buildDocs({ dir: 'docs', meta, outDir: 'out', fs: memFs(files), writer: withoutUrl.writer })
    expect(withoutUrl.written['out/sitemap.xml']).toBeUndefined()
    expect(withoutUrl.written['out/llms.txt']).toBeUndefined()

    const withUrl = memWriter()
    buildDocs({
      dir: 'docs',
      meta,
      outDir: 'out',
      siteUrl: 'https://example.com',
      fs: memFs(files),
      writer: withUrl.writer,
    })
    expect(withUrl.written['out/sitemap.xml']).toContain('<loc>https://example.com/docs/guide</loc>')
    expect(withUrl.written['out/robots.txt']).toContain('Sitemap: https://example.com/sitemap.xml')
    expect(withUrl.written['out/llms.txt']).toContain('# Docs')

    const optedOut = memWriter()
    buildDocs({
      dir: 'docs',
      meta,
      outDir: 'out',
      siteUrl: 'https://example.com',
      robots: false,
      llms: false,
      fs: memFs(files),
      writer: optedOut.writer,
    })
    expect(optedOut.written['out/sitemap.xml']).toBeDefined()
    expect(optedOut.written['out/robots.txt']).toBeUndefined()
    expect(optedOut.written['out/llms.txt']).toBeUndefined()
  })
})
