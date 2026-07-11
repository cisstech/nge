import { isPlatformBrowser } from '@angular/common'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { Injectable, PLATFORM_ID, TransferState, inject, makeStateKey } from '@angular/core'
import { Observable, of } from 'rxjs'

/** Transfer-state key for a docs asset, shared by the server and client interceptors. */
export function docsAssetStateKey(url: string) {
  return makeStateKey<string>('docs-asset:' + url)
}

/** A GET for a docs asset (the manifest or a markdown page). */
export function isDocsAsset(req: HttpRequest<unknown>): boolean {
  return req.method === 'GET' && req.url.startsWith('assets/')
}

/** Builds the response from raw file content, parsing JSON assets. */
export function assetResponse(url: string, content: string): HttpResponse<unknown> {
  return new HttpResponse({ status: 200, url, body: url.endsWith('.json') ? JSON.parse(content) : content })
}

/**
 * On the client, serves docs assets from transfer state so a prerendered page
 * reuses the markdown embedded at build time instead of fetching it again.
 */
@Injectable()
export class DocsTransferCacheInterceptor implements HttpInterceptor {
  private readonly transferState = inject(TransferState)
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID))

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.isBrowser && isDocsAsset(req)) {
      const key = docsAssetStateKey(req.url)
      if (this.transferState.hasKey(key)) {
        const content = this.transferState.get(key, '')
        this.transferState.remove(key)
        return of(assetResponse(req.url, content))
      }
    }
    return next.handle(req)
  }
}
