import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, from, of } from 'rxjs';
import { concatMap, shareReplay, take } from 'rxjs/operators';

export class ResourceLoaderConfig  {
  /**
   * If true, the document.baseURI will be used to build the url of the resource to load if the url is relative.
   */
  useDocumentBaseURI?: boolean
}


/**
 *  An array of [type, url, attributes] tuple where:
 *  - `type` is the type of an asset to load `script`| `style`
 *  - `url` is the url to a style/script to load
 *  - `attributes` is a map of optional attributes to add to the element.
 */
declare type ResourceInfo = [
  'style' | 'script',
  string,
  Record<string, string>?
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
    private readonly config?: ResourceLoaderConfig | null
  ) {}

  run() {
    if (this.asset[0] === 'style') {
      return this.loadStyle();
    }
    return this.loadScript();
  }

  private loadStyle(): Observable<ResourceInfo> {
    return (
      this.request ??
      (this.request = new Observable<ResourceInfo>((observer) => {
        const url = this.buildUrl(this.asset[1]);
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
      }).pipe(take(1), shareReplay(1)))
    );
  }

  private loadScript(): Observable<ResourceInfo> {
    return (
      this.request ??
      (this.request = new Observable<ResourceInfo>((observer) => {
        const url = this.buildUrl(this.asset[1]);
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
      }).pipe(take(1), shareReplay(1)))
    );
  }

  private buildUrl(url: string) {
    if (!this.config?.useDocumentBaseURI) {
      return url
    }

    if ( url.startsWith('http')) {
      return url
    }

    if (!url.startsWith(document.baseURI)) {
      url = url.startsWith('/') ? url.slice(1) : url
      console.log('BUILD URL', document.baseURI, url)
      return document.baseURI + url
    }

    return url
  }
}

/**
 * Services that dynamically inject scripts and styles elements to the DOM.
 */
@Injectable({
  providedIn: 'root',
})
export class ResourceLoaderService {
  private readonly document = inject(DOCUMENT)
  private readonly config = inject(ResourceLoaderConfig, { optional: true })
  private readonly requests = new Map<string, LoadRequest>();


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
    return new Observable<ResourceInfo[]>((observer) => {
      const response: ResourceInfo[] = [];
      const subs = from(requests)
        .pipe(concatMap((e) => e.run()))
        .subscribe((e) => {
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
    return forkJoin(loaders.map((e) => e.run()));
  }

  private createRequests(resources: ResourceInfo[]): LoadRequest[] {
    return resources.map((asset) => {
      const url = asset[1];
      let request = this.requests.get(url);
      if (!request) {
        this.requests.set(
          url,
          (request = new LoadRequest(asset, this.document, this.config))
        );
      }
      return request;
    });
  }
}
