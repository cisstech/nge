import type { NgeDocManifest } from '../src/core/manifest'
import { absoluteUrl, contentPages } from './pages'

/**
 * An `llms.txt` index (see llmstxt.org): the site name followed by a list of its
 * pages as absolute links with descriptions, for a model to discover the docs.
 */
export function buildLlms(manifest: NgeDocManifest, siteUrl: string): string {
  const list = contentPages(manifest.pages)
    .map((page) => {
      const link = `- [${page.title}](${absoluteUrl(siteUrl, page.href!)})`
      return page.description ? `${link}: ${page.description}` : link
    })
    .join('\n')
  return `# ${manifest.meta.name}\n\n## Documentation\n\n${list}\n`
}

/**
 * An `llms-full.txt`: every page's full markdown inlined under its title and
 * source url, so a model can ingest the whole documentation in one file.
 * `readSource` returns a page's markdown body (frontmatter already stripped).
 */
export function buildLlmsFull(
  manifest: NgeDocManifest,
  siteUrl: string,
  readSource: (sourcePath: string) => string
): string {
  const sections = contentPages(manifest.pages).map((page) => {
    const body = page.sourcePath ? readSource(page.sourcePath).trim() : ''
    return `# ${page.title}\nSource: ${absoluteUrl(siteUrl, page.href!)}\n\n${body}`
  })
  return `# ${manifest.meta.name}\n\n${sections.join('\n\n---\n\n')}\n`
}
