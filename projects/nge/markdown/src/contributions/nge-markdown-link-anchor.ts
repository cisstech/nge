import { Location } from '@angular/common';
import {
    Injectable, Provider
} from '@angular/core';
import { Router } from '@angular/router';
import { NgeMarkdownTransformer } from '../nge-markdown-transformer';
import {
    NgeMarkdownContribution,
    NGE_MARKDOWN_CONTRIBUTION
} from '../nge-markdown-contribution';

/**
 * Contribution to handle fragment navigation in anchor elements.
 */
@Injectable()
export class NgeMarkdownLinkAnchor implements NgeMarkdownContribution {
    constructor(
        private readonly router: Router,
        private readonly location: Location,
    ) {}

    contribute(transformer: NgeMarkdownTransformer) {
        transformer.addRendererTransformer(renderer => {
            renderer.link = (href: string, _: string, text: string) => {
                const attributes = new Map<string, string>();
                if (href.startsWith('#')) {
                    href = this.location.path() + href;
                }
                attributes.set('href', href);

                // open in new tab if its a link external to the application
                const routes = (this.router.config || []).map(config => {
                    if (!config.path?.startsWith('/')) {
                        return '/' + config.path;
                    }
                    return config.path;
                });
                if (!routes.find(route => href.startsWith(route))) {
                    attributes.set('target', '_blank');
                }

                return `<a ${
                    Array.from(attributes.entries()).map(entry => {
                        return entry[0] + '=' + entry[1];
                    }).join(' ')
                }>${text}</a>`;
            };
            return renderer;
        });
    }
}

/**
 * Injection token to register `NgeMarkdownLinkAnchor` contribution.
 */
export const NgeMarkdownLinkAnchorProvider: Provider = {
    provide: NGE_MARKDOWN_CONTRIBUTION,
    multi: true,
    useClass: NgeMarkdownLinkAnchor,
};
