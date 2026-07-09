import { NgeDocSettings } from '@cisstech/nge/doc'
import { editInGithubAction } from './actions'

export const NGE_UI: NgeDocSettings = {
  meta: {
    name: 'nge/ui',
    root: '/docs/nge-ui/',
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
      renderer: 'assets/docs/nge-ui/getting-started.md',
      actions: [editInGithubAction('assets/docs/nge-ui/getting-started.md')],
    },
    {
      title: 'Tree',
      href: 'tree',
      renderer: 'assets/docs/nge-ui/tree.md',
      actions: [editInGithubAction('assets/docs/nge-ui/tree.md')],
    },
    {
      title: 'List',
      href: 'list',
      renderer: 'assets/docs/nge-ui/list.md',
      actions: [editInGithubAction('assets/docs/nge-ui/list.md')],
    },
    {
      title: 'Icon',
      href: 'icon',
      renderer: 'assets/docs/nge-ui/icon.md',
      actions: [editInGithubAction('assets/docs/nge-ui/icon.md')],
    },
  ],
}
