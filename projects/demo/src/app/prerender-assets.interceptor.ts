import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable, TransferState, inject } from '@angular/core'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { Observable, of } from 'rxjs'
import { assetResponse, docsAssetStateKey, isDocsAsset } from './docs-transfer-cache.interceptor'

/**
 * Serves the docs manifest and markdown from the filesystem during prerendering,
 * and records each in transfer state. There is no HTTP server at build time, so
 * these relative requests would otherwise never resolve; reading from disk lets
 * pages render fully, and the transferred content lets the browser skip the
 * request after hydration.
 */
@Injectable()
export class PrerenderAssetsInterceptor implements HttpInterceptor {
  private readonly transferState = inject(TransferState)
  // Candidate roots (public dir), relative to the build working directory (the workspace root).
  private readonly roots = ['dist/demo/browser', 'projects/demo/public']

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (isDocsAsset(req)) {
      const path = this.roots.map((root) => join(root, req.url)).find((candidate) => existsSync(candidate))
      if (path) {
        const content = readFileSync(path, 'utf8')
        this.transferState.set(docsAssetStateKey(req.url), content)
        return of(assetResponse(req.url, content))
      }
    }
    return next.handle(req)
  }
}
