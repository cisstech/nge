import { Location } from '@angular/common';
import {
    ComponentRef,
    Directive,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { Subscription } from 'rxjs';

@Directive({ selector: '[ngeDocToc]' })
export class NgeDocTocDirective implements OnDestroy, OnChanges {
    private readonly subscriptions: Subscription[] = [];
    private readonly observer = new MutationObserver(() => {
        this.observer?.disconnect();
        this.build();
    });

    private intersection?: IntersectionObserver;
    private anchors: HTMLElement[] = [];

    @Input('ngeDocToc')
    component?: ComponentRef<any>;

    constructor(
        private readonly router: Router,
        private readonly location: Location,
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly activatedRoute: ActivatedRoute,
    ) {
        this.subscriptions.push(
            this.router.events.subscribe(event => {
                if (event instanceof Scroll && event.anchor) {
                    this.scroll(event.anchor);
                }
            })
        )
    }

    ngOnDestroy(): void {
        this.intersection?.disconnect();
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    ngOnChanges(): void {
        this.build();
    }

    private build(): void {
        this.clear();

        if (!this.component) {
            return;
        }

        const componentNode = this.component.injector.get(
            ElementRef
        ).nativeElement as HTMLElement;

        const tocContainer = this.elementRef.nativeElement;

        const h2Nodes = Array.from(
            componentNode.children
        ).filter((node) => {
            return node.tagName === 'H2' && node.parentNode?.isSameNode(componentNode);
        });

        this.detectIntersection();

        const ul = document.createElement('ul');
        h2Nodes.forEach((h2) => {
            const id = this.dashify(h2.textContent || '');
            const target = document.createElement('span');
            target.id = id;
            h2.insertAdjacentElement('afterend', target);

            const li = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.innerHTML = h2.innerHTML;
            // .substring(1) will remove the leading / (prevent errors when baseHref is defined in index.html)
            anchor.href = this.location.path().substring(1) + '#' + id;

            li.appendChild(anchor);
            ul.appendChild(li);

            h2.setAttribute('data-toc-id', id);
            li.setAttribute('data-toc-id', id);

            this.anchors.push(li);

            this.intersection?.observe(h2);
        });

        tocContainer.appendChild(ul);

        const { fragment } = this.activatedRoute.snapshot;
        if (fragment) {
            this.scroll(fragment);
        }

        this.observer.observe(componentNode, {
            childList: true,
            subtree: true,
        });
    }

    private dashify(input: string): string {
        return input
            .trim()
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/\W/g, (m) => (/[À-ž]/.test(m) ? m : '-'))
            .replace(/^-+|-+$/g, '')
            .replace(/-{2,}/g, (m) => '-') // Condense multiple consecutive dashes to one.
            .toLowerCase();
    }

    private detectIntersection(): void {
        const tocContainer = this.elementRef.nativeElement;
        const rect = tocContainer.getBoundingClientRect();
        const bottom = -window.innerHeight + rect.y + 200;

        this.intersection?.disconnect();
        this.intersection = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.anchors.forEach((anchor) => {
                            anchor.classList.remove('active');
                            const a = anchor.getAttribute('data-toc-id');
                            const b = entry.target.getAttribute('data-toc-id');
                            if (a === b) {
                                anchor.classList.add('active');
                            }
                        });
                    }
                });
            },
            {
                // A BOX OF 200px STARTING AT THE POSITION OF THE TOC ELEMENT
                rootMargin: `0px 0px ${bottom}px 0px`,
            }
        );
    }

    private clear(): void {
        const tocContainer = this.elementRef.nativeElement;
        tocContainer.innerHTML = '';
        this.observer.disconnect();
        this.intersection?.disconnect();
        this.anchors = [];
    }

    private scroll(query: string): void {
        const targetElement = document.querySelector(`h2[data-toc-id="${query}"]`);
        if (!targetElement) {
            window.scrollTo(0, 0);
        } else if (!this.isInViewport(targetElement)) {
            targetElement.scrollIntoView();
        }
    }

    private isInViewport(elem: any): boolean {
        const bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
}
