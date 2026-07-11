import type { NgeDocLink } from '../src/nge-doc'

/**
 * Content pages (an `href` plus a renderer), depth-first. Separators, pure
 * grouping links and external links (no renderer) are excluded.
 */
export function contentPages(pages: NgeDocLink[]): NgeDocLink[] {
  const out: NgeDocLink[] = []
  const walk = (nodes: NgeDocLink[]): void => {
    for (const node of nodes) {
      if (node.separator) {
        continue
      }
      if (node.href && node.renderer) {
        out.push(node)
      }
      if (node.children?.length) {
        walk(node.children)
      }
    }
  }
  walk(pages)
  return out
}

/** Absolute url for a page `href` under `siteUrl`, with exactly one slash between. */
export function absoluteUrl(siteUrl: string, href: string): string {
  return `${siteUrl.replace(/\/+$/, '')}/${href.replace(/^\/+/, '')}`
}
