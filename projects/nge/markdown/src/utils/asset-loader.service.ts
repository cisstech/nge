import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { forkJoin, from, Observable } from 'rxjs';
import { concatMap, shareReplay, take } from 'rxjs/operators';

/**
 *  An array of [type, url, attributes] tuple where:
 *  - `type` is the type of an asset to load `script`| `style`
 *  - `url` is the url to a style/script to load
 *  - `attributes` is a map of optional attributes to add to the element.
 */
declare type Asset = [
    'style' | 'script', string, Record<string, string>?
];

class Request {
    private req?: Observable<Event>;

    constructor(
        private readonly asset: Asset,
        private readonly document: Document
    ) {}

    load() {
        if (this.asset[0] === 'style') {
            return this.loadStyle();
        }
        return this.loadScript();
    }

    private loadStyle() {
        if (this.req) {
            return this.req;
        }
        return this.req = new Observable<Event>((observer) => {
            const url = this.asset[1];
            const attributes = this.asset[2];
            const style: HTMLLinkElement = this.document.createElement('link');
            style.href = url;
            style.rel = 'stylesheet';
            if (attributes) {
                for (const key in attributes) {
                    if (attributes.hasOwnProperty(key)) {
                        style.setAttribute(key, attributes[key]);
                    }
                }
            }
            style.onload = (event: Event) => {
                observer.next(event);
                observer.complete();
            };
            style.onerror = (err) => {
                observer.error(err);
            };
            this.document.head.appendChild(style);
        }).pipe(
            take(1),
            shareReplay(1)
        );
    }

    private loadScript() {
        if (this.req) {
            return this.req;
        }
        return this.req = new Observable<Event>(observer => {
            const url = this.asset[1];
            const attributes = this.asset[2];
            const script: HTMLScriptElement = this.document.createElement('script');
            if (attributes) {
                for (const key in attributes) {
                    if (attributes.hasOwnProperty(key)) {
                        script.setAttribute(key, attributes[key]);
                    }
                }
            }
            script.onload = (event: Event) => {
                observer.next(event);
                observer.complete();
            };
            script.onerror = (err) => {
                observer.error(err);
            };
            script.src = url;
            this.document.head.appendChild(script);
        }).pipe(
            take(1),
            shareReplay(1)
        );
    }
}

// TODO extract to nge-core lib.

/**
 * Services that dynamically inject scripts and styles elements to the DOM.
 */
@Injectable({
    providedIn: 'root',
})
export class AssetLoaderService {
    private readonly requests: Record<string, Request> = {};

    constructor(
        @Inject(DOCUMENT)
        private document: any
    ) {}

    /**
     * Injects styles and scripts from given urls to the head of the DOM.
     * This method loads assets from same url once and the assets are
     * loaded in the same order that given.
     * @param assets Assets to load.
     */
    loadAllSync(assets: Asset[]) {
        const requests = this.createRequests(assets);
        return (from(requests).pipe(
            concatMap(e => e)
        ));
    }

    /**
     * Injects styles and scripts from given urls to target place in DOM
     * This method loads style and script from same url once.
     * @param assets Assets to load.
     */
    loadAllAsync(assets: Asset[]) {
        const loaders = this.createRequests(assets);
        return forkJoin(loaders);
    }

    private createRequests(assets: Asset[]) {
        return assets.map((asset) => {
            const url = asset[1];
            if (!(url in this.requests)) {
                this.requests[url] = new Request(asset, this.document);
            }
            return this.requests[url].load();
        });
    }
}
