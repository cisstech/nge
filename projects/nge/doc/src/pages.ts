import type { NgeDocLink } from './nge-doc'

/**
 * Content pages (an `href` plus a renderer) of a navigation tree, depth-first.
 * Separators, pure grouping links and external links (no renderer) are
 * excluded. Framework-free and shared by the runtime, the compiler and the
 * SSR entry (kept at builder runtime by build-nge-builder.sh, like
 * {@link ./frontmatter}).
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
