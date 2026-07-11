import type { NgeDocLink } from '../src/nge-doc'
import type { NgeDocManifest } from '../src/manifest'

/** Absolute urls of every page that renders content, in document order. */
function pageUrls(pages: NgeDocLink[], siteUrl: string): string[] {
  const base = siteUrl.replace(/\/+$/, '')
  const urls: string[] = []
  const walk = (nodes: NgeDocLink[]): void => {
    for (const node of nodes) {
      if (node.separator) {
        continue
      }
      if (node.href && node.renderer) {
        urls.push(`${base}/${node.href.replace(/^\/+/, '')}`)
      }
      if (node.children?.length) {
        walk(node.children)
      }
    }
  }
  walk(pages)
  return urls
}

function escapeXml(value: string): string {
  const entities: Record<string, string> = { '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }
  return value.replace(/[<>&'"]/g, (char) => entities[char])
}

/** A `sitemap.xml` listing the manifest's content pages, rooted at `siteUrl`. */
export function buildSitemap(manifest: NgeDocManifest, siteUrl: string): string {
  const urls = pageUrls(manifest.pages, siteUrl)
    .map((loc) => `  <url>\n    <loc>${escapeXml(loc)}</loc>\n  </url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

/** A `robots.txt` that allows crawling and points at the sitemap. */
export function buildRobots(siteUrl: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl.replace(/\/+$/, '')}/sitemap.xml\n`
}
