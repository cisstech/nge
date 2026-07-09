import { NgeDocSettings } from '@cisstech/nge/doc'
import { editInGithubAction } from './actions'

export const NGE_DOC: NgeDocSettings = {
  meta: {
    name: 'nge/doc',
    root: '/docs/nge-doc/',
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
      renderer: 'assets/docs/nge-doc/getting-started.md',
      actions: [editInGithubAction('assets/docs/nge-doc/getting-started.md')],
    },
    {
      title: 'Installation',
      href: 'installation',
      renderer: 'assets/docs/nge-doc/installation.md',
      actions: [editInGithubAction('assets/docs/nge-doc/installation.md')],
    },
    {
      title: 'Usage',
      href: 'usage',
      renderer: 'assets/docs/nge-doc/usage.md',
      actions: [editInGithubAction('assets/docs/nge-doc/usage.md')],
    },
    {
      title: 'Advanced Usage',
      href: 'advanced-usage',
      renderer: 'assets/docs/nge-doc/advanced-usage.md',
      actions: [editInGithubAction('assets/docs/nge-doc/advanced-usage.md')],
    },
  ],
}
