import { watch } from 'node:fs'
import { resolve } from 'node:path'
import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { docsDirOf, runDocsBuild } from './build-docs'
import { DocsBuilderOptions } from './schema'

/** Runs one build, resolving the public dir against the workspace and logging the result. */
function build(options: DocsBuilderOptions, context: BuilderContext): BuilderOutput {
  const result = runDocsBuild({ ...options, publicDir: resolve(context.workspaceRoot, options.publicDir) })
  if (result.success) {
    context.logger.info(`[nge-doc] built ${result.pages} page(s) for ${options.root}`)
    return { success: true }
  }
  const error = result.error ?? 'nge-doc build failed'
  context.logger.error(`[nge-doc] ${error}`)
  return { success: false, error }
}

/** Rebuilds on every change under the markdown source folder until the build is torn down. */
async function* watchBuilds(options: DocsBuilderOptions, context: BuilderContext): AsyncIterable<BuilderOutput> {
  yield build(options, context)

  let wake: (() => void) | null = null
  let dirty = false
  const dir = docsDirOf({ publicDir: resolve(context.workspaceRoot, options.publicDir), root: options.root })
  const watcher = watch(dir, { recursive: true }, () => {
    dirty = true
    wake?.()
  })
  try {
    for (;;) {
      if (!dirty) {
        await new Promise<void>((resolvePending) => (wake = resolvePending))
      }
      dirty = false
      yield build(options, context)
    }
  } finally {
    watcher.close()
  }
}

/** `@cisstech/nge:docs` - compiles markdown authored under `public/` into a manifest + AI/SEO files, in place. */
export default createBuilder((raw, context: BuilderContext) => {
  const options = raw as unknown as DocsBuilderOptions
  return options.watch ? watchBuilds(options, context) : build(options, context)
})
