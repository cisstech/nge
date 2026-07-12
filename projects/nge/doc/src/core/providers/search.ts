import { NGE_DOC_SEARCH_INDEX_URL, NGE_DOC_SEARCH_PROVIDER, PrebuiltNgeDocSearchProvider } from '../search'
import { NgeDocFeature } from './provide'

/**
 * Search a build-time index emitted by the `@cisstech/nge:docs` builder instead
 * of the default in-memory title index. `url` points at the generated
 * `search.json` (e.g. `docs/search.json`); it loads on the first search.
 */
export function withSearchIndex(url: string): NgeDocFeature {
  return {
    providers: [
      { provide: NGE_DOC_SEARCH_INDEX_URL, useValue: url },
      { provide: NGE_DOC_SEARCH_PROVIDER, useClass: PrebuiltNgeDocSearchProvider },
    ],
  }
}
