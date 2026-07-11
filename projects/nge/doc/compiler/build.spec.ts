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
  it('writes manifest.json to the output folder', () => {
    const { writer, written } = memWriter()
    const fs = memFs({ 'docs/index.md': '---\ntitle: Home\n---\n# Home', 'docs/guide.md': '# Guide' })

    const manifest = buildDocs({ dir: 'docs', meta, outDir: 'out', assetsBase: 'assets/docs', fs, writer })

    expect(written['out/manifest.json']).toBeDefined()
    expect(JSON.parse(written['out/manifest.json'])).toEqual(manifest)
    expect(manifest.pages.map((p) => p.title)).toEqual(['Home', 'Guide'])
  })

  it('copies every markdown file, preserving the folder structure', () => {
    const { writer, written } = memWriter()
    const fs = memFs({
      'docs/index.md': '# Home',
      'docs/guides/theming.md': '# Theming',
      'docs/_meta.json': '{}',
    })

    buildDocs({ dir: 'docs', meta, outDir: 'out', fs, writer })

    expect(written['out/index.md']).toBe('# Home')
    expect(written['out/guides/theming.md']).toBe('# Theming')
    // Only markdown is copied; _meta.json stays a build-time input.
    expect(written['out/_meta.json']).toBeUndefined()
  })
})
