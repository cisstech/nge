import {
  Inject,
  Injectable,
  Injector,
  Optional
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CompilerService } from '@cisstech/nge/services';
import { Observable, from } from 'rxjs';
import { NGE_ELEMENTS, NgeElementDef } from './nge-element';

@Injectable({
  providedIn: 'root',
})
export class NgeElementService {
  private readonly registry = new Map<string, NgeElementDef>();
  private readonly defineds = new Set<string>();
  private readonly promises = new Map<string, Promise<void>>();

  constructor(
    private readonly injector: Injector,
    private readonly compiler: CompilerService,
    @Optional()
    @Inject(NGE_ELEMENTS)
    elements: NgeElementDef[]
  ) {
    elements?.forEach((route) => {
      this.registry.set(route.selector.trim().toLowerCase(), route);
    });
  }

  listUnloadeds(): string[] {
    return Array.from(this.registry.keys()).filter(
      (s) => !this.defineds.has(s)
    );
  }

  /**
   * Allows to lazy load a element given it's selector (i.e. tagname).
   * If the element selector has been registered, it's according module
   * will be fetched lazily
   * @param selector selector of the element to load.
   */
  loadElement(selector: string): Promise<void> {
    if (this.promises.has(selector)) {
      return this.promises.get(selector)!;
    }

    const definition = this.registry.get(selector);
    if (!definition) {
      throw new Error(
        `Unrecognized element "${selector}". Make sure it is registered in the registry`
      );
    }

    const promise = new Promise<void>(async (resolve, reject) => {
      try {
        const type = definition.module ? await definition.module() : definition.component ? await definition.component() : null;
        if (!type) {
          throw new Error(
            `No module or component found for element "${selector}`
          );
        }

        const { component, injector } = await this.compiler.resolveComponent(
          type,
          this.injector
        );

        const customElement = createCustomElement(component, { injector });

        customElements.define(selector, customElement);
        await customElements.whenDefined(selector);

        this.defineds.add(selector);

        resolve();
      } catch (error) {
        reject(error);
      }
    });

    this.promises.set(selector, promise);

    return promise;
  }

  loadElements(selectors: string[]): Observable<void[]> {
    selectors = selectors
      .map((e) => e.trim().toLowerCase())
      .filter((s) => this.registry.has(s));
    return from(Promise.all(selectors.map((s) => this.loadElement(s))));
  }
}
