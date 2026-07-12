export { contentPages } from '../src/pages'

/** Absolute url for a page `href` under `siteUrl`, with exactly one slash between. */
export function absoluteUrl(siteUrl: string, href: string): string {
  return `${siteUrl.replace(/\/+$/, '')}/${href.replace(/^\/+/, '')}`
}
