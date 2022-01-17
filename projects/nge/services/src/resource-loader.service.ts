import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { forkJoin, from, Observable, of } from 'rxjs';
import { concatMap, shareReplay, take } from 'rxjs/operators';

/**
 *  An array of [type, url, attributes] tuple where:
 *  - `type` is the type of an asset to load `script`| `style`
 *  - `url` is the url to a style/script to load
 *  - `attributes` is a map of optional attributes to add to the element.
 */
declare type ResourceInfo = [
    'style' | 'script', string, Record<string, string>?
];

class LoadRequest {
    private request?: Observable<ResourceInfo>;
    private finished = false;

    get isFinished(): boolean {
        return this.finished;
    }

    constructor(
        private readonly asset: ResourceInfo,
        private readonly document: Document,
    ) { }

    run() {
        if (this.asset[0] === 'style') {
            return this.loadStyle();
        }
        return this.loadScript();
    }

    private loadStyle(): Observable<ResourceInfo> {
        return this.request ?? (this.request = new Observable<ResourceInfo>((observer) => {
            const url = this.asset[1];
            const style: HTMLLinkElement = this.document.createElement('link');
            style.href = url;
            style.rel = 'stylesheet';

            style.onload = () => {
                observer.next(this.asset);
                observer.complete();
                this.finished = true;
            };
            style.onerror = (err) => {
                observer.error(err);
                this.finished = true;
            };

            const attributes = this.asset[2];
            if (attributes) {
                for (const key in attributes) {
                    if (attributes.hasOwnProperty(key)) {
                        style.setAttribute(key, attributes[key]);
                    }
                }
            }
            this.document.head.appendChild(style);
        }).pipe(
            take(1),
            shareReplay(1)
        ));
    }

    private loadScript(): Observable<ResourceInfo> {
        return this.request ?? (this.request = new Observable<ResourceInfo>(observer => {
            const url = this.asset[1];
            const script: HTMLScriptElement = this.document.createElement('script');
            script.src = url;

            script.onload = () => {
                observer.next(this.asset);
                observer.complete();
                this.finished = true;
            };
            script.onerror = (err) => {
                observer.error(err);
                this.finished = true;
            };

            const attributes = this.asset[2];
            if (attributes) {
                for (const key in attributes) {
                    if (attributes.hasOwnProperty(key)) {
                        script.setAttribute(key, attributes[key]);
                    }
                }
            }

            this.document.head.appendChild(script);
        }).pipe(
            take(1),
            shareReplay(1)
        ));
    }
}

/**
 * Services that dynamically inject scripts and styles elements to the DOM.
 */
@Injectable({
    providedIn: 'root',
})
export class ResourceLoaderService {
    private readonly requests = new Map<string, LoadRequest>();

    constructor(
        @Inject(DOCUMENT)
        private document: any
    ) { }

    waitForPendings(): Promise<void> {
        return new Promise<void>((resolve) => {
            const interval = setInterval(() => {
                for (const request of this.requests.values()) {
                    if (!request.isFinished) {
                        return;
                    }
                }
                clearInterval(interval);
                resolve();
            }, 100);
        });
    }

    /**
     * Injects styles and scripts from given urls to the head of the DOM.
     * This method loads assets from same url once and the assets are
     * loaded in the same order that given.
     * @param resources Resources to load.
     */
    loadAllSync(resources: ResourceInfo[]): Observable<ResourceInfo[]> {
        if (!resources.length) {
            return of([]);
        }
        const requests = this.createRequests(resources);
        return new Observable<ResourceInfo[]>(observer => {
            const response: ResourceInfo[] = [];
            const subs = from(requests).pipe(concatMap(e => e.run())).subscribe(e => {
                response.push(e);
                if (response.length === resources.length) {
                    observer.next(response);
                    observer.complete();
                }
            });
            return () => {
                subs?.unsubscribe();
            };
        });
    }

    /**
     * Injects styles and scripts from given urls to target place in DOM
     * This method loads style and script from same url once.
     * @param resources Resources to load.
     */
    loadAllAsync(resources: ResourceInfo[]): Observable<ResourceInfo[]> {
        if (!resources.length) {
            return of([]);
        }
        const loaders = this.createRequests(resources);
        return forkJoin(loaders.map(e => e.run()));
    }

    private createRequests(resources: ResourceInfo[]): LoadRequest[] {
        return resources.map((asset) => {
            const url = asset[1];
            let request = this.requests.get(url);
            if (!request) {
                this.requests.set(url, request = new LoadRequest(asset, this.document));
            }
            return request;
        });
    }
}

