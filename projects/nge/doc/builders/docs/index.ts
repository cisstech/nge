import { watch } from 'node:fs'
import { resolve } from 'node:path'
import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { Observable } from 'rxjs'
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
  } else {
    context.logger.error(`[nge-doc] ${result.error}`)
  }
  return { success: result.success, error: result.error }
}

/** `@cisstech/nge:docs` — compiles a `docs/` folder into a manifest + copied markdown. */
export default createBuilder((raw, context: BuilderContext) => {
  const options = raw as unknown as DocsBuilderOptions
  if (!options.watch) {
    return build(options, context)
  }
  return new Observable<BuilderOutput>((subscriber) => {
    subscriber.next(build(options, context))
    const dir = resolve(context.workspaceRoot, options.docsDir)
    const watcher = watch(dir, { recursive: true }, () => subscriber.next(build(options, context)))
    return () => watcher.close()
  })
})
