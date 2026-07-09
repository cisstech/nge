import { parseFrontmatter } from './frontmatter'

describe('parseFrontmatter', () => {
  it('returns empty data and the content untouched when there is no frontmatter', () => {
    const markdown = '# Title\n\nsome text'
    expect(parseFrontmatter(markdown)).toEqual({ data: {}, content: markdown })
  })

  it('parses key/value pairs and strips the block', () => {
    const result = parseFrontmatter('---\ntitle: Hello\ndescription: A page\n---\n# Body')
    expect(result.data).toEqual({ title: 'Hello', description: 'A page' })
    expect(result.content).toBe('# Body')
  })

  it('trims surrounding single and double quotes from values', () => {
    const result = parseFrontmatter(`---\ntitle: "Quoted"\ntag: 'solo'\n---\nbody`)
    expect(result.data).toEqual({ title: 'Quoted', tag: 'solo' })
  })

  it('keeps colons that appear inside a value', () => {
    const result = parseFrontmatter('---\nlink: https://example.com\n---\nbody')
    expect(result.data['link']).toBe('https://example.com')
  })

  it('does not treat a leading horizontal rule as frontmatter', () => {
    const markdown = '---\n# Not frontmatter\n---\nbody'
    expect(parseFrontmatter(markdown)).toEqual({ data: {}, content: markdown })
  })

  it('ignores frontmatter that is not at the very start', () => {
    const markdown = 'intro\n---\ntitle: Hello\n---\nbody'
    expect(parseFrontmatter(markdown)).toEqual({ data: {}, content: markdown })
  })

  it('supports CRLF line endings', () => {
    const result = parseFrontmatter('---\r\ntitle: Hello\r\n---\r\n# Body')
    expect(result.data).toEqual({ title: 'Hello' })
    expect(result.content).toBe('# Body')
  })

  it('handles an empty body after the frontmatter', () => {
    const result = parseFrontmatter('---\ntitle: Hello\n---\n')
    expect(result.data).toEqual({ title: 'Hello' })
    expect(result.content).toBe('')
  })
})
