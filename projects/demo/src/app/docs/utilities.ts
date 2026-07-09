import { NgeDocSettings } from '@cisstech/nge/doc'

export const NGE_UTILITIES: NgeDocSettings = {
  meta: {
    name: 'Utilities',
    root: '/docs/utilities/',
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
      renderer: 'assets/docs/utilities/getting-started.md',
    },
    {
      title: 'Services',
      href: 'services',
      renderer: 'assets/docs/utilities/services.md',
    },
    {
      title: 'Pipes',
      href: 'pipes',
      renderer: 'assets/docs/utilities/pipes.md',
    },
    {
      title: 'Utils',
      href: 'utils',
      renderer: 'assets/docs/utilities/utils.md',
    },
  ],
}
