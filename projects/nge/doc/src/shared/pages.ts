import type { NgeDocLink } from '../core/nge-doc'

/**
 * Content pages (an `href` plus a renderer) of a navigation tree, depth-first.
 * Separators, pure grouping links and external links (no renderer) are
 * excluded. Shared by the runtime, the compiler and the SSR entry; `src/shared`
 * holds the pure, framework-free utils and is the only src folder the Node
 * builder ships (the link type import is type-only, erased at compile time).
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
