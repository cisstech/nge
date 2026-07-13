/**
 * @jest-environment node
 *
 * Schematics run in Node (no DOM), and the jsdom environment lacks the
 * `structuredClone` global the devkit relies on.
 */

// The devkit task executor requires `ora` (ESM-only, unloadable from jest's
// CJS transform); these tests never run install tasks.
jest.mock('ora', () => ({}))

import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing'
import { Tree } from '@angular-devkit/schematics'
import * as path from 'node:path'

const collection = path.join(__dirname, '..', 'collection.json')

/** Minimal standalone Angular workspace, the shape `ng new` produces today. */
function workspace(): Tree {
  const tree = Tree.empty()
  tree.create(
    '/angular.json',
    JSON.stringify({
      version: 1,
      projects: {
        app: {
          projectType: 'application',
          root: '',
          sourceRoot: 'src',
          architect: {
            build: { builder: '@angular/build:application', options: { assets: [{ glob: '**/*', input: 'public' }] } },
          },
        },
      },
    })
  )
  tree.create(
    '/src/main.ts',
    `import { bootstrapApplication } from '@angular/platform-browser'
import { appConfig } from './app/app.config'
import { App } from './app/app'

bootstrapApplication(App, appConfig).catch((err) => console.error(err))
`
  )
  tree.create(
    '/src/app/app.config.ts',
    `import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
}
`
  )
  tree.create('/src/app/app.ts', `export class App {}`)
  tree.create('/src/app/app.routes.ts', `export const routes = []`)
  tree.create('/package.json', JSON.stringify({ name: 'app', version: '0.0.0' }))
  return tree
}

const run = async (tree: Tree, options: Record<string, unknown> = {}) => {
  const runner = new SchematicTestRunner('nge', collection)
  return runner.runSchematic('ng-add', options, tree)
}

describe('ng-add', () => {
  let tree: UnitTestTree

  beforeEach(async () => {
    tree = await run(workspace())
  })

  it('scaffolds a docs skeleton under the public dir', () => {
    expect(tree.exists('/public/docs/index.md')).toBe(true)
    expect(tree.exists('/public/docs/getting-started.md')).toBe(true)
    expect(JSON.parse(tree.readContent('/public/docs/_meta.json'))).toBeTruthy()
  })

  it('registers the docs builder target in angular.json', () => {
    const docs = JSON.parse(tree.readContent('/angular.json')).projects.app.architect.docs
    expect(docs.builder).toBe('@cisstech/nge:docs')
    expect(docs.options).toMatchObject({ publicDir: 'public', root: '/docs', name: 'app' })
  })

  it('adds provideNgeDoc to the standalone app config', () => {
    const config = tree.readContent('/src/app/app.config.ts')
    expect(config).toContain('provideNgeDoc')
    expect(config).toContain('@cisstech/nge/doc')
  })

  it('does not overwrite existing docs content', async () => {
    const seeded = workspace()
    seeded.create('/public/docs/index.md', '# Mine')
    const result = await run(seeded)

    expect(result.readContent('/public/docs/index.md')).toBe('# Mine')
  })

  it('still scaffolds the skeleton when there is no angular.json (Nx project.json setups)', async () => {
    const bare = Tree.empty()
    bare.create('/package.json', JSON.stringify({ name: 'app' }))

    const result = await run(bare)

    expect(result.exists('/public/docs/index.md')).toBe(true)
  })
})
