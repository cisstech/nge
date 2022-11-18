import { AfterViewInit, Directive, OnDestroy } from '@angular/core';
import { NgeElementService } from './nge-element.service';

// TODO make angular universal compatible using Renderer2

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'nge-element-detector, [nge-element-detector]',
})
export class NgeElementDetectorDirective implements AfterViewInit, OnDestroy {
  private observer?: MutationObserver;
  private listener?: () => void;

  constructor(private readonly elementService: NgeElementService) {}

  async ngAfterViewInit(): Promise<void> {
    let selectors = this.elementService.listUnloadeds();
    for (const selector of selectors) {
      const tags = document.getElementsByTagName(selector);
      if (tags?.length) {
        await this.elementService.loadElement(selector);
        selectors = selectors.filter((e) => e !== selector);
      }
    }

    this.addMutationObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.listener) {
      this.listener();
    }
  }

  private addMutationObserver(): void {
    const target = document.body;
    let unloadedTags = this.elementService.listUnloadeds();
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            unloadedTags = this.checkElementsInNode(node, unloadedTags);
          }
        });
      });
    });
    this.observer.observe(target, {
      subtree: true,
      childList: true,
    });
  }

  private checkElementsInNode(node: HTMLElement, unloadedTags: string[]) {
    if (!unloadedTags.length) {
      return unloadedTags;
    }

    const tagName = node.tagName.toLowerCase();
    if (unloadedTags.includes(tagName)) {
      unloadedTags = unloadedTags.filter((e) => e !== tagName);
      this.elementService.loadElement(tagName).catch(console.error);
    }

    for (const child of Array.from(node.childNodes)) {
      if (child instanceof HTMLElement) {
        unloadedTags = this.checkElementsInNode(child, unloadedTags);
      }
    }
    return unloadedTags;
  }
}
