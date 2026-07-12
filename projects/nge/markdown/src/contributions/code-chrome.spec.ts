import { applyCodeChrome } from './code-chrome'

function block(text: string): { host: HTMLElement; pre: HTMLElement; code: HTMLElement } {
  const host = document.createElement('div')
  const pre = document.createElement('pre')
  const code = document.createElement('code')
  code.textContent = text
  pre.appendChild(code)
  host.appendChild(pre)
  document.body.appendChild(host)
  return { host, pre, code }
}

describe('applyCodeChrome', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    document.getElementById('nge-markdown-code-chrome')?.remove()
  })

  it('wraps the block with a toolbar holding the label and the actions', () => {
    const { host, pre } = block('const x = 1')

    applyCodeChrome(document, { pre, code: 'const x = 1', filename: 'demo.ts', language: 'typescript' })

    const wrapper = host.querySelector('.nge-code-block')
    expect(wrapper?.contains(pre)).toBe(true)
    expect(wrapper?.querySelector('.nge-code-toolbar-label')?.textContent).toBe('demo.ts')
    const actions = wrapper?.querySelectorAll('.nge-code-action')
    expect(actions).toHaveLength(2)
    expect(document.getElementById('nge-markdown-code-chrome')).toBeTruthy()
  })

  it('labels with the language when there is no filename', () => {
    const { host, pre } = block('x')

    applyCodeChrome(document, { pre, code: 'x', language: 'python' })

    expect(host.querySelector('.nge-code-toolbar-label')?.textContent).toBe('python')
  })

  it('does not stack chrome on an already wrapped block', () => {
    const { host, pre } = block('x')

    applyCodeChrome(document, { pre, code: 'x' })
    applyCodeChrome(document, { pre, code: 'x' })

    expect(host.querySelectorAll('.nge-code-toolbar')).toHaveLength(1)
  })

  it('copies the raw code captured before colorizing', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })
    const { host, pre } = block('mutated by the highlighter')

    applyCodeChrome(document, { pre, code: 'raw code', filename: 'a.ts' })
    ;(host.querySelector('.nge-code-action[title*="Copy"]') as HTMLElement).click()
    await Promise.resolve()

    expect(writeText).toHaveBeenCalledWith('raw code')
  })
})
