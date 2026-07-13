import { DATA_STACKBLITZ, NgeMarkdownCodeActionContext } from './nge-markdown-highlighter'
import { buildStackblitzProject, stackblitzCodeActionProvider } from './nge-markdown-stackblitz'

describe('buildStackblitzProject', () => {
  const base = {
    file: 'src/main.ts',
    files: { 'package.json': '{"name":"example"}', 'index.html': '<app-root></app-root>' },
    dependencies: { '@cisstech/nge': 'latest' },
    title: 'nge example',
  }

  it('injects the snippet at the configured file, alongside the scaffold', () => {
    const { project } = buildStackblitzProject('const x = 1', base)

    expect(project.files['src/main.ts']).toBe('const x = 1')
    expect(project.files['package.json']).toBe('{"name":"example"}')
    expect(project.title).toBe('nge example')
    expect(project.dependencies).toEqual({ '@cisstech/nge': 'latest' })
  })

  it('defaults the template to node and opens the snippet file', () => {
    const { project, openFile } = buildStackblitzProject('code', { file: 'src/main.ts' })

    expect(project.template).toBe('node')
    expect(openFile).toBe('src/main.ts')
  })

  it('honors an explicit template and openFile', () => {
    const { project, openFile } = buildStackblitzProject('code', {
      file: 'index.ts',
      template: 'typescript',
      openFile: 'index.html',
    })

    expect(project.template).toBe('typescript')
    expect(openFile).toBe('index.html')
  })
})

describe('stackblitzCodeActionProvider', () => {
  const provider = stackblitzCodeActionProvider({ file: 'src/main.ts' })
  const context = (stackblitz: string | null): NgeMarkdownCodeActionContext => ({
    pre: { getAttribute: (name: string) => (name === DATA_STACKBLITZ ? stackblitz : null) } as unknown as HTMLElement,
    code: 'const x = 1',
    language: 'ts',
  })

  it('adds the action to blocks flagged with the stackblitz fence keyword', () => {
    const action = provider(context('true'))

    expect(action?.title).toBe('Open in StackBlitz')
    expect(typeof action?.run).toBe('function')
  })

  it('skips blocks without the flag', () => {
    expect(provider(context(null))).toBeNull()
  })
})
