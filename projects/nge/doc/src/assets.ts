import { HttpClient } from '@angular/common/http'
import { Injectable, StateKey, TransferState, inject, makeStateKey } from '@angular/core'
import { firstValueFrom } from 'rxjs'

/** Transfer-state key of a docs asset, shared by the browser and server implementations. */
export function docsAssetStateKey(url: string): StateKey<string> {
  return makeStateKey<string>('nge-doc-asset:' + url)
}

/**
 * Reads transfer state first, so a hydrated page reuses the content embedded
 * at prerender time instead of refetching it, then falls back to HttpClient.
 * Each transferred entry is consumed on first read: later navigations back to
 * the same url fetch fresh content.
 */
@Injectable()
export class HttpNgeDocAssets {
  private readonly http = inject(HttpClient, { optional: true })
  private readonly transferState = inject(TransferState)

  async text(url: string): Promise<string> {
    const transferred = this.take(url)
    if (transferred !== null) {
      return transferred
    }
    return firstValueFrom(this.client(url).get(url, { responseType: 'text' }))
  }

  async json<T>(url: string): Promise<T> {
    const transferred = this.take(url)
    if (transferred !== null) {
      return JSON.parse(transferred) as T
    }
    return firstValueFrom(this.client(url).get<T>(url))
  }

  private take(url: string): string | null {
    const key = docsAssetStateKey(url)
    if (!this.transferState.hasKey(key)) {
      return null
    }
    const content = this.transferState.get(key, '')
    this.transferState.remove(key)
    return content
  }

  private client(url: string): HttpClient {
    if (!this.http) {
      throw new Error(`[nge-doc]: fetching '${url}' needs HttpClient. Add provideHttpClient() to your providers.`)
    }
    return this.http
  }
}

/**
 * Fetch port for the docs assets: the manifest (`nge-doc.json`) and the
 * markdown pages. The default implementation fetches over HTTP with transfer
 * state support; `provideNgeDocSsr()` (from `@cisstech/nge/doc/ssr`) replaces
 * it with a filesystem adapter, since there is no HTTP server at prerender time.
 */
@Injectable({ providedIn: 'root', useClass: HttpNgeDocAssets })
export abstract class NgeDocAssets {
  abstract text(url: string): Promise<string>
  abstract json<T>(url: string): Promise<T>
}
