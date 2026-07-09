import { NgeDocIcon, NgeDocLinAction, NgeDocLink, NgeDocSettings } from '@cisstech/nge/doc'

// icongr.am is cross-origin, so provide a per-scheme colored variant (a mask
// can't recolor a cross-origin icon). Colors match the theme's muted foreground.
const octicon = (name: string): NgeDocIcon => ({
  light: `https://icongr.am/octicons/${name}.svg?color=52525b`,
  dark: `https://icongr.am/octicons/${name}.svg?color=a1a1aa`,
})

const editInGithubAction = (url: string) => {
  const base = 'https://github.com/cisstech/nge/tree/main/projects/demo/src/assets/docs/nge-markdown/'
  return {
    title: 'Edit on github',
    icon: octicon('mark-github'),
    run: base + url,
  } as NgeDocLinAction
}

export const NGE_MARKDOWN: NgeDocSettings = {
  meta: {
    name: 'Nge markdown',
    root: '/docs/nge-markdown/',
    logo: 'assets/images/nge.svg',
    backUrl: '/',
    repo: {
      name: 'nge',
      url: 'https://github.com/cisstech/nge',
    },
  },
  pages: [
    {
      title: 'Getting Started',
      href: 'getting-started',
      renderer: `assets/docs/nge-markdown/getting-started.md`,
      actions: [editInGithubAction('getting-started.md')],
    },
    {
      title: 'Installation',
      href: 'installation',
      renderer: `assets/docs/nge-markdown/installation.md`,
      actions: [editInGithubAction('installation.md')],
    },
    {
      title: 'Usage',
      href: 'usage',
      renderer: `assets/docs/nge-markdown/usage.md`,
      actions: [editInGithubAction('usage.md')],
    },
    () => {
      const link = {
        title: 'Contributions',
        href: 'contributions',
        renderer: 'assets/docs/nge-markdown/contributions/contributions.md',
        actions: [editInGithubAction('contributions/contributions.md')],
      } as NgeDocLink

      const contributions = ['Admonitions', 'Emoji', 'Highlighter', 'Icons', 'Katex', 'LinkAnchor', 'TabbedSet']

      link.children = contributions.map((name) => {
        const snakecase = name
          // transform to snake case
          .replace(/[A-Z]/gm, (match) => '-' + match.toLowerCase())
          // remove leading dash
          .slice(1)
        const base = 'https://github.com/cisstech/nge/tree/main/projects/nge/nge-markdown/src/contributions/'
        return {
          title: name,
          href: snakecase,
          renderer: 'assets/docs/nge-markdown/contributions/' + snakecase + '.md',
          actions: [
            {
              title: 'View source',
              icon: octicon('code'),
              run: base + 'nge-markdown-' + snakecase + '.ts',
            },
            editInGithubAction('contributions/' + snakecase + '.md'),
          ],
        }
      })
      return link
    },
    {
      title: 'Cheatsheet',
      href: 'cheatsheet',
      renderer: () => import('../markdown/cheat-sheet/cheat-sheet.module').then((m) => m.CheatSheetModule),
    },
  ],
}
