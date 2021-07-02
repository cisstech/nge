import { Injectable, Provider } from '@angular/core';
import { NgeMarkdownTransformer } from '../nge-markdown-transformer';
import { NgeMarkdownContribution, NGE_MARKDOWN_CONTRIBUTION } from '../nge-markdown-contribution';

const OPEN = /^:::(\+?)\s+(\w+)(\s+.+)?/;
const CLOSE = /^:::\s*$/;

/**
 * Contribution to add collapsible styled block to markdown syntax.
 */
@Injectable()
export class NgeMarkdownAdmonitions implements NgeMarkdownContribution {
    contribute(transformer: NgeMarkdownTransformer) {
        this.addStyles();
        this.autoFixAdmonitionsSyntax(transformer);
        this.createAdmonitions(transformer);
    }

    private addStyles() {
        const head = document.head;
        if (head.querySelector('[nge-markdown-admonitions]')) {
            return;
        }

        const admonitions: Record<string, { border: string; bg: string; }> = {
            note: {
                bg: 'rgba(68, 138, 255, 0.1)',
                border: '#448aff',
            },
            abstract: {
                bg: 'rgba(0, 176, 255, 0.1)',
                border: '#00b0ff',
            },
            info: {
                bg: 'rgba(0, 184, 212, 0.1)',
                border: '#00b8d4',
            },
            tip: {
                bg: 'rgba(0, 191, 165, 0.1)',
                border: '#00bfa5',
            },
            success: {
                bg: 'rgba(0, 200, 83, 0.1)',
                border: '#00c853',
            },
            question: {
                bg: 'rgba(100, 221, 23, 0.1)',
                border: '#64dd17',
            },
            warning: {
                bg: 'rgba(255, 145, 0, 0.1)',
                border: '#ff9100',
            },
            failure: {
                bg: 'rgba(255, 82, 82, 0.1)',
                border: '#ff5252',
            },
            danger: {
                bg: 'rgba(255, 23, 68, 0.1)',
                border: '#ff1744',
            },
            bug: {
                bg: 'rgba(245, 0, 87, 0.1)',
                border: '#f50057',
            },
            example: {
                bg: 'rgba(101, 31, 255, 0.1)',
                border: '#651fff',
            },
            quote: {
                bg: 'rgba(158, 158, 158, 0.1)',
                border: '#9e9e9e',
            },
        };

        const stylesheet = [`
            /* CONTAINER */
            .nge-md-admonition {
                margin: 1.5625em 0;
                overflow: hidden;
                font-size: 0.84rem;
                page-break-inside: avoid;
                border-radius: 0.1rem;
                box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.05), 0 0 0.05rem rgba(0, 0, 0, 0.1);

                --admonition--note: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z"/></svg>');
                --admonition--abstract: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 5h16v2H4V5m0 4h16v2H4V9m0 4h16v2H4v-2m0 4h10v2H4v-2z"/></svg>');
                --admonition--info: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z"/></svg>');
                --admonition--tip: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.55 11.2c-.23-.3-.5-.56-.76-.82-.65-.6-1.4-1.03-2.03-1.66C13.3 7.26 13 4.85 13.91 3c-.91.23-1.75.75-2.45 1.32-2.54 2.08-3.54 5.75-2.34 8.9.04.1.08.2.08.33 0 .22-.15.42-.35.5-.22.1-.46.04-.64-.12a.83.83 0 01-.15-.17c-1.1-1.43-1.28-3.48-.53-5.12C5.89 10 5 12.3 5.14 14.47c.04.5.1 1 .27 1.5.14.6.4 1.2.72 1.73 1.04 1.73 2.87 2.97 4.84 3.22 2.1.27 4.35-.12 5.96-1.6 1.8-1.66 2.45-4.32 1.5-6.6l-.13-.26c-.2-.46-.47-.87-.8-1.25l.05-.01m-3.1 6.3c-.28.24-.73.5-1.08.6-1.1.4-2.2-.16-2.87-.82 1.19-.28 1.89-1.16 2.09-2.05.17-.8-.14-1.46-.27-2.23-.12-.74-.1-1.37.18-2.06.17.38.37.76.6 1.06.76 1 1.95 1.44 2.2 2.8.04.14.06.28.06.43.03.82-.32 1.72-.92 2.27h.01z"/></svg>');
                --admonition--success: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2m-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>');
                --admonition--question: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.07 11.25l-.9.92C13.45 12.89 13 13.5 13 15h-2v-.5c0-1.11.45-2.11 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41a2 2 0 00-2-2 2 2 0 00-2 2H8a4 4 0 014-4 4 4 0 014 4 3.2 3.2 0 01-.93 2.25M13 19h-2v-2h2M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10c0-5.53-4.5-10-10-10z"/></svg>');
                --admonition--warning: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2 1 21z"/></svg>');
                --admonition--failure: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12 6.47 2 12 2m3.59 5L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41 15.59 7z"/></svg>');
                --admonition--danger: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.5 20l4.86-9.73H13V4l-5 9.73h3.5V20M12 2c2.75 0 5.1 1 7.05 2.95C21 6.9 22 9.25 22 12s-1 5.1-2.95 7.05C17.1 21 14.75 22 12 22s-5.1-1-7.05-2.95C3 17.1 2 14.75 2 12s1-5.1 2.95-7.05C6.9 3 9.25 2 12 2z"/></svg>');
                --admonition--bug: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 12h-4v-2h4m0 6h-4v-2h4m6-6h-2.81a5.985 5.985 0 00-1.82-1.96L17 4.41 15.59 3l-2.17 2.17a6.002 6.002 0 00-2.83 0L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8z"/></svg>');
                --admonition--example: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 13v-2h14v2H7m0 6v-2h14v2H7M7 7V5h14v2H7M3 8V5H2V4h2v4H3m-1 9v-1h3v4H2v-1h2v-.5H3v-1h1V17H2m2.25-7a.75.75 0 01.75.75c0 .2-.08.39-.21.52L3.12 13H5v1H2v-.92L4 11H2v-1h2.25z"/></svg>');
                --admonition--quote: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3l-2 4z"/></svg>');
                --admonition--chevron-right: url('data:image/svg+xml;:charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>');
                --admonition--chevron-down: url('data:image/svg+xml;:charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>');
            }

            /* TITLE */
            .nge-md-admonition-title {
                min-height: 24px;
                box-sizing: border-box;
                position: relative;
                display: flex;
                align-items: center;
                margin-top: 0 !important;
                margin-bottom: 0 !important;
                padding: 0.4rem 0.6rem 0.4rem 2rem;
                font-weight: 700;
                /*REMOVE DETAILS MARKER IN FIREFOX*/
                list-style-type: none;
            }
            .nge-md-admonition-title:focus {
                outline: none;
            }

            /* DETAILS MARKER */
            .nge-md-admonition-title::marker,
            .nge-md-admonition-title::-webkit-details-marker {
                display: none;
            }

            /* TITLE COLLAPSIBLE */

            details .nge-md-admonition-title {
                cursor: pointer;
            }
            details .nge-md-admonition-title:after {
                position: absolute;
                right: 0.6rem;
                width: 1rem;
                height: 1rem;
                -o-mask-image: var(--admonition--chevron-right);
                -webkit-mask-image: var(--admonition--chevron-right);
                mask-image: var(--admonition--chevron-right);
                content: "";
            }
            details[open] .nge-md-admonition-title:after {
                -o-mask-image: var(--admonition--chevron-down);
                -webkit-mask-image: var(--admonition--chevron-down);
                mask-image: var(--admonition--chevron-down);
            }

            /* CONTENT */
            .nge-md-admonition-content {
                padding: 0 0.6rem;
            }
        `];

        Object.keys(admonitions).forEach(type => {
            const map = admonitions[type];
            stylesheet.push(`
                .nge-md-admonition--${type} {
                    border-left: 0.2rem solid ${map.border};
                }
                .nge-md-admonition--${type} .nge-md-admonition-title {
                    background-color: ${map.bg};
                }
                .nge-md-admonition--${type} .nge-md-admonition-title:before,
                .nge-md-admonition--${type} .nge-md-admonition-title:after {
                    background-color: ${map.border};
                }
                .nge-md-admonition--${type} .nge-md-admonition-title:before {
                    position: absolute;
                    left: 0.6rem;
                    width: 1rem;
                    height: 1rem;
                    -o-mask-image: var(--admonition--${type});
                    -webkit-mask-image: var(--admonition--${type});
                    mask-image: var(--admonition--${type});
                    content: "";
                }
            `);
        });
        const style = document.createElement('style');
        style.setAttribute('nge-markdown-admonitions', '');
        style.innerHTML = stylesheet.join('\n');

        head.appendChild(style);
    }

