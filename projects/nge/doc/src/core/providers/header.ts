import { InjectionToken } from '@angular/core'
import { NgeDocIcon } from '../nge-doc'
import { NgeDocFeature } from './provide'

/** A top-level navigation link shown in the theme header. */
export interface NgeDocNavLink {
  /** Text of the link. */
  title: string
  /** Target url (an Angular routerLink, or an absolute url when `external`). */
  href: string
  /** Optional icon. */
  icon?: NgeDocIcon
  /** Open in a new tab as a plain anchor instead of routing internally. */
  external?: boolean
}

/** Header navigation links. When absent, a theme may derive them from the registered sites. */
export const NGE_DOC_NAVBAR = new InjectionToken<NgeDocNavLink[]>('NGE_DOC_NAVBAR')

/**
 * Declare the header navigation links (e.g. to move between documentation sites).
 *
 * Without it, the default theme derives them from the active site's sections
 * (`nav: 'tabs'`) or lists the registered sites.
 */
export function withNavbar(links: NgeDocNavLink[]): NgeDocFeature {
  return { providers: [{ provide: NGE_DOC_NAVBAR, useValue: links }] }
}

/** The header brand: one logo and wordmark shared by every site. */
export interface NgeDocBrand {
  /** Wordmark shown next to the logo. */
  title: string
  /** Optional logo icon. */
  icon?: NgeDocIcon
  /** Where clicking the brand navigates (an Angular routerLink). Defaults to `/`. */
  href?: string
}

/** Header brand. When absent, the default theme uses the active site's name and logo. */
export const NGE_DOC_BRAND = new InjectionToken<NgeDocBrand>('NGE_DOC_BRAND')

/**
 * Set a single brand (logo and title) for the header, shared across every site.
 *
 * The default theme otherwise shows the active site's `meta.name` and `meta.logo`,
 * so the brand width follows the current site. A fixed brand keeps the header stable
 * while site names still drive breadcrumbs and page titles.
 */
export function withBrand(brand: NgeDocBrand): NgeDocFeature {
  return { providers: [{ provide: NGE_DOC_BRAND, useValue: brand }] }
}
