import type { NgeDocManifest } from '../src/manifest'
import { absoluteUrl, contentPages } from './pages'

function escapeXml(value: string): string {
  const entities: Record<string, string> = { '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }
  return value.replace(/[<>&'"]/g, (char) => entities[char])
}

/** A `sitemap.xml` listing the manifest's content pages, rooted at `siteUrl`. */
export function buildSitemap(manifest: NgeDocManifest, siteUrl: string): string {
  const urls = contentPages(manifest.pages)
    .map((page) => `  <url>\n    <loc>${escapeXml(absoluteUrl(siteUrl, page.href!))}</loc>\n  </url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

/** A `robots.txt` that allows crawling and points at the sitemap. */
export function buildRobots(siteUrl: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl.replace(/\/+$/, '')}/sitemap.xml\n`
}
