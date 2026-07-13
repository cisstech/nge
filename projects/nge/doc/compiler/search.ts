import type { NgeDocManifest } from '../src/core/manifest'
import { slugify } from '../src/shared/slug'
import { contentPages } from './pages'

/**
 * One unit of the search index. Mirrors the runtime `NgeDocSearchDocument`; kept
 * local so the framework-free compiler does not import the Angular-coupled search
 * module (its `@angular/common/http` import breaks the Node builder compile).
 */
export interface NgeDocSearchDocument {
  slug: string
  title: string
  heading?: string
  content: string
}

interface Chunk {
  heading?: string
  anchor?: string
  text: string
}

/** Reduces markdown to searchable plain text so excerpts read as prose, not syntax. */
function toPlainText(markdown: string): string {
  return markdown
    .replace(/```[a-z]*\n?/gi, ' ') // code fences (keep the code text between them)
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> label
    .replace(/^[ \t]*[#>\-*+]+[ \t]+/gm, '') // heading / quote / list markers
    .replace(/^[ \t]*[=:]{2,}.*$/gm, ' ') // tabbed-set (===) and admonition (:::) markers
    .replace(/[*_~]/g, '') // emphasis
    .replace(/\|/g, ' ') // table pipes
    .replace(/\s+/g, ' ')
    .trim()
}

/** Drops a leading `# Title` line so excerpts do not just echo the page title. */
function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^\s*#[ \t]+.*(?:\r?\n|$)/, '')
}

/** Splits markdown into an intro chunk plus one chunk per `##`/`###` section (fenced code ignored). */
function chunkByHeading(markdown: string): Chunk[] {
  const chunks: Chunk[] = []
  let heading: string | undefined
  let lines: string[] = []
  let inCode = false

  const flush = () => {
    const text = toPlainText(lines.join('\n'))
    if (text || heading) {
      chunks.push({ heading, anchor: heading ? slugify(heading) : undefined, text })
    }
    lines = []
  }

  for (const line of markdown.split('\n')) {
    if (/^\s*```/.test(line)) {
      inCode = !inCode
    }
    const match = inCode ? null : line.match(/^(#{2,3})\s+(.*\S)\s*$/)
    if (match) {
      flush()
      heading = match[2].trim()
    } else {
      lines.push(line)
    }
  }
  flush()
  return chunks
}

/**
 * Builds a search index: one document per page intro plus one per `##`/`###`
 * section, so results can deep-link to a heading. `readSource` returns a page's
 * markdown body (frontmatter stripped).
 */
export function buildSearchIndex(
  manifest: NgeDocManifest,
  readSource: (sourcePath: string) => string
): NgeDocSearchDocument[] {
  const docs: NgeDocSearchDocument[] = []
  for (const page of contentPages(manifest.pages)) {
    if (!page.sourcePath || !page.href) {
      continue
    }
    for (const chunk of chunkByHeading(stripLeadingH1(readSource(page.sourcePath)))) {
      docs.push({
        slug: chunk.anchor ? `${page.href}#${chunk.anchor}` : page.href,
        title: page.title,
        heading: chunk.heading,
        content: chunk.text,
      })
    }
  }
  return docs
}
