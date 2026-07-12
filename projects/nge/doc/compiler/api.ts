import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { DocFsWriter } from './build'
import { renderApiDocs } from './api-render'

/** Options for generating the API reference section. */
export interface ApiDocsOptions {
  /** Entry point source files typedoc reads, e.g. `['projects/nge/doc/index.ts']`. */
  entryPoints: string[]
  /** tsconfig used to resolve types. Default: the nearest `tsconfig.json`. */
  tsconfig?: string
  /** Folder the pages are written to, e.g. `<docsDir>/api`. */
  dir: string
}

/**
 * Generates the API reference: runs typedoc, renders the model to markdown and
 * writes one page per export plus an index and `_meta.json`. Returns the number
 * of documented exports.
 */
export function buildApiDocs(options: ApiDocsOptions, writer: DocFsWriter): number {
  const project = runTypedoc(options)
  const { files } = renderApiDocs(project)
  for (const file of files) {
    writer.writeFile(join(options.dir, file.path), file.content)
  }
  // One markdown page per documented export (index and _meta.json excluded).
  return files.filter((file) => file.path.endsWith('.md') && file.path !== 'index.md').length
}

/**
 * Runs the typedoc CLI to emit the JSON model. Shelling out (rather than
 * importing typedoc) keeps this CJS builder synchronous and free of typedoc's
 * ESM entry. typedoc is an optional peer: a clear error asks to install it.
 */
function runTypedoc(options: ApiDocsOptions): unknown {
  const bin = resolveTypedocBin()
  const dir = mkdtempSync(join(tmpdir(), 'nge-doc-api-'))
  const out = join(dir, 'api.json')
  try {
    const args = ['--json', out, '--excludeExternals', '--excludePrivate', '--entryPointStrategy', 'expand']
    if (options.tsconfig) {
      args.push('--tsconfig', options.tsconfig)
    }
    args.push(...options.entryPoints)

    const result = spawnSync(process.execPath, [bin, ...args], { encoding: 'utf8' })
    if (result.status !== 0) {
      throw new Error(`typedoc exited with ${result.status}.\n${result.stderr || result.stdout}`)
    }
    return JSON.parse(readFileSync(out, 'utf8'))
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

/** Resolves the typedoc CLI from the consumer's install, or explains how to add it. */
function resolveTypedocBin(): string {
  try {
    // Resolved against the consumer, where typedoc is a (peer) dependency.
    return join(dirname(require.resolve('typedoc/package.json')), 'bin', 'typedoc')
  } catch {
    throw new Error(
      '[nge-doc]: the `api` option needs typedoc. Install it with `npm i -D typedoc`, or remove `api` from the docs builder options.'
    )
  }
}
