/**
 * Renders a typedoc JSON project into documentation pages: one markdown file
 * per exported declaration plus an index, and the `_meta.json` that orders them.
 * Pure (JSON in, files out), so it is unit-tested without running typedoc.
 *
 * A local, minimal view of the typedoc model is declared here on purpose: the
 * framework-free compiler must not depend on typedoc's types (it is an optional
 * peer), and only a small subset is consumed.
 */

/** typedoc ReflectionKind values, for the kinds we render. */
const KIND = {
  module: 2,
  variable: 32,
  function: 64,
  class: 128,
  interface: 256,
  property: 1024,
  method: 2048,
  accessor: 262144,
  typeAlias: 2097152,
} as const

interface Comment {
  summary?: { kind: string; tag?: string; text?: string }[]
}

/** Resolves an export name to a relative link to its page, or null when it is not a documented export. */
type LinkResolver = (name: string) => string | null

interface Flags {
  isReadonly?: boolean
  isOptional?: boolean
  isRest?: boolean
  isStatic?: boolean
}

interface DeclParameter {
  name: string
  flags?: Flags
  comment?: Comment
  type?: TypeModel
}

interface Signature {
  name: string
  comment?: Comment
  typeParameter?: { name: string }[]
  parameters?: DeclParameter[]
  type?: TypeModel
}

interface Reflection {
  kind: number
  name: string
  comment?: Comment
  flags?: Flags
  children?: Reflection[]
  signatures?: Signature[]
  typeParameter?: { name: string }[]
  type?: TypeModel
}

interface Project {
  children?: Reflection[]
}

// The typedoc type model is a recursive discriminated union; only the members
// this renderer reads are typed, the rest fall through to `typeToString`.
type TypeModel = { type: string; [key: string]: unknown }

/** One generated file: a path relative to the api folder and its content (markdown or `_meta.json`). */
export interface ApiFile {
  path: string
  content: string
}

/** The rendered API section: the pages, the per-folder `_meta.json` files and the overview. */
export interface RenderedApi {
  files: ApiFile[]
}

/** Groups, in sidebar order: each reflection kind becomes its own subfolder and section. */
const GROUPS: { kind: number; folder: string; title: string }[] = [
  { kind: KIND.function, folder: 'functions', title: 'Functions' },
  { kind: KIND.class, folder: 'classes', title: 'Classes' },
  { kind: KIND.interface, folder: 'interfaces', title: 'Interfaces' },
  { kind: KIND.typeAlias, folder: 'type-aliases', title: 'Type aliases' },
  { kind: KIND.variable, folder: 'variables', title: 'Variables' },
]

/**
 * Renders the API into a nested tree: one subfolder per kind, one page per
 * export, and a `_meta.json` at each level to keep the sidebar ordered and the
 * export names cased. An `index.md` links everything from an overview.
 *
 * @param basePath Site-absolute url of the api folder, e.g. `/docs/api`. Links
 * between pages are absolute (they resolve against the app `<base href>`, so
 * relative links would not work).
 */
export function renderApiDocs(project: unknown, basePath: string): RenderedApi {
  const exports = topLevelExports(project as Project)
  const files: ApiFile[] = []
  const rootMeta: Record<string, { title: string }> = {}
  const base = basePath.replace(/\/+$/, '')

  // Every documented export, so `{@link Name}` in a comment resolves to its page.
  const folderByName = new Map<string, string>()
  for (const group of GROUPS) {
    for (const decl of declarationsOf(exports, group.kind)) {
      folderByName.set(decl.name, group.folder)
    }
  }
  const resolve: LinkResolver = (name) => (folderByName.has(name) ? `${base}/${folderByName.get(name)}/${name}` : null)

  for (const group of GROUPS) {
    const decls = declarationsOf(exports, group.kind)
    if (!decls.length) {
      continue
    }
    rootMeta[group.folder] = { title: group.title }
    const folderMeta: Record<string, { title: string }> = {}
    for (const decl of decls) {
      files.push({ path: `${group.folder}/${decl.name}.md`, content: renderDeclaration(decl, resolve) })
      folderMeta[decl.name] = { title: decl.name }
    }
    files.push({ path: `${group.folder}/_meta.json`, content: json(folderMeta) })
  }

  files.push({ path: 'index.md', content: renderIndex(exports, base) })
  files.push({ path: '_meta.json', content: json(rootMeta) })
  return { files }
}

function declarationsOf(exports: Reflection[], kind: number): Reflection[] {
  return exports.filter((d) => d.kind === kind).sort((a, b) => a.name.localeCompare(b.name))
}

