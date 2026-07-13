import { renderApiDocs } from './api-render'

/** A trimmed typedoc project model covering the kinds the renderer emits. */
const project = {
  variant: 'project',
  kind: 1,
  name: 'Docs',
  children: [
    {
      kind: 64,
      name: 'provideThing',
      signatures: [
        {
          kind: 4096,
          name: 'provideThing',
          comment: { summary: [{ kind: 'text', text: 'Configure the engine.' }] },
          parameters: [
            {
              name: 'features',
              flags: { isRest: true },
              comment: { summary: [{ kind: 'text', text: 'features to compose' }] },
              type: { type: 'array', elementType: { type: 'reference', name: 'Feature' } },
            },
          ],
          type: { type: 'reference', name: 'Feature' },
        },
      ],
    },
    {
      kind: 256,
      name: 'Feature',
      comment: { summary: [{ kind: 'text', text: 'A configuration feature.' }] },
      children: [
        {
          kind: 1024,
          name: 'providers',
          flags: { isReadonly: true },
          comment: { summary: [{ kind: 'text', text: 'The providers.' }] },
          type: { type: 'array', elementType: { type: 'intrinsic', name: 'string' } },
        },
        {
          kind: 1024,
          name: 'label',
          flags: { isOptional: true },
          type: { type: 'intrinsic', name: 'string' },
        },
      ],
    },
    {
      kind: 2097152,
      name: 'Scheme',
      comment: { summary: [{ kind: 'text', text: 'A color scheme.' }] },
      type: {
        type: 'union',
        types: [
          { type: 'literal', value: 'auto' },
          { type: 'literal', value: 'dark' },
        ],
      },
    },
    {
      kind: 32,
      name: 'NGE_TOKEN',
      comment: { summary: [{ kind: 'text', text: 'A token.' }] },
      type: { type: 'reference', name: 'InjectionToken', typeArguments: [{ type: 'reference', name: 'Scheme' }] },
    },
  ],
}

const render = () => {
  const { files } = renderApiDocs(project, '/docs/api')
  const byPath = Object.fromEntries(files.map((f) => [f.path, f.content]))
  return { files, byPath }
}

describe('renderApiDocs', () => {
  it('nests one subfolder per kind, one page per export, plus an index', () => {
    const { byPath } = render()

    expect(Object.keys(byPath).sort()).toEqual([
      '_meta.json',
      'functions/_meta.json',
      'functions/provideThing.md',
      'index.md',
      'interfaces/Feature.md',
      'interfaces/_meta.json',
      'type-aliases/Scheme.md',
      'type-aliases/_meta.json',
      'variables/NGE_TOKEN.md',
      'variables/_meta.json',
    ])
  })

  it('orders the group folders in the root _meta, and names members in each folder _meta', () => {
    const { byPath } = render()

    expect(Object.keys(JSON.parse(byPath['_meta.json']))).toEqual([
      'functions',
      'interfaces',
      'type-aliases',
      'variables',
    ])
    expect(JSON.parse(byPath['functions/_meta.json'])).toEqual({ provideThing: { title: 'provideThing' } })
  })

  it('carries a title and one-line description in each page frontmatter', () => {
    const { byPath } = render()

    expect(byPath['functions/provideThing.md']).toMatch(
      /^---\ntitle: provideThing\ndescription: Configure the engine\.\n---/
    )
  })

  it('renders a function with its signature, parameters and return type', () => {
    const page = render().byPath['functions/provideThing.md']

    expect(page).toContain('`function`')
    expect(page).toContain('function provideThing(...features: Feature[]): Feature')
    expect(page).toContain('`...features`')
    expect(page).toContain('features to compose')
    expect(page).toContain('Feature[]')
  })

  it('renders an interface as a properties table, flagging readonly and optional', () => {
    const page = render().byPath['interfaces/Feature.md']

    expect(page).toContain('`interface`')
    expect(page).toContain('## Properties')
    expect(page).toMatch(/`providers \(readonly\)`.*`string\[\]`.*The providers\./)
    expect(page).toMatch(/`label\?`.*`string`/)
  })

  it('renders a type alias as its aliased type', () => {
    const page = render().byPath['type-aliases/Scheme.md']

    expect(page).toContain('`type`')
    expect(page).toContain('type Scheme = "auto" | "dark"')
  })

  it('renders a variable with its type, keeping generic arguments', () => {
    const page = render().byPath['variables/NGE_TOKEN.md']

    expect(page).toContain('`const`')
    expect(page).toContain('NGE_TOKEN: InjectionToken<Scheme>')
  })

  it('lists every export under its group heading on the index page', () => {
    const page = render().byPath['index.md']

    expect(page).toContain('# API reference')
    expect(page).toContain('## Functions')
    expect(page).toContain('[provideThing](/docs/api/functions/provideThing)')
    expect(page).toContain('## Interfaces')
    expect(page).toContain('[Feature](/docs/api/interfaces/Feature)')
  })

  it('resolves {@link Name} in prose to the referenced export page, leaving unknown names plain', () => {
    const proj = {
      variant: 'project',
      kind: 1,
      name: 'D',
      children: [
        {
          kind: 64,
          name: 'provideThing',
          signatures: [
            {
              kind: 4096,
              name: 'provideThing',
              comment: {
                summary: [
                  { kind: 'text', text: 'See ' },
                  { kind: 'inline-tag', tag: '@link', text: 'Feature', target: 1 },
                  { kind: 'text', text: ' and ' },
                  { kind: 'inline-tag', tag: '@link', text: 'missingThing', target: 9 },
                  { kind: 'text', text: '.' },
                ],
              },
              parameters: [],
              type: { type: 'reference', name: 'Feature' },
            },
          ],
        },
        { kind: 256, name: 'Feature', children: [] },
      ],
    }

    const byPath = Object.fromEntries(renderApiDocs(proj, '/docs/api').files.map((f) => [f.path, f.content]))
    const page = byPath['functions/provideThing.md']

    expect(page).toContain('See [Feature](/docs/api/interfaces/Feature) and missingThing.')
    // The frontmatter description stays plain text (no link markup).
    expect(page).toMatch(/description: See Feature and missingThing\./)
  })

  it('flattens module wrappers from multi entry-point projects', () => {
    const wrapped = {
      variant: 'project',
      kind: 1,
      name: 'Docs',
      children: [{ kind: 2, name: 'index', children: project.children }],
    }

    const { files } = renderApiDocs(wrapped, '/docs/api')

    expect(files.map((f) => f.path)).toContain('functions/provideThing.md')
  })
})
