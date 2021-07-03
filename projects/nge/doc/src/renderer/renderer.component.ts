import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
    Component,
    ComponentRef,
    Injector,
    OnDestroy,
    OnInit,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgeDocState, NGE_DOC_RENDERERS } from '../nge-doc';
import { NgeDocService } from '../nge-doc.service';
import { RendererService } from './renderer.service';

@Component({
    selector: 'nge-doc-renderer',
    templateUrl: 'renderer.component.html',
    styleUrls: ['renderer.component.scss'],
    providers: [RendererService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgeDocRendererComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private markdownRenderer?: Type<any>;

    @ViewChild('container', { read: ViewContainerRef, static: true })
    container!: ViewContainerRef;

    loading = false;
    component?: ComponentRef<any>;

    get notFound(): boolean {
        return !this.loading && !this.component;
    }

    constructor(
        private readonly injector: Injector,
        private readonly docService: NgeDocService,
        private readonly rendererService: RendererService,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.subscriptions.push(
            this.docService.stateChanges.subscribe(
                this.onChangeState.bind(this)
            )
        );
    }

    ngOnDestroy(): void {
        this.clearViewContainer();
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    private async onChangeState(state: NgeDocState): Promise<void> {
        this.clearViewContainer();
        try {
            let component: ComponentRef<any> | undefined;
            if (state.currLink) {
                const renderer = await state.currLink.renderer;
                switch (typeof renderer) {
                    case 'string':
                        component = await this.rendererMarkdown(renderer);
                        break;
                    case 'function':
                        component = await this.rendererService.render({
                            type: await renderer(),
                            inputs: state.currLink.inputs,
                            container: this.container,
                        });
                        break;
                }
            }

            this.component = component;
        } catch (error) {
            console.error(error);
        } finally {
            this.loading = false;
            this.changeDetectorRef.markForCheck();
        }
    }

    private async rendererMarkdown(data: string): Promise<ComponentRef<any>> {
        const renderers = this.injector.get(NGE_DOC_RENDERERS);
        if (!renderers?.markdown) {
            throw new Error(
                '[nge-doc]: missing markdown renderer.'
            );
        }

        const renderer = renderers.markdown;
        let inputs: Record<string, any> = {
            data // we assume that data is a markdown content.
        };

        if (!data.includes('\n')) { // if data does not include at least two lines then it's an url
            const http = this.injector.get(HttpClient, null);
            if (!http) {
                throw new Error(
                    '[nge-doc] When using the `file` renderer you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information'
                );
            }

            inputs = {
                data: await http.get(data, { responseType: 'text' }).toPromise()
            };
        }

        let customInputs: Record<string, any> = {};
        if (typeof renderer.inputs === 'function') {
            customInputs = await renderer.inputs(this.injector);
        } else if (typeof renderer.inputs === 'object') {
            customInputs = renderer.inputs;
        }

        if (!this.markdownRenderer) {
            this.markdownRenderer = await renderer.component();
        }

        return await this.rendererService.render({
            inputs: {
                ...customInputs,
                ...inputs,
            },
            type: this.markdownRenderer,
            container: this.container
        });
    }

    private clearViewContainer(): void {
        this.component?.destroy();
        this.component = undefined;
        this.container.clear();
        this.loading = true;
        this.changeDetectorRef.markForCheck();
    }
}
