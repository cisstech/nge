import { Injectable, Injector, inject } from '@angular/core'
import { Data } from '@angular/router'
import { NgeDocAssets } from './assets'
import { extractNgeDocSettings } from './nge-doc'
import { NgeDocManifest, extractManifestSources, settingsToManifest } from './manifest'

/**
 * Resolves the documentation sites declared in a route's data into manifests:
 * code-first settings are resolved in place, file-first manifests emitted by
 * the build are fetched. Everything resolves concurrently; the declaration
 * order is preserved.
 */
@Injectable()
export class NgeDocSitesLoader {
  private readonly injector = inject(Injector)
  private readonly assets = inject(NgeDocAssets)

  load(data: Data): Promise<NgeDocManifest[]> {
    return Promise.all([
      ...extractNgeDocSettings(data).map((settings) => settingsToManifest(settings, this.injector)),
      ...extractManifestSources(data).map((source) => this.assets.json<NgeDocManifest>(source.ngeDocManifestUrl)),
    ])
  }
}
