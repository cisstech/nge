import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'

/**
 * The minimal filesystem the compiler needs. Abstracted so the scan logic can be
 * unit-tested in memory, with no disk and no Node dependency in the tests.
 */
export interface DocFs {
  /** Entry names directly under `dir`. */
  readdir(dir: string): string[]
  /** Whether `path` is a directory. */
  isDirectory(path: string): boolean
  /** Reads a file as UTF-8 text. */
  readFile(path: string): string
  /** Whether `path` exists. */
  exists(path: string): boolean
}

/** {@link DocFs} backed by the real Node filesystem. */
export const nodeFs: DocFs = {
  readdir: (dir) => readdirSync(dir),
  isDirectory: (path) => existsSync(path) && statSync(path).isDirectory(),
  readFile: (path) => readFileSync(path, 'utf8'),
  exists: (path) => existsSync(path),
}
