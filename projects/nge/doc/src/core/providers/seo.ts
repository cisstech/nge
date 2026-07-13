import { InjectionToken } from '@angular/core'
import { NgeDocFeature } from './provide'

/** Site-wide SEO settings used to build canonical, Open Graph and Twitter tags. */
export interface NgeDocSeoConfig {
  /** Absolute site url (no trailing slash), e.g. `https://example.com/docs`. Enables canonical and `og:url`. */
  url?: string
  /** Default social image; relative paths resolve against `url`. Overridable per page via frontmatter `image`. */
  image?: string
}

/** Site-wide SEO settings. */
export const NGE_DOC_SEO = new InjectionToken<NgeDocSeoConfig>('NGE_DOC_SEO')

/**
 * Enable per-page canonical, Open Graph and Twitter tags. Titles and descriptions
 * come from each page (frontmatter overrides the manifest); `url` builds the
 * canonical and `og:url`, and `image` sets the default social card.
 */
export function withSeo(config: NgeDocSeoConfig): NgeDocFeature {
  return { providers: [{ provide: NGE_DOC_SEO, useValue: config }] }
}

/** Base url a page's `sourcePath` is appended to for the "Edit this page" link. */
export const NGE_DOC_EDIT_URL = new InjectionToken<string>('NGE_DOC_EDIT_URL')

/**
 * Show an "Edit this page" link built from `baseUrl` and each page's compiler
 * `sourcePath`, e.g. `https://github.com/org/repo/edit/main/docs`.
 */
export function withEditLink(baseUrl: string): NgeDocFeature {
  return { providers: [{ provide: NGE_DOC_EDIT_URL, useValue: baseUrl }] }
}
