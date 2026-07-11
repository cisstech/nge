import { compileDocs } from './compile'
import { DocFs } from './fs'

/** In-memory {@link DocFs} from a flat `path -> content` map. */
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
    readFile: (path) => {
      const value = byPath.get(norm(path))
      if (value === undefined) {
        throw new Error(`ENOENT: ${path}`)
      }
      return value
    },
    exists: (path) => byPath.has(norm(path)) || dirs.has(norm(path)),
  }
}

const meta = { name: 'Docs', root: '/docs' }
const compile = (files: Record<string, string>) =>
  compileDocs({ dir: 'docs', meta, assetsBase: 'assets/docs', fs: memFs(files) })

describe('compileDocs', () => {
  it('creates one page per markdown file, alphabetical by default', () => {
    const manifest = compile({ 'docs/beta.md': '# B', 'docs/alpha.md': '# A' })

    expect(manifest.pages.map((p) => p.title)).toEqual(['Alpha', 'Beta'])
    expect(manifest.pages.map((p) => p.href)).toEqual(['/docs/alpha', '/docs/beta'])
    expect(manifest.pages[0].renderer).toBe('assets/docs/alpha.md')
  })

  it('humanizes filenames into titles', () => {
    const manifest = compile({ 'docs/getting-started.md': '# x' })

    expect(manifest.pages[0].title).toBe('Getting started')
  })

  it('reads title, description and order from frontmatter', () => {
    const manifest = compile({
      'docs/a.md': '---\ntitle: Getting started\norder: 1\ndescription: Start here\n---\n# A',
      'docs/b.md': '---\ntitle: Zzz\norder: 0\n---\n# B',
    })

    expect(manifest.pages.map((p) => p.title)).toEqual(['Zzz', 'Getting started'])
    expect(manifest.pages.find((p) => p.title === 'Getting started')?.description).toBe('Start here')
  })

  it('lets _meta.json order and labels win over frontmatter and filename', () => {
    const manifest = compile({
      'docs/_meta.json': JSON.stringify({ intro: { title: 'Introduction' }, setup: {} }),
      'docs/setup.md': '# S',
      'docs/intro.md': '---\ntitle: Frontmatter title\n---\n# I',
    })

    expect(manifest.pages.map((p) => p.title)).toEqual(['Introduction', 'Setup'])
  })

  it('nests a folder as a page with children', () => {
    const manifest = compile({ 'docs/guides/theming.md': '# T', 'docs/guides/install.md': '# I' })

    const guides = manifest.pages.find((p) => p.title === 'Guides')
    expect(guides?.href).toBe('/docs/guides')
    expect(guides?.renderer).toBeUndefined()
    expect(guides?.children?.map((c) => c.title)).toEqual(['Install', 'Theming'])
  })

  it("uses a folder's index.md as the folder page content", () => {
    const manifest = compile({
      'docs/guides/index.md': '---\ntitle: Guides\n---\n# G',
      'docs/guides/theming.md': '# T',
    })

    const guides = manifest.pages.find((p) => p.title === 'Guides')
    expect(guides?.renderer).toBe('assets/docs/guides/index.md')
    expect(guides?.children?.map((c) => c.title)).toEqual(['Theming'])
  })

  it('puts a root index.md at the site root as the first page', () => {
    const manifest = compile({ 'docs/index.md': '---\ntitle: Home\n---\n# H', 'docs/guide.md': '# G' })

    expect(manifest.pages[0]).toMatchObject({ title: 'Home', href: '/docs', renderer: 'assets/docs/index.md' })
  })

  it('excludes _meta hidden entries and draft pages', () => {
    const manifest = compile({
      'docs/_meta.json': JSON.stringify({ visible: {}, secret: { display: 'hidden' } }),
      'docs/visible.md': '# V',
      'docs/secret.md': '# S',
      'docs/wip.md': '---\ndraft: true\n---\n# W',
    })

    expect(manifest.pages.map((p) => p.title)).toEqual(['Visible'])
  })

  it('includes external links declared in _meta.json', () => {
    const manifest = compile({
      'docs/_meta.json': JSON.stringify({ intro: {}, github: { title: 'GitHub', href: 'https://github.com/x' } }),
      'docs/intro.md': '# I',
    })

    const github = manifest.pages.find((p) => p.title === 'GitHub')
    expect(github?.href).toBe('https://github.com/x')
    expect(github?.renderer).toBeUndefined()
  })

  it('carries the site meta through to the manifest', () => {
    const manifest = compile({ 'docs/a.md': '# A' })

    expect(manifest.meta).toEqual({ name: 'Docs', root: '/docs' })
  })
})
