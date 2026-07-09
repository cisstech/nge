import { NgeDocLink, NgeDocSettings } from '@cisstech/nge/doc'
import { editInGithubAction, octicon } from './actions'

export const NGE_MARKDOWN: NgeDocSettings = {
  meta: {
    name: 'nge/markdown',
    root: '/docs/nge-markdown/',
    logo: 'assets/images/nge.svg',
    backUrl: '/',
    repo: {
      name: 'nge',
      url: 'https://github.com/cisstech/nge',
    },
  },
  pages: [
    { separator: true, title: 'Guides', color: '#10b981' },
    {
      title: 'Getting Started',
      href: 'getting-started',
      renderer: `assets/docs/nge-markdown/getting-started.md`,
      actions: [editInGithubAction('assets/docs/nge-markdown/getting-started.md')],
    },
    {
      title: 'Installation',
      href: 'installation',
      renderer: `assets/docs/nge-markdown/installation.md`,
      actions: [editInGithubAction('assets/docs/nge-markdown/installation.md')],
    },
    {
      title: 'Usage',
      href: 'usage',
      renderer: `assets/docs/nge-markdown/usage.md`,
      actions: [editInGithubAction('assets/docs/nge-markdown/usage.md')],
    },
    {
      title: 'Embedding components',
      href: 'embedding',
      renderer: `assets/docs/nge-markdown/embedding.md`,
      actions: [editInGithubAction('assets/docs/nge-markdown/embedding.md')],
    },
    { separator: true, title: 'Reference', color: '#8b5cf6' },
    () => {
      const link = {
        title: 'Contributions',
        href: 'contributions',
        renderer: 'assets/docs/nge-markdown/contributions/contributions.md',
        actions: [editInGithubAction('assets/docs/nge-markdown/contributions/contributions.md')],
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
            editInGithubAction('assets/docs/nge-markdown/contributions/' + snakecase + '.md'),
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
