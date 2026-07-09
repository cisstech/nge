import { NgeDocSettings } from '@cisstech/nge/doc'
import { editInGithubAction } from './actions'

export const NGE_OVERVIEW: NgeDocSettings = {
  meta: {
    name: 'NG Essentials',
    root: '/docs/overview/',
    logo: 'assets/images/nge.svg',
    repo: {
      name: 'nge',
      url: 'https://github.com/cisstech/nge',
    },
  },
  pages: [
    {
      title: 'Introduction',
      href: 'introduction',
      renderer: 'assets/docs/overview/introduction.md',
      actions: [editInGithubAction('assets/docs/overview/introduction.md')],
    },
    {
      title: 'Installation',
      href: 'installation',
      renderer: 'assets/docs/overview/installation.md',
      actions: [editInGithubAction('assets/docs/overview/installation.md')],
    },
  ],
}
