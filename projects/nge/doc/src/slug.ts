/**
 * Turns a heading label into a URL fragment. The doc compiler uses it to build
 * search anchors and the renderer to assign heading ids; the two must agree or
 * deep-links break, so the logic lives here once. Pure and framework-free, so
 * the Node builder can import it too (kept at runtime by build-nge-builder.sh,
 * like {@link ./frontmatter}).
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}
