import { watch } from 'node:fs'
import { resolve } from 'node:path'
import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { runDocsBuild } from './build-docs'
import { DocsBuilderOptions } from './schema'

/** Runs one build, resolving paths against the workspace and logging the result. */
function build(options: DocsBuilderOptions, context: BuilderContext): BuilderOutput {
  const result = runDocsBuild({
    ...options,
    docsDir: resolve(context.workspaceRoot, options.docsDir),
    outputPath: resolve(context.workspaceRoot, options.outputPath),
  })
  if (result.success) {
    context.logger.info(`[nge-doc] built ${result.pages} page(s) into ${options.outputPath}`)
    return { success: true }
  }
  const error = result.error ?? 'nge-doc build failed'
  context.logger.error(`[nge-doc] ${error}`)
  return { success: false, error }
}

/** Rebuilds on every change under the docs folder until the build is torn down. */
async function* watchBuilds(options: DocsBuilderOptions, context: BuilderContext): AsyncIterable<BuilderOutput> {
  yield build(options, context)

  let wake: (() => void) | null = null
  let dirty = false
  const watcher = watch(resolve(context.workspaceRoot, options.docsDir), { recursive: true }, () => {
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

/** `@cisstech/nge:docs` - compiles a `docs/` folder into a manifest + copied markdown. */
export default createBuilder((raw, context: BuilderContext) => {
  const options = raw as unknown as DocsBuilderOptions
  return options.watch ? watchBuilds(options, context) : build(options, context)
})