function json(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`
}

/** Declarations to document: a single entry point exposes them directly, multiple wrap them in modules. */
function topLevelExports(project: Project): Reflection[] {
  const children = project.children ?? []
  const out: Reflection[] = []
  for (const child of children) {
    if (child.kind === KIND.module) {
      out.push(...(child.children ?? []))
    } else {
      out.push(child)
    }
  }
  return out.filter((decl) => GROUPS.some((group) => group.kind === decl.kind))
}

function renderIndex(exports: Reflection[], base: string): string {
  const lines = ['# API reference', '', 'Generated from the source. Every export, grouped by kind.', '']
  for (const group of GROUPS) {
    const decls = declarationsOf(exports, group.kind)
    if (!decls.length) {
      continue
    }
    lines.push(`## ${group.title}`, '')
    for (const decl of decls) {
      const summary = firstLine(commentText(decl.comment ?? signatureComment(decl)))
      lines.push(`- [${decl.name}](${base}/${group.folder}/${decl.name})${summary ? ` - ${summary}` : ''}`)
    }
    lines.push('')
  }
  return `${lines.join('\n').trimEnd()}\n`
}

function renderDeclaration(decl: Reflection, resolve: LinkResolver): string {
  const comment = decl.comment ?? signatureComment(decl)
  // Frontmatter stays plain text; the body prose carries resolved links.
  const description = firstLine(commentText(comment))
  const front = ['---', `title: ${decl.name}`, ...(description ? [`description: ${description}`] : []), '---', '']
  const body = [`# ${decl.name}`, '', `\`${kindLabel(decl.kind)}\``, '']
  if (description) {
    body.push(commentText(comment, resolve), '')
  }
  body.push(...declarationBody(decl, resolve))
  return `${front.join('\n')}${body.join('\n').trimEnd()}\n`
}

function declarationBody(decl: Reflection, resolve: LinkResolver): string[] {
  switch (decl.kind) {
    case KIND.function:
      return signatureSections(decl.signatures ?? [], 'function ', resolve)
    case KIND.interface:
    case KIND.class:
      return objectBody(decl, resolve)
    case KIND.typeAlias:
      return codeBlock(`type ${decl.name}${typeParams(decl.typeParameter)} = ${typeToString(decl.type)}`)
    case KIND.variable:
      return codeBlock(`const ${decl.name}: ${typeToString(decl.type)}`)
    default:
      return []
  }
}

/** Signature-based body (functions, methods): a code block per overload plus params and return. */
function signatureSections(signatures: Signature[], prefix: string, resolve: LinkResolver): string[] {
  const out: string[] = []
  for (const sig of signatures) {
    out.push('## Signature', '', ...codeBlock(`${prefix}${signatureString(sig)}`))
    const params = (sig.parameters ?? []).filter((p) => p.name !== '__namedParameters')
    if (params.length) {
      out.push('### Parameters', '')
      for (const param of params) {
        const desc = firstLine(commentText(param.comment, resolve))
        const name = param.flags?.isRest ? `...${param.name}` : param.name
        out.push(`- \`${name}\` (\`${typeToString(param.type)}\`)${desc ? ` - ${desc}` : ''}`)
      }
      out.push('')
    }
    if (sig.type) {
      out.push('### Returns', '', `\`${typeToString(sig.type)}\``, '')
    }
  }
  return out
}

/** Interface and class body: a properties table and, for classes, the public methods. */
function objectBody(decl: Reflection, resolve: LinkResolver): string[] {
  const members = (decl.children ?? []).filter((m) => !isHidden(m))
  const properties = members.filter((m) => m.kind === KIND.property || m.kind === KIND.accessor)
  const methods = members.filter((m) => m.kind === KIND.method)
  const out: string[] = []

  if (properties.length) {
    out.push('## Properties', '', '| Name | Type | Description |', '| --- | --- | --- |')
    for (const prop of properties) {
      const name = `${prop.name}${prop.flags?.isOptional ? '?' : ''}${prop.flags?.isReadonly ? ' (readonly)' : ''}`
      const type = typeToString(prop.type ?? prop.signatures?.[0]?.type)
      out.push(`| \`${name}\` | \`${type}\` | ${cell(firstLine(commentText(prop.comment, resolve)))} |`)
    }
    out.push('')
  }

  for (const method of methods) {
    out.push(`## \`${method.name}()\``, '')
    out.push(...signatureSections(method.signatures ?? [], '', resolve))
  }
  return out
}

function signatureString(sig: Signature): string {
  const params = (sig.parameters ?? [])
    .map((p) => {
      const name = `${p.flags?.isRest ? '...' : ''}${p.name}${p.flags?.isOptional ? '?' : ''}`
      return `${name}: ${typeToString(p.type)}`
    })
    .join(', ')
  return `${sig.name}${typeParams(sig.typeParameter)}(${params}): ${typeToString(sig.type)}`
}

