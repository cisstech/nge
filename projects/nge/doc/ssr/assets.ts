import {
  EnvironmentProviders,
  Injectable,
  InjectionToken,
  TransferState,
  inject,
  makeEnvironmentProviders,
} from '@angular/core'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { NgeDocAssets, docsAssetStateKey } from '@cisstech/nge/doc'

export interface NgeDocSsrOptions {
  /**
   * Directories searched, in order, for the docs assets, relative to the
   * working directory of the build. Default: `['public']`, the assets folder
   * of a standard Angular workspace; a monorepo passes its own
   * (`['projects/demo/public']`).
   */
  roots?: string[]
}

const NGE_DOC_SSR_OPTIONS = new InjectionToken<NgeDocSsrOptions>('NGE_DOC_SSR_OPTIONS')

/**
 * Serves the docs assets from the filesystem: prerendering runs without an
 * HTTP server, so the relative urls the runtime fetches would never resolve.
 * Everything served is also recorded in transfer state, letting the hydrated
 * page reuse the embedded content instead of refetching it.
 */
@Injectable()
export class FsNgeDocAssets implements NgeDocAssets {
  private readonly transferState = inject(TransferState)
  private readonly roots = inject(NGE_DOC_SSR_OPTIONS).roots ?? ['public']

  async text(url: string): Promise<string> {
    const rel = url.replace(/^\/+/, '')
    const path = this.roots.map((root) => join(root, rel)).find((candidate) => existsSync(candidate))
    if (!path) {
      throw new Error(
        `[nge-doc]: '${url}' was not found under ${this.roots.join(', ')} while rendering on the server. ` +
          'Serve it from your public directory (or pass its directory to provideNgeDocSsr({ roots })); ' +
          'if the page only works in the browser, mark it `prerender: false` in its frontmatter.'
      )
    }
    const content = readFileSync(path, 'utf8')
    this.transferState.set(docsAssetStateKey(url), content)
    return content
  }

  async json<T>(url: string): Promise<T> {
    return JSON.parse(await this.text(url)) as T
  }
}

/**
 * Server-side docs providers: add to the providers of `app.config.server.ts`.
 * Replaces the HTTP assets fetcher with the filesystem adapter.
 */
export function provideNgeDocSsr(options: NgeDocSsrOptions = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: NGE_DOC_SSR_OPTIONS, useValue: options },
    { provide: NgeDocAssets, useClass: FsNgeDocAssets },
  ])
}
