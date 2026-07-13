import { DATA_STACKBLITZ, NgeMarkdownCodeActionProvider } from './nge-markdown-highlighter'

const STACKBLITZ_SVG =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M10.5 13.5H4.5L14 2l-.5 8.5h6L10 22z"/></svg>'

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

/**
 * Opens the snippet in StackBlitz. The SDK is loaded through a non-literal
 * specifier so bundlers treat `@stackblitz/sdk` as an optional runtime import:
 * apps that never call `withStackblitz()` build without the peer installed,
 * instead of failing to resolve it at bundle time.
 */
export async function openInStackblitz(code: string, options: NgeMarkdownStackblitzOptions): Promise<void> {
  const { project, openFile } = buildStackblitzProject(code, options)
  const moduleName = '@stackblitz/sdk'
  const sdk = (await import(/* @vite-ignore */ moduleName)).default
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sdk.openProject(project as any, { openFile, newWindow: true })
}

/**
 * The "Open in StackBlitz" toolbar action, added to blocks flagged with the
 * `stackblitz` fence keyword. Lives here rather than in the highlighter so the
 * StackBlitz SDK stays out of the module graph until `withStackblitz()` is used.
 */
export function stackblitzCodeActionProvider(options: NgeMarkdownStackblitzOptions): NgeMarkdownCodeActionProvider {
  return ({ pre }) =>
    pre.getAttribute(DATA_STACKBLITZ) === 'true'
      ? { title: 'Open in StackBlitz', icon: STACKBLITZ_SVG, run: (snippet) => openInStackblitz(snippet, options) }
      : null
}