/** Best-effort rendering of the typedoc type model to a TypeScript-like string. */
function typeToString(type: TypeModel | undefined): string {
  if (!type) {
    return 'unknown'
  }
  switch (type.type) {
    case 'intrinsic':
      return String(type['name'])
    case 'literal':
      return typeof type['value'] === 'string' ? `"${type['value']}"` : String(type['value'])
    case 'reference': {
      const args = (type['typeArguments'] as TypeModel[] | undefined)?.map(typeToString)
      return `${type['name']}${args?.length ? `<${args.join(', ')}>` : ''}`
    }
    case 'array':
      return `${wrapUnion(type['elementType'] as TypeModel)}[]`
    case 'union':
      return (type['types'] as TypeModel[]).map(typeToString).join(' | ')
    case 'intersection':
      return (type['types'] as TypeModel[]).map(typeToString).join(' & ')
    case 'reflection':
      return reflectionType(type['declaration'] as Reflection | undefined)
    case 'tuple':
      return `[${((type['elements'] as TypeModel[]) ?? []).map(typeToString).join(', ')}]`
    case 'indexedAccess':
      return `${typeToString(type['objectType'] as TypeModel)}[${typeToString(type['indexType'] as TypeModel)}]`
    case 'typeOperator':
      return `${type['operator']} ${typeToString(type['target'] as TypeModel)}`
    case 'query':
      return `typeof ${typeToString(type['queryType'] as TypeModel)}`
    case 'predicate':
      return `${type['name']} is ${typeToString(type['targetType'] as TypeModel)}`
    case 'named-tuple-member':
      return `${type['name']}: ${typeToString(type['element'] as TypeModel)}`
    case 'templateLiteral':
      return '`' + '...' + '`'
    default:
      return typeof type['name'] === 'string' ? String(type['name']) : 'unknown'
  }
}

/** Parenthesize a union or function type before appending `[]`, so `(A | B)[]` reads right. */
function wrapUnion(type: TypeModel): string {
  const rendered = typeToString(type)
  return /[|&]| => /.test(rendered) ? `(${rendered})` : rendered
}

/** An inline reflection type: a call signature becomes an arrow, an object literal stays `object`. */
function reflectionType(declaration: Reflection | undefined): string {
  const sig = declaration?.signatures?.[0]
  if (!sig) {
    return 'object'
  }
  const params = (sig.parameters ?? []).map((p) => `${p.name}: ${typeToString(p.type)}`).join(', ')
  return `(${params}) => ${typeToString(sig.type)}`
}

function typeParams(params?: { name: string }[]): string {
  return params?.length ? `<${params.map((p) => p.name).join(', ')}>` : ''
}

function kindLabel(kind: number): string {
  switch (kind) {
    case KIND.function:
      return 'function'
    case KIND.class:
      return 'class'
    case KIND.interface:
      return 'interface'
    case KIND.typeAlias:
      return 'type'
    case KIND.variable:
      return 'const'
    default:
      return 'export'
  }
}

function signatureComment(decl: Reflection): Comment | undefined {
  return decl.signatures?.find((sig) => sig.comment)?.comment
}

/**
 * Joins a typedoc comment's summary parts into markdown. With a {@link LinkResolver},
 * `{@link Name}` inline tags become links to the referenced export's page;
 * without one (frontmatter, index summaries) they render as plain text.
 */
function commentText(comment: Comment | undefined, resolve?: LinkResolver): string {
  return (comment?.summary ?? [])
    .map((part) => {
      if (resolve && part.kind === 'inline-tag' && part.tag?.startsWith('@link')) {
        const label = (part.text ?? '').trim()
        // `{@link Target}` or `{@link Target | label}` / `{@link Target label}`.
        const name = label.split('|')[0].trim().split(/\s+/)[0]
        const href = resolve(name)
        return href ? `[${label}](${href})` : label
      }
      return part.text ?? ''
    })
    .join('')
    .trim()
}

/** The first line of a comment, for a frontmatter description or an index entry. */
function firstLine(text: string): string {
  return text.split('\n')[0].trim()
}

/** Escapes a value for a markdown table cell (pipes and newlines break the row). */
function cell(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\n/g, ' ')
}

function codeBlock(code: string): string[] {
  return ['```typescript', code, '```', '']
}

/** typedoc omits private members by default; also skip anything tagged `@internal`. */
function isHidden(member: Reflection): boolean {
  return commentText(member.comment).includes('@internal')
}
