/** Result of {@link parseFrontmatter}. */
export interface NgeDocFrontmatter {
  /** Parsed key/value pairs (empty when there is no frontmatter). */
  data: Record<string, string>
  /** The markdown content with the frontmatter block removed. */
  content: string
}

/**
 * Extracts a leading YAML-ish frontmatter block (`--- ... ---`) from markdown.
 *
 * Intentionally tiny: flat `key: value` pairs only, quotes trimmed. The block is
 * stripped only when it holds at least one valid pair, so a document that opens
 * with a `---` horizontal rule is left untouched.
 */
export function parseFrontmatter(markdown: string): NgeDocFrontmatter {
  const match = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(markdown)
  if (!match) {
    return { data: {}, content: markdown }
  }

  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const pair = /^([A-Za-z0-9_-]+)[ \t]*:[ \t]*(.*)$/.exec(line)
    if (pair) {
      data[pair[1]] = pair[2].trim().replace(/^(['"])(.*)\1$/, '$2')
    }
  }

  if (Object.keys(data).length === 0) {
    return { data: {}, content: markdown }
  }

  return { data, content: markdown.slice(match[0].length) }
}
