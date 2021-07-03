import { NgeDocSettings } from "@mcisse/nge/doc";

export const NGE_MONACO: NgeDocSettings = {
    meta: {
        name: 'Nge monaco',
        root: '/docs/nge-monaco/',
        logo: 'assets/images/nge.svg',
        backUrl: '/',
        repo: {
            name: 'nge',
            url: 'https://github.com/mciissee/nge',
        }
    },
    pages: [
        {
            title: 'Getting Started',
            href: 'getting-started',
            renderer: `assets/docs/nge-monaco/getting-started.md`
        },
        {
            title: 'Installation',
            href: 'installation',
            renderer: `assets/docs/nge-monaco/installation.md`
        },
        {
            title: 'Usage',
            href: 'usage',
            renderer: `assets/docs/nge-monaco/usage.md`
        },
        {
            title: 'Showcase',
            href: 'showcase',
            renderer: () => import('../monaco/showcase/showcase.module').then(m => m.ShowcaseModule)
        }
    ],
};
