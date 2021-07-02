import { NgeDocLinAction, NgeDocLink, NgeDocSettings } from "nge/doc";

const editInGithubAction = (url: string) => {
    const base = 'https://github.com/mciissee/nge/tree/main/projects/demo/src/assets/docs/nge-markdown/';
    return {
        title: 'Edit on github',
        icon: 'https://icongr.am/octicons/mark-github.svg',
        run: base + url,
    } as NgeDocLinAction;
};

export const NGE_MARKDOWN: NgeDocSettings = {
    meta: {
        name: 'Ngedoc',
        root: '/docs/nge-markdown/',
        logo: 'assets/images/nge.svg',
        backUrl: '/docs/nge-markdown/getting-started',
        repo: {
            name: 'nge',
            url: 'https://github.com/mciissee/nge',
        }
    },
    pages: [
        {
            title: 'Getting Started',
            href: 'getting-started',
            renderer: `assets/docs/nge-markdown/getting-started.md`,
            actions: [editInGithubAction('getting-started.md')]
        },
        {
            title: 'Installation',
            href: 'installation',
            renderer: `assets/docs/nge-markdown/installation.md`,
            actions: [editInGithubAction('installation.md')]
        },
        {
            title: 'Usage',
            href: 'usage',
            renderer: `assets/docs/nge-markdown/usage.md`,
            actions: [editInGithubAction('usage.md')]
        },
        () => {
            const link = {
                title: 'Contributions',
                href: 'contributions',
                renderer: 'assets/docs/nge-markdown/contributions/contributions.md',
                actions: [editInGithubAction('contributions/contributions.md')]
            } as NgeDocLink;

            const contributions = [
                'Admonitions',
                'Emoji',
                'Highlighter',
                'Icons',
                'Katex',
                'LinkAnchor',
                'TabbedSet'
            ];

            link.children = contributions.map(name => {
                const snakecase = name
                    // transform to snake case
                    .replace(/[A-Z]/gm, (match) => '-' + match.toLowerCase())
                    // remove leading dash
                    .slice(1);
                const base = 'https://github.com/mciissee/nge/tree/main/projects/nge/nge-markdown/src/contributions/';
                return {
                    title: name,
                    href: snakecase,
                    renderer: 'assets/docs/nge-markdown/contributions/' + snakecase + '.md',
                    actions: [
                        {
                            title: 'View source',
                            icon: 'https://icongr.am/octicons/code.svg',
                            run: base + 'nge-markdown-' + snakecase + '.ts',
                        },
                        editInGithubAction('contributions/' + snakecase + '.md'),
                    ]
                };
            });
            return link;
        },
        {
            title: 'Cheatsheet',
            href: 'cheatsheet',
            renderer: () => import('../markdown/cheat-sheet/cheat-sheet.module').then(m => m.CheatSheetModule),
        },
    ],
};
