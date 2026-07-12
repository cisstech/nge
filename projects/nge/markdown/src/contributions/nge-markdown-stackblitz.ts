import { InjectionToken } from '@angular/core'

/**
 * Options for opening fenced code in [StackBlitz](https://stackblitz.com). The
 * author owns the project scaffold (files and dependencies); the fenced snippet
 * is injected at {@link file}, so the example is whatever the author configures,
 * not a fragile generated one.
 */
export interface NgeMarkdownStackblitzOptions {
  /**
   * Path the fenced snippet is written to in the project, e.g. `src/main.ts`.
   */
  file: string
  /**
   * StackBlitz template. `node` (default) runs a real npm project in
   * WebContainers, with dependencies declared in the `package.json` file.
   * EngineBlock templates (`angular-cli`, `typescript`...) use `dependencies`.
   */
  template?: 'node' | 'angular-cli' | 'typescript' | 'javascript' | 'create-react-app' | 'vue' | 'html' | 'polymer'
  /** Project title shown in StackBlitz. */
  title?: string
  /** Project description. */
  description?: string
  /** Scaffold files (package.json, index.html, ...), by path. The snippet is added to `file`. */
  files?: Record<string, string>
  /** npm dependencies for EngineBlock templates; ignored for `node` (use `package.json`). */
  dependencies?: Record<string, string>
  /** File opened in the editor. Default: {@link file}. */
  openFile?: string
}

/** A StackBlitz project payload plus the file to open, ready for the SDK. */
export interface StackblitzProject {
  project: {
    title: string
    description?: string
    template: string
    files: Record<string, string>
    dependencies?: Record<string, string>
  }
  openFile: string
}

/** Assembles the StackBlitz project from the scaffold and the snippet. Pure and testable. */
export function buildStackblitzProject(code: string, options: NgeMarkdownStackblitzOptions): StackblitzProject {
  return {
    project: {
      title: options.title ?? 'Example',
      ...(options.description ? { description: options.description } : {}),
      template: options.template ?? 'node',
      files: { ...(options.files ?? {}), [options.file]: code },
      ...(options.dependencies ? { dependencies: options.dependencies } : {}),
    },
    openFile: options.openFile ?? options.file,
  }
}

/** Opens the snippet in StackBlitz. Loads the SDK lazily, so it never ships in the initial bundle. */
export async function openInStackblitz(code: string, options: NgeMarkdownStackblitzOptions): Promise<void> {
  const { project, openFile } = buildStackblitzProject(code, options)
  const sdk = (await import('@stackblitz/sdk')).default
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sdk.openProject(project as any, { openFile, newWindow: true })
}

/** Set with `withStackblitz()` to enable the "Open in StackBlitz" code-block action. */
export const NGE_MARKDOWN_STACKBLITZ = new InjectionToken<NgeMarkdownStackblitzOptions>('NGE_MARKDOWN_STACKBLITZ')
