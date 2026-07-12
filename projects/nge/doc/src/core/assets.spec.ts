import { HttpClient } from '@angular/common/http'
import { TransferState } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { NgeDocAssets, docsAssetStateKey } from './assets'

describe('NgeDocAssets (default)', () => {
  let get: jest.Mock

  const setup = (providers: unknown[] = []) => {
    get = jest.fn()
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: { get } }, ...providers],
    })
    return TestBed.inject(NgeDocAssets)
  }

  it('fetches text over http', async () => {
    const assets = setup()
    get.mockReturnValue(of('# Hello'))

    await expect(assets.text('docs/intro.md')).resolves.toBe('# Hello')
    expect(get).toHaveBeenCalledWith('docs/intro.md', { responseType: 'text' })
  })

  it('fetches and parses json over http', async () => {
    const assets = setup()
    get.mockReturnValue(of({ meta: { name: 'Docs' } }))

    await expect(assets.json('docs/nge-doc.json')).resolves.toEqual({ meta: { name: 'Docs' } })
  })

  it('serves a prerendered asset from transfer state, once, without touching http', async () => {
    const assets = setup()
    get.mockReturnValue(of('fresh'))
    TestBed.inject(TransferState).set(docsAssetStateKey('docs/intro.md'), '# Prerendered')

    await expect(assets.text('docs/intro.md')).resolves.toBe('# Prerendered')
    expect(get).not.toHaveBeenCalled()

    // The key is consumed: a later navigation back to the page refetches.
    await expect(assets.text('docs/intro.md')).resolves.toBe('fresh')
  })

  it('parses a transferred json asset', async () => {
    const assets = setup()
    TestBed.inject(TransferState).set(docsAssetStateKey('docs/nge-doc.json'), '{"meta":{"name":"Docs"}}')

    await expect(assets.json('docs/nge-doc.json')).resolves.toEqual({ meta: { name: 'Docs' } })
    expect(get).not.toHaveBeenCalled()
  })

  it('explains what to do when HttpClient is missing', async () => {
    TestBed.configureTestingModule({ providers: [{ provide: HttpClient, useValue: null }] })
    const assets = TestBed.inject(NgeDocAssets)

    await expect(assets.text('docs/intro.md')).rejects.toThrow(/provideHttpClient/)
  })
})
