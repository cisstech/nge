import { Injectable, Provider } from '@angular/core';
import { NgeMarkdownTransformer } from '../nge-markdown-transformer';
import {
    NgeMarkdownContribution,
    NGE_MARKDOWN_CONTRIBUTION
} from '../nge-markdown-contribution';

/**
 * Contribution to use icons in markdown library using https://icongr.am/.
 */
@Injectable()
export class NgeMarkdownIcons implements NgeMarkdownContribution {
    contribute(transformer: NgeMarkdownTransformer) {
        transformer.addMarkdownTransformer(markdown => {
            const pattern = /@(\w+)\s+([\w-]+)((\s+(?:color|size)=[^\s]+)*?)?@/gm;
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
                lines[i] = lines[i].replace(pattern, (_: string, type: string,  name: string, params?: string) => {
                    params = (params ?? '')
                        .trim()
                        .split(' ')
                        .filter(e => e.trim())
                        .join('&');
                    params = params ? '?' + params : '';
                    return `<img src="https://icongr.am/${type.trim()}/${name.trim()}.svg${params}"/>`;
                });
            }
            return lines.join('\n');
        });
    }
}

/**
 * Injection token to register `NgeMarkdownIcons` contribution.
 */
export const NgeMarkdownIconsProvider: Provider = {
    provide: NGE_MARKDOWN_CONTRIBUTION,
    multi: true,
    useClass: NgeMarkdownIcons,
};
