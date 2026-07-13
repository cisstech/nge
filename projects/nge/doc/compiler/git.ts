import { execFileSync } from 'node:child_process'

/** Reads source-control metadata for a file, abstracted so builds are testable. */
export interface DocGit {
  /** ISO date of the last commit that touched `path`, or undefined if unknown. */
  lastCommitDate(path: string): string | undefined
}

/** {@link DocGit} that never reports a date; the default when git is not wired in. */
export const noopGit: DocGit = {
  lastCommitDate: () => undefined,
}

/** {@link DocGit} backed by the local `git` CLI. */
export const nodeGit: DocGit = {
  lastCommitDate(path) {
    try {
      const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', path], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      })
      return out.trim() || undefined
    } catch {
      return undefined
    }
  },
}
