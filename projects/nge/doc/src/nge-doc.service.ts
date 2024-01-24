import { Location } from '@angular/common';
import { Injectable, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, skip } from 'rxjs/operators';
import { NgeDocLink, NgeDocMeta, NgeDocState, extractNgeDocSettings } from './nge-doc';

@Injectable()
export class NgeDocService implements OnDestroy {
  private readonly state = new BehaviorSubject<NgeDocState>({
    meta: {
      root: '',
      name: '',
    },
    links: [],
    prevLink: undefined,
    nextLink: undefined,
    currLink: undefined,
  });

  private readonly pages = new Map<
    string,
    {
      meta: NgeDocMeta;
      links: NgeDocLink[];
    }
  >();

  private readonly links: NgeDocLink[] = [];

  private readonly subscriptions: Subscription[] = [];

  /** documentation state */
  get stateChanges() {
    return this.state.pipe(
      skip(1) // skip initial state
    )
  }

  constructor(
    private readonly router: Router,
    private readonly injector: Injector,
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.reset();
  }

  /**
   * Loads navigation from the router configuration.
   */
  async setup(): Promise<void> {
    this.reset();

    const { data } = this.activatedRoute.snapshot;
    const settings = extractNgeDocSettings(data);

    for (const setting of settings) {
      const links: NgeDocLink[] = [];

      let meta: NgeDocMeta | undefined;
      if (typeof setting.meta === 'function') {
        meta = await setting.meta(this.injector);
      } else {
        meta = setting.meta;
      }

      if (!meta) {
        throw new Error('[nge-doc]: Missing setting.meta');
      }

      for (const item of setting.pages) {
        const pages: NgeDocLink[] = [];

        let object: any;
        if (typeof item === 'function') {
          object = await item(this.injector);
        } else {
          object = item;
        }

        if (Array.isArray(object)) {
          pages.push(...object);
        } else {
          pages.push(object);
        }

        pages.forEach((page) => {
          links.push(page);
          this.resolvePageLinks(meta!, page);
        });

        this.pages.set(meta.root, {
          meta,
          links: links,
        });
      }
    }

    this.subscriptions.push(
      this.router.events
        .pipe(filter((e) => e instanceof NavigationEnd))
        .subscribe(this.onChangeRoute.bind(this))
    );

    this.onChangeRoute();
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

  private resolvePageLinks(meta: NgeDocMeta, page: NgeDocLink) {
    const createLink = (link: NgeDocLink, parent: string) => {
      link.href = this.join(parent, link.href);
      this.links.push(link);
      link.children?.forEach((child) => {
        createLink(child, link.href);
      });
    };
    createLink(page, meta.root);
  }

  private async onChangeRoute(): Promise<void> {
    if (!this.pages.size) {
      return;
    }

    const path = this.location.path();
    const paths = [path, path + '/'];

    let meta: NgeDocMeta | undefined;
    let links: NgeDocLink[] = [];

    for (const [k, v] of this.pages) {
      if (paths.some((path) => path.includes(k))) {
        meta = v.meta;
        links = v.links;
        break;
      }
    }

    if (!meta) {
      throw new Error('[nge-doc]: Unregisted page ' + path);
    }

    let { currLink, prevLink, nextLink } = this.state.value;

    // ignore same page navigation (fragment navigation)
    if (currLink && paths.includes(currLink.href)) {
      return;
    }

    // calculate current, previous and next links

    // https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
    const modulo = (a: number, n: number) => {
      return ((a % n) + n) % n;
    };

    for (let i = 0; i < this.links.length; i++) {
      const link = this.links[i];
      if (paths.includes(link.href)) {
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
      this.router.navigateByUrl(links[0].href, {
        replaceUrl: true,
      });
      return;
    }

    // navigate to first children if currLink doesn't have a renderer
    if (!currLink.renderer && currLink.children?.length) {
      this.router.navigateByUrl(currLink.children[0].href, {
        replaceUrl: true,
      });
      return;
    }

    // expand visible links

    this.links.forEach((link) => {
      if (paths.some((path) => path.startsWith(link.href))) {
        link.expanded = true;
      }
    });

    // notify state change

    this.state.next({
      meta,
      links,
      prevLink,
      currLink,
      nextLink,
    });
  }

  private reset(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.subscriptions.splice(0, this.subscriptions.length);
    this.pages.clear();
    this.links.splice(0, this.links.length);
  }
}
