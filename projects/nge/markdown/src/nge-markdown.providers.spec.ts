import { Injector } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { NgeMarkdownContribution, NGE_MARKDOWN_CONTRIBUTION } from './nge-markdown-contribution'
import { NGE_MARKDOWN_COMPONENTS } from './nge-markdown-components'
import { NGE_MARKDOWN_CONFIG, NGE_MARKDOWN_THEMES } from './nge-markdown-config'
import { NGE_MARKDOWN_KATEX_OPTIONS } from './contributions/nge-markdown-katex'
import { NGE_MARKDOWN_HIGHLIGHTER_SERVICE } from './contributions/nge-markdown-highlighter'
import {
  provideNgeMarkdown,
  withAdmonitions,
  withComponents,
  withConfig,
  withEmoji,
  withHighlighter,
  withKatex,
  withThemes,
} from './nge-markdown.providers'

const contributions = () => TestBed.inject(NGE_MARKDOWN_CONTRIBUTION) as unknown as NgeMarkdownContribution[]

describe('provideNgeMarkdown', () => {
  it('registers one contribution per selected feature', () => {
    TestBed.configureTestingModule({
      providers: [provideNgeMarkdown(withKatex(), withEmoji(), withAdmonitions())],
    })

    expect(contributions()).toHaveLength(3)
  })

  it('passes feature options through their token', () => {
    const options = { baseUrl: 'https://cdn.example.com/katex' }
    TestBed.configureTestingModule({ providers: [provideNgeMarkdown(withKatex(options))] })

    expect(TestBed.inject(NGE_MARKDOWN_KATEX_OPTIONS)).toEqual(options)
  })

  it('registers the config, themes and markdown-embedded components', () => {
    const components = { 'demo-x': () => Promise.reject(new Error('unused')) }
    TestBed.configureTestingModule({
      providers: [
        provideNgeMarkdown(
          withConfig({ darkThemeClassName: 'dark' }),
          withThemes({ name: 'github', styleUrl: 'themes/github.css' }),
          withComponents(components)
        ),
      ],
    })

    expect(TestBed.inject(NGE_MARKDOWN_CONFIG).darkThemeClassName).toBe('dark')
    expect(TestBed.inject(NGE_MARKDOWN_THEMES)).toEqual([{ name: 'github', styleUrl: 'themes/github.css' }])
    expect(TestBed.inject(NGE_MARKDOWN_COMPONENTS)).toBe(components)
  })

  it('wires a colorizer service as the highlighter backend', () => {
    class FakeColorizer {}
    TestBed.configureTestingModule({ providers: [provideNgeMarkdown(withHighlighter(FakeColorizer))] })

    expect(contributions()).toHaveLength(1)
    const highlighter = TestBed.inject(NGE_MARKDOWN_HIGHLIGHTER_SERVICE)
    expect(typeof highlighter.highligtht).toBe('function')
    expect(TestBed.inject(Injector)).toBeTruthy()
  })

  it('plain highlighting needs no colorizer', () => {
    TestBed.configureTestingModule({ providers: [provideNgeMarkdown(withHighlighter())] })

    expect(contributions()).toHaveLength(1)
    expect(TestBed.inject(NGE_MARKDOWN_HIGHLIGHTER_SERVICE, null)).toBeNull()
  })
})
