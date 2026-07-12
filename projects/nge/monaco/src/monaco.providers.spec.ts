import { TestBed } from '@angular/core/testing'
import { NGE_MONACO_CONTRIBUTION, NgeMonacoContribution } from './contributions/monaco-contribution'
import { NGE_MONACO_CONFIG } from './monaco-config'
import { provideNgeMonaco } from './monaco.providers'

const contributions = () => TestBed.inject(NGE_MONACO_CONTRIBUTION) as unknown as NgeMonacoContribution[]

describe('provideNgeMonaco', () => {
  it('provides the config and the built-in contributions (theming, symbol dedup)', () => {
    TestBed.configureTestingModule({ providers: [provideNgeMonaco({ locale: 'fr' })] })

    expect(TestBed.inject(NGE_MONACO_CONFIG).locale).toBe('fr')
    expect(contributions()).toHaveLength(2)
  })

  it('accepts a config factory, resolved in the injection context', () => {
    TestBed.configureTestingModule({ providers: [provideNgeMonaco(() => ({ locale: 'en' }))] })

    expect(TestBed.inject(NGE_MONACO_CONFIG).locale).toBe('en')
  })

  it('works without arguments', () => {
    TestBed.configureTestingModule({ providers: [provideNgeMonaco()] })

    expect(TestBed.inject(NGE_MONACO_CONFIG)).toEqual({})
    expect(contributions()).toHaveLength(2)
  })
})