    private createAdmonitions(transformer: NgeMarkdownTransformer) {
        transformer.addHtmlTransformer((element) => {
            const paragraphs = element.querySelectorAll('p');
            paragraphs.forEach((p) => {
                const text = p.innerHTML;
                const match = text.match(OPEN);
                if (match) {
                    const opener = match[1];
                    const type = match[2];
                    const title = (match[3] || '').trim();

                    const admonition = document.createElement('details');
                    if (opener.endsWith('+')) {
                        admonition.open = true;
                    }
                    admonition.className = 'nge-md-admonition nge-md-admonition--' + type;

                    const summary = document.createElement('summary');
                    summary.className = 'nge-md-admonition-title';
                    summary.innerHTML = title;

                    const content: HTMLElement[] = [];
                    admonition.appendChild(summary);

                    let node = p.nextElementSibling;
                    let opened = 1;
                    while (node) {
                        const innerHTML = node.innerHTML.trim();
                        if (innerHTML.match(OPEN)) {
                            opened++;
                        } else if (innerHTML.match(CLOSE)) {
                            opened--;
                            if (opened === 0) {
                                node.remove();
                                break;
                            }
                        }
                        content.push(node as HTMLElement);
                        node = node.nextElementSibling;
                    }

                    const div = document.createElement('div');
                    div.className = 'nge-md-admonition-content';
                    content.forEach((e) => div.appendChild(e));
                    admonition.appendChild(div);

                    p.parentElement?.insertBefore(admonition, p);
                    p.remove();
                }
            });
        });
    }

    private autoFixAdmonitionsSyntax(transformer: NgeMarkdownTransformer) {
        transformer.addMarkdownTransformer(markdown => {
            const lines = markdown.split('\n');
            const length = lines.length;
            let insideCodeBlock = false;
            for (let i = 0; i < length; i++) {
                const curr = lines[i];
                if (curr.startsWith('```')) {
                    insideCodeBlock = !insideCodeBlock;
                }
                if (insideCodeBlock) {
                    continue;
                }
                const prev = i > 0 ? lines[i - 1] : undefined;
                const next = i < length - 1 ? lines[i + 1] : undefined;
                if (curr.match(OPEN)) {
                    if (next?.trim()) {
                        lines[i] = curr + '\n';
                    }
                } else if (curr.match(CLOSE)) {
                    if (prev?.trim()) {
                        lines[i] = '\n' + curr;
                    }
                }
            }
            return lines.join('\n');
        });
    }

}

/**
 * Injection token to register `NgeMarkdownAdmonitions` contribution.
 */
export const NgeMarkdownAdmonitionsProvider: Provider = {
    provide: NGE_MARKDOWN_CONTRIBUTION,
    multi: true,
    useClass: NgeMarkdownAdmonitions,
};
