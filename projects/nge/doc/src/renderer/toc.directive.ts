import { Location } from '@angular/common';
import {
    ComponentRef,
    Directive,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
} from '@angular/core';

@Directive({ selector: '[ngeDocToc]' })
export class NgeDocTocDirective implements OnDestroy, OnChanges {
    private readonly observer = new MutationObserver(() => {
        this.observer?.disconnect();
        this.buildToc();
    });

    private intersection?: IntersectionObserver;
    private anchors: HTMLElement[] = [];

    @Input('ngeDocToc')
    component?: ComponentRef<any>;

    constructor(
        private readonly el: ElementRef<HTMLElement>,
        private readonly location: Location
    ) { }

    ngOnDestroy(): void {
        this.intersection?.disconnect();
    }

    ngOnChanges(): void {
        this.buildToc();
    }

    private buildToc(): void {
        this.clear();

        if (!this.component) {
            return;
        }

        const componentNode = this.component.injector.get(
            ElementRef
        ).nativeElement as HTMLElement;

        const tocContainer = this.el.nativeElement;

        const h2Nodes = Array.from(
            componentNode.children
        ).filter((node) => node.tagName === 'H2');
        if (!h2Nodes.length) {
            return;
        }

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
            anchor.href = '#';
            anchor.href = this.location.path() + '#' + id;

            li.appendChild(anchor);
            ul.appendChild(li);

            h2.setAttribute('data-toc-id', id);
            li.setAttribute('data-toc-id', id);

            this.anchors.push(li);

            this.intersection?.observe(h2);
        });

        tocContainer.appendChild(ul);

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
        const tocContainer = this.el.nativeElement;
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
        const tocContainer = this.el.nativeElement;
        tocContainer.innerHTML = '';
        this.observer.disconnect();
        this.intersection?.disconnect();
        this.anchors = [];
    }
}
