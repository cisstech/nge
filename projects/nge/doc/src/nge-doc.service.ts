import { Location } from '@angular/common';
import { Injectable, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgeDocSettings, NgeDocLink, NgeDocMeta, NgeDocState } from './nge-doc';

@Injectable()
export class NgeDocService implements OnDestroy {
    private readonly state = new BehaviorSubject<NgeDocState>({
        meta: {
            root: '',
            name: '',
        },
        links: [],
        pages: [],
        prevLink: undefined,
        nextLink: undefined,
        currLink: undefined,
    });

    private readonly pages: NgeDocLink[] = [];
    private readonly links: NgeDocLink[] = [];
    private readonly subscriptions: Subscription[] = [];

    /** documentation state */
    get stateChanges() {
        return this.state.asObservable();
    }

    constructor(
        private readonly router: Router,
        private readonly injector: Injector,
        private readonly location: Location,
        private readonly activatedRoute: ActivatedRoute,
    ) {}

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.subscriptions.splice(0, this.subscriptions.length);
        this.pages.splice(0, this.pages.length);
        this.links.splice(0, this.links.length);
    }

    /**
     * Loads navigation from the router configuration.
     */
    async setup(): Promise<void> {
        this.ngOnDestroy();

        const settings = this.activatedRoute.snapshot.data as NgeDocSettings;

        let meta: NgeDocMeta | undefined;
        if (typeof settings.meta === 'function') {
            meta = await settings.meta(this.injector);
        } else {
            meta = settings.meta;
        }

        if (!meta) {
            throw new Error('[nge-doc]: Missing settings.meta');
        }

        for (const page of settings.pages) {
            let linkOrLinkArray: NgeDocLink | NgeDocLink[] | undefined;
            let links: NgeDocLink[] = [];
            if (typeof page === 'function') {
                linkOrLinkArray = await page(this.injector);
            } else {
                linkOrLinkArray = page;
            }

            if (Array.isArray(linkOrLinkArray)) {
                links = links.concat(linkOrLinkArray);
            } else {
                links.push(linkOrLinkArray);
            }

            links.forEach(link => {
                this.createLinks(meta!, link);
                this.pages.push(link);
            });
        }

        this.subscriptions.push(
            this.router.events
                .pipe(filter((e) => e instanceof NavigationEnd))
                .subscribe(this.onChangeRoute.bind(this, meta))
        );

        this.onChangeRoute(meta);
    }

    /**
     * Checks whether the given `link` is active.
     * @param link The link to test.
     */
    isActive(link: NgeDocLink): boolean {
        const tree = this.location.path().split('/');
        for (let i = 0; i < tree.length; i++) {
            const path = tree.slice(0, tree.length - i).join('/');
            if (path && path.endsWith(link.href)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks whether the given `link` includes sub links.
     * @param link The link to test.
     */
    isExpandable(link: NgeDocLink): boolean {
        return !!link.children?.length;
    }

    private join(a: string, b: string): string {
        if (a.endsWith('/')) {
            a = a.slice(0, a.length - 1);
        }
        if (b.startsWith('/')) {
            b = b.slice(1);
        }
        return a + '/' + b;
    }

    private createLinks(meta: NgeDocMeta, page: NgeDocLink) {
        const createLink = (link: NgeDocLink, parent: string) => {
            link.href = this.join(parent, link.href);
            this.links.push(link);
            link.children?.forEach((child) => {
                createLink(child, link.href);
            });
        };
        createLink(page, meta.root);
    }

    private async onChangeRoute(meta: NgeDocMeta) {
        if (!this.pages.length) {
            return;
        }

        let {
            currLink,
            prevLink,
            nextLink,
        } = this.state.value;

        const path = this.location.path();
        if (path === currLink?.href) { // ignore same page navigation (fragment navigation)
            return;
        }

        // calculate current, previous and next links

        // https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
        const modulo = (a: number, n: number) => {
            return ((a % n) + n) % n;
        };

        for (let i = 0; i < this.links.length; i++) {
            const link = this.links[i];
            if (link.href === path) {
                const prevIndex = modulo(i - 1, this.links.length);
                const nextIndex = modulo(i + 1, this.links.length);
                currLink = link;
                nextLink = this.links[nextIndex];
                prevLink = this.links[prevIndex];
                break;
            }
        }

        // navigate to first page if currLink is not defined
        if (!currLink) {
            this.router.navigateByUrl(this.links[0].href, {
                replaceUrl: true
            });
            return;
        }

        // navigate to first children if currLink doesn't have a renderer
        if (!currLink.renderer && currLink.children?.length) {
            this.router.navigateByUrl(currLink.children[0].href, {
                replaceUrl: true
            });
            return;
        }

        // expand visible links

        this.links.forEach(link => {
            if (path.startsWith(link.href)) {
                link.expanded = true;
            }
        });

        // notify state change

        this.state.next({
            pages: this.pages,
            links: this.links,
            prevLink,
            currLink,
            nextLink,
            meta
        });

    }
}
