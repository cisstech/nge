import { buildStackblitzProject } from './nge-markdown-stackblitz'

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
