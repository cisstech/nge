import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  ComponentRef,
  Injector,
  OnDestroy,
  OnInit,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
  inject
} from '@angular/core';
import { CompilerService } from '@cisstech/nge/services';
import { Subscription, firstValueFrom } from 'rxjs';
import { NGE_DOC_RENDERERS, NgeDocState } from '../nge-doc';
import { NgeDocService } from '../nge-doc.service';

@Component({
  selector: 'nge-doc-renderer',
  templateUrl: 'renderer.component.html',
  styleUrls: ['renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgeDocRendererComponent implements OnInit, OnDestroy {
  private readonly injector = inject(Injector);
  private readonly renderers = inject(NGE_DOC_RENDERERS);
  private readonly docService = inject(NgeDocService)
  private readonly compilerService = inject(CompilerService)
  private readonly changeDetectorRef = inject(ChangeDetectorRef)

  private subscriptions: Subscription[] = [];
  protected loading = false;
  protected noFound = false;
  protected componentRefByTypes = new Map<Type<any>, ComponentRef<any>>();

  componentRef?: ComponentRef<any>;

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;


  ngOnInit(): void {
    this.subscriptions.push(
      this.docService.stateChanges.subscribe(this.onChangeState.bind(this))
    );
  }

  ngOnDestroy(): void {
    this.clearViewContainer();
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private showLoading(): void {
    this.loading = true;

    // if loading is still true after 1s then we force change detection
    // This is useful to show the loading indicator only if the loading is not too fast
    // so that the loading indicator does not blink.
    setTimeout(() => {
      if (this.loading) {
        this.changeDetectorRef.markForCheck();
      }
    }, 1000);
  }

  private clearViewContainer(): void {
    const componentRefs = Array.from(this.componentRefByTypes.values());
    if (this.componentRef && componentRefs.includes(this.componentRef)) {
      while (this.container.length > 0) {
        this.container.detach()
      }
    } else {
      this.componentRef?.destroy();
      this.componentRef = undefined;
      this.container.clear();
    }
  }

  private async onChangeState(state: NgeDocState): Promise<void> {
    try {
      this.showLoading();
      this.clearViewContainer();
      if (state.currLink) {
        const renderer = await state.currLink.renderer;
        switch (typeof renderer) {
          case 'string':
            await this.renderMarkdown(renderer);
            break;
          case 'function':
            this.componentRef = await this.compilerService.render({
              type: await renderer(),
              inputs: state.currLink.inputs,
              container: this.container,
            });
            break;
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
      this.noFound = !this.componentRef;
      this.changeDetectorRef.markForCheck();
    }
  }


  private async renderMarkdown(data: string): Promise<void> {
    if (!this.renderers?.markdown) {
      throw new Error('[nge-doc]: missing markdown renderer.');
    }

    const renderer = this.renderers.markdown;
    const type = await renderer.component();

    const createInputs = async (): Promise<Record<string, any>> => {
      let inputs: Record<string, any> = {
        data, // we assume that data is a markdown content.
      };

      if (!data.includes('\n')) {
        // if data does not include at least two lines then it's an url
        const http = this.injector.get(HttpClient, null);
        if (!http) {
          throw new Error(
            '[nge-doc] When using the `file` renderer you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information'
          );
        }

        inputs = {
          data: await firstValueFrom(http.get(data, { responseType: 'text' })),
        };
      }

      let customInputs: Record<string, any> = {};
      if (typeof renderer.inputs === 'function') {
        customInputs = await renderer.inputs(this.injector);
      } else if (typeof renderer.inputs === 'object') {
        customInputs = renderer.inputs;
      }

      return { ...customInputs, ...inputs };
    }

    const markdownComponent = this.componentRefByTypes.get(type);
    if (markdownComponent) {
      this.attachComponent(markdownComponent, await createInputs());
      return;
    }

    const componentRef = await this.compilerService.render({
      type,
      inputs: await createInputs(),
      container: this.container,
    });

    this.componentRef = componentRef;
    this.componentRefByTypes.set(type, componentRef);
  }

  private async attachComponent(componentRef: ComponentRef<any>, inputs: Record<string, any>): Promise<void> {
    this.container.insert(componentRef.hostView);
    this.componentRef = componentRef;

    // compute changes
    const changes: SimpleChanges = {};
    const { instance, changeDetectorRef } = componentRef;
    Object.keys(inputs).forEach((key) => {
      changes[key] = {
        currentValue: inputs[key],
        previousValue: instance[key],
        firstChange: false,
        isFirstChange: () => false,
      };
      instance[key] = inputs[key];
    });

    // call ngOnChanges
    if (instance.ngOnChanges) {
      await instance.ngOnChanges(changes);
    }

    changeDetectorRef.markForCheck();
  }
}
