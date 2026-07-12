// Shiki is ESM-only and cannot load under jest's CJS transform; the service
// only needs its codeToHtml contract.
const codeToHtml = jest.fn()
jest.mock('shiki', () => ({ codeToHtml }), { virtual: true })

import { Injector } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { NGE_MARKDOWN_CONFIG } from '../nge-markdown-config'
import { shikiHighlighterService } from './nge-markdown-shiki'

const SHIKI_OUTPUT =
  '<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8">' +
  '<code>' +
  '<span class="line"><span style="--shiki-light:#d73a49">const</span></span>\n' +
  '<span class="line"><span style="--shiki-light:#24292e">let</span></span>\n' +
  '<span class="line"><span style="--shiki-light:#24292e">var</span></span>' +
  '</code></pre>'

function codeBlock(text: string): { pre: HTMLElement; code: HTMLElement } {
  const pre = document.createElement('pre')
  const code = document.createElement('code')
  code.textContent = text
  pre.appendChild(code)
  document.body.appendChild(pre)
  return { pre, code }
}

describe('shikiHighlighterService', () => {
  beforeEach(() => {
    codeToHtml.mockReset().mockResolvedValue(SHIKI_OUTPUT)
    document.getElementById('nge-markdown-shiki')?.remove()
    TestBed.configureTestingModule({})
  })

  const injector = () => TestBed.inject(Injector)

  it('declares itself server-capable, so prerendered pages ship highlighted code', () => {
    expect(shikiHighlighterService().ssr).toBe(true)
  })

  it('grafts the highlighted output onto the existing block, with both palettes', async () => {
    const { pre, code } = codeBlock('const x = 1')
    const service = shikiHighlighterService()

    await service.highligtht!(injector(), { element: code, language: 'typescript' })

    expect(codeToHtml).toHaveBeenCalledWith('const x = 1', {
      lang: 'typescript',
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    })
    expect(pre.className).toContain('shiki')
    expect(pre.getAttribute('style')).toContain('--shiki-dark')
    expect(code.innerHTML).toContain('--shiki-light:#d73a49')
  })

  it('injects the scheme-switching style once, keyed on the configured dark class', async () => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      providers: [{ provide: NGE_MARKDOWN_CONFIG, useValue: { darkThemeClassName: 'nge-doc-dark' } }],
    })
    const service = shikiHighlighterService()

    await service.highligtht!(injector(), { element: codeBlock('a').code, language: 'ts' })
    await service.highligtht!(injector(), { element: codeBlock('b').code, language: 'ts' })

    const styles = document.querySelectorAll('#nge-markdown-shiki')
    expect(styles).toHaveLength(1)
    expect(styles[0].textContent).toContain('.nge-doc-dark .shiki')
  })

  it('leaves the block as plain text when the language is unknown', async () => {
    codeToHtml.mockRejectedValue(new Error('unknown language'))
    const { pre, code } = codeBlock('plain content')

    await shikiHighlighterService().highligtht!(injector(), { element: code, language: 'nope' })

    expect(code.textContent).toBe('plain content')
    expect(pre.className).not.toContain('shiki')
  })

  it('highlights the lines listed in `highlights`, monaco syntax included', async () => {
    const { code } = codeBlock('a\nb\nc')

    await shikiHighlighterService().highligtht!(injector(), { element: code, language: 'ts', highlights: '1-2' })

    const lines = Array.from(code.querySelectorAll('.line'))
    expect(lines.map((l) => l.className.includes('nge-highlighted'))).toEqual([true, true, false])
  })

  it('numbers lines from a start line, reserving the gutter on every line', async () => {
    const { pre, code } = codeBlock('a\nb\nc')

    await shikiHighlighterService().highligtht!(injector(), { element: code, language: 'ts', lines: '2' })

    expect(pre.className).toContain('nge-numbered')
    const lines = Array.from(code.querySelectorAll('.line'))
    expect(lines.map((l) => l.getAttribute('data-line'))).toEqual([null, '2', '3'])
  })

  it('numbers only the lines of an explicit list', async () => {
    const { code } = codeBlock('a\nb\nc')

    await shikiHighlighterService().highligtht!(injector(), { element: code, language: 'ts', lines: '1 3' })

    const lines = Array.from(code.querySelectorAll('.line'))
    expect(lines.map((l) => l.getAttribute('data-line'))).toEqual(['1', null, '3'])
  })

  it('honors custom themes', async () => {
    const service = shikiHighlighterService({ themes: { light: 'vitesse-light', dark: 'vitesse-dark' } })

    await service.highligtht!(injector(), { element: codeBlock('x').code, language: 'ts' })

    expect(codeToHtml).toHaveBeenCalledWith(
      'x',
      expect.objectContaining({ themes: { light: 'vitesse-light', dark: 'vitesse-dark' } })
    )
  })
})
