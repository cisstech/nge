import { DOCUMENT, Injectable, inject } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'
import { joinUrl } from './manifest'
import { NGE_DOC_SEO } from './providers'

/** Context of the page whose tags are being written. */
export interface NgeDocSeoPage {
  /** Page title; the site name is appended unless they are the same. */
  title: string
  /** Meta and social description. */
  description?: string
  /** Social image, absolute or site-relative (resolved against `withSeo` url). */
  image?: string
  /** Name of the active documentation site. */
  siteName: string
  /** Site-absolute href of the page, used for the canonical url. */
  href?: string
}

/**
 * Writes the document title, meta description and social tags (canonical,
 * Open Graph, Twitter) of the active page. Canonical and `og:url` need the
 * site url declared with `withSeo`.
 */
@Injectable()
export class NgeDocSeoService {
  private readonly title = inject(Title)
  private readonly metaTags = inject(Meta)
  private readonly document = inject(DOCUMENT)
  private readonly seo = inject(NGE_DOC_SEO, { optional: true })

  apply(page: NgeDocSeoPage): void {
    const pageTitle = page.title?.trim()
    const fullTitle =
      pageTitle && pageTitle !== page.siteName ? `${pageTitle} · ${page.siteName}` : pageTitle || page.siteName
    this.title.setTitle(fullTitle)

    const description = page.description?.trim()
    if (description) {
      this.metaTags.updateTag({ name: 'description', content: description })
    }

    this.metaTags.updateTag({ property: 'og:title', content: fullTitle })
    this.metaTags.updateTag({ property: 'og:type', content: 'article' })
    this.metaTags.updateTag({ property: 'og:site_name', content: page.siteName })
    this.metaTags.updateTag({ name: 'twitter:card', content: 'summary_large_image' })
    this.metaTags.updateTag({ name: 'twitter:title', content: fullTitle })
    if (description) {
      this.metaTags.updateTag({ property: 'og:description', content: description })
      this.metaTags.updateTag({ name: 'twitter:description', content: description })
    }

    if (this.seo?.url && page.href) {
      const canonical = joinUrl(this.seo.url, page.href)
      this.metaTags.updateTag({ property: 'og:url', content: canonical })
      this.setCanonical(canonical)
    }

    const source = page.image?.trim() || this.seo?.image
    const resolved = source && this.seo?.url && !/^https?:\/\//.test(source) ? joinUrl(this.seo.url, source) : source
    if (resolved) {
      this.metaTags.updateTag({ property: 'og:image', content: resolved })
      this.metaTags.updateTag({ name: 'twitter:image', content: resolved })
    }
  }

  /** Points the `<link rel="canonical">` at the active page, creating it once. */
  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = this.document.createElement('link')
      link.setAttribute('rel', 'canonical')
      this.document.head.appendChild(link)
    }
    link.setAttribute('href', url)
  }
}
