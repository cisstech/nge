import { FlatTreeControl } from '@angular/cdk/tree';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {
    MatTreeFlatDataSource,
    MatTreeFlattener,
} from '@angular/material/tree';
import { Subscription } from 'rxjs';
import { CURRENT_VISIBLE_TREES } from './internal';
import { TreeNodeDirective } from './tree-node.directive';
import {
    ITree,
    ITreeAdapter,
    ITreeFilter,
    ITreeState,
    TreeFilter,
    ITreeNodeHolder,
    ITreeEdition,
} from './tree.model';

/**
 * Representation of a node
 * T => data
 * string => id of a node
 * Element => dom element of a node
 * NodeWrapper<T> internal representation
 */
declare type Node<T> = T | string | Element | ITreeNodeHolder<T>;

@Component({
    selector: 'ui-tree',
    templateUrl: 'tree.component.html',
    styleUrls: ['tree.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent<T> implements ITree<T>, OnInit, OnChanges, OnDestroy {
    private readonly DATA_TREE_NODE_ID = 'data-tree-node-id';
    private readonly hiddenNodes = new Map<string, boolean>();
    private readonly selectedNodes = new Map<string, ITreeNodeHolder<T>>();

    private readonly subscriptions: Subscription[] = [];
    private readonly flattener: MatTreeFlattener<T, ITreeNodeHolder<T>>;

    private isEmpty = false;
    private isTreeFocused = false;
    private isShiftKeyPressed = false;

    private currentFocus?: ITreeNodeHolder<T>;

    readonly filter: ITreeFilter = new TreeFilter();
    readonly controler: FlatTreeControl<ITreeNodeHolder<T>>;
    readonly dataSource: MatTreeFlatDataSource<T, ITreeNodeHolder<T>>;

    readonly editing: Partial<ITreeEdition<T>> = {
        text: '',
        node: undefined,
    };

    @ContentChild(TreeNodeDirective, { static: true })
    nodeDirective!: TreeNodeDirective<T>;

    @Input() nodes: T[] = [];
    @Input() adapter!: ITreeAdapter<T>;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {
        this.controler = new FlatTreeControl<ITreeNodeHolder<T>>(
            (node) => node.level,
            (node) => node.expandable
        );

        this.flattener = new MatTreeFlattener<T, ITreeNodeHolder<T>>(
            (node, level) => this.transformer(node, level),
            (node) => node.level,
            (node) => node.expandable,
            (node) => this.children(node)
        );

        this.dataSource = new MatTreeFlatDataSource(
            this.controler,
            this.flattener
        );
    }

    ngOnInit() {
        if (!this.adapter.id?.trim()) {
            throw new Error('@Input() adapter.id is required !');
        }

        CURRENT_VISIBLE_TREES.set(
            this.adapter.id,
            this
        );
    }

    ngOnChanges() {
        if (!this.adapter) {
            throw new Error('@Input() adapter is required !');
        }

        if (!this.adapter.id?.trim()) {
            throw new Error('@Input() adapter.id is required !');
        }

        if (!this.adapter.idProvider) {
            throw new Error('@Input() adapter.idProvider is required !');
        }

        if (!this.adapter.nameProvider) {
            throw new Error('@Input() adapter.nameProvider is required !');
        }

        if (!this.adapter.childrenProvider) {
            throw new Error('@Input() adapter.childrenProvider is required !');
        }

        if (!this.adapter.isExpandable) {
            throw new Error('@Input() adapter.isExpandable is required !');
        }

        if (!this.nodes) {
            this.nodes = [];
        }

        this.render(this.nodes);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
        if (this.adapter?.id) {
            CURRENT_VISIBLE_TREES.delete(this.adapter.id);
        }
    }

    //#region API

    selections(): T[] {
        return Array.from(this.selectedNodes.values()).map((e) => e.data);
    }

    focusedNode(): T | undefined {
        return this.currentFocus?.data;
    }

    isEditing(node: Node<T>): boolean {
        if (node == null) {
            throw new ReferenceError('Argument "node" is required.');
        }

        if (!this.editing?.node) {
            return false;
        }

        return this.findHolder(node)?.id === this.adapter.idProvider(this.editing.node);
    }

    isFocused(node: Node<T>): boolean {
        if (node == null) {
            throw new ReferenceError('Argument "node" is required.');
        }

        if (!this.currentFocus) {
            return false;
        }

        return this.findHolder(node)?.id === this.currentFocus.id;
    }

    isExpanded(node: Node<T>): boolean {
        if (node == null) {
            throw new ReferenceError('Argument "node" is required.');
        }

        const holder = this.findHolder(node);
        if (!holder?.expandable) {
            return false;
        }

        return this.controler.isExpanded(holder);
    }

    isSelected(node: Node<T>): boolean {
        if (node == null) {
            throw new ReferenceError('Argument "node" is required.');
        }
        const holder = this.findHolder(node);
        if (!holder) {
            return false;
        }

        return this.selectedNodes.has(holder.id);
    }

    focus(node?: Node<T>): void {
        if (this.currentFocus) {
            this.unselect(this.currentFocus);
            this.currentFocus = undefined;
        }

        if (node) {
            const holder = this.findHolder(node);
            if (holder) {
                this.currentFocus = holder;
                this.select(node);
                this.scrollInto(holder);
            }
        }

        this.changeDetectorRef.detectChanges();
    }

    expand(node: Node<T>): void {
        if (!node) {
            throw new ReferenceError('Argument "node" is required.');
        }

        const expandTop = (holder?: ITreeNodeHolder<T>) => {
            if (!holder) {
                return;
            }

            if (this.controler.isExpandable(holder)) {
                this.controler.expand(holder);
                if (this.adapter.onDidExpand) {
                    this.adapter.onDidExpand(holder.data);
                }
            }

            const parent = this.findParentHolder(holder);
            if (parent && parent.level >= 0) {
                expandTop(parent);
            }
        };

        expandTop(this.findHolder(node));

        this.changeDetectorRef.detectChanges();
    }

    expandAll(): void {
        this.controler.expandAll();
        this.changeDetectorRef.detectChanges();
    }

    collapse(node: Node<T>): void {
        if (!node) {
            throw new ReferenceError('Argument "node" is required.');
        }

        const holder = this.findHolder(node);
        if (holder && this.controler.isExpandable(holder)) {
            this.controler.collapse(holder);
            if (this.adapter.onDidCollapse) {
                this.adapter.onDidCollapse(holder.data);
            }
        }

        this.changeDetectorRef.detectChanges();
    }

    collapseAll(): void {
        this.controler.collapseAll();
        this.changeDetectorRef.detectChanges();
    }

    toggle(node: Node<T>): void {
        if (!node) {
            throw new ReferenceError('Argument "node" is required.');
        }

        const holder = this.findHolder(node);
        if (holder?.expandable) {
            this.controler.toggle(holder);
            this.changeDetectorRef.detectChanges();
        }
    }

    startEdition(node: Node<T>): void {
        if (!node) {
            throw new ReferenceError('Argument "node" is required.');
        }

        const holder = this.findHolder(node);
        if (holder) {
            this.unselectAll();
            this.editing.node = holder.data;
            this.editing.text = holder.name;
        }

        this.changeDetectorRef.detectChanges();
    }

    endEdition(): void {
        this.editing.text = '';
        this.editing.node = undefined;
        this.changeDetectorRef.detectChanges();
    }

    search(filter: ITreeFilter) {
        function escape(text: string) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        }
        try {
            this.filter.term = (filter.term || '').trim();
            let pattern: RegExp | undefined;
            if (filter.term) {
                pattern = new RegExp(`(${escape(filter.term)})`, 'g');
            }

            this.collapseAll();
            this.unselectAll();

            // clear hiddens and render all the tree to init treeControl.dataNodes
            this.hiddenNodes.clear();
            this.render(this.nodes);

            if (filter.term) {
                const nodes = this.controler.dataNodes;
                const length = nodes.length;
                const matchedNodes: string[] = [];
                for (let i = length - 1; i >= 0; i--) {
                    const node = nodes[i];
                    if (pattern && node.id.toLowerCase().match(pattern)) {
                        matchedNodes.push(node.id);
                        continue;
                    }

                    if (!matchedNodes.find((id) => id.startsWith(node.id))) {
                        this.hiddenNodes.set(node.id, true);
                    }
                }

                this.render(
                    this.nodes.filter((e) => {
                        return !this.hiddenNodes.has(
                            this.adapter.idProvider(e)
                        );
                    })
                );

                this.expandAll();
            }
        } catch {
            this.render(this.nodes);
        }
    }

    saveState(): ITreeState {
        const { term } = this.filter;
        const dataNodes = this.controler.dataNodes || [];
        const state: ITreeState = {
            filter: { term },
            active: this.currentFocus ? this.currentFocus.id : '',
            expandedNodes: dataNodes.filter(e => {
                return this.controler.isExpanded(e)
            }).map(e => e.id),
        };
        return state;
    }

    restoreState(state: ITreeState): void {
        state = state || {
            active: '',
            filter: new TreeFilter(),
            expandedNodes: [],
        };

        state.active = state.active || '';
        state.filter = state.filter || new TreeFilter();
        state.expandedNodes = state.expandedNodes || [];

        const { active, filter, expandedNodes } = state;

        if (filter.term) {
            this.search(filter);
        } else {
            expandedNodes.forEach((node) => {
                this.expand(node);
            });
        }

        if (active) {
            const activeNode = this.findHolder(active);
            if (activeNode) {
                this.focus(activeNode);
            }
        }

    }

    //#endregion

    //#region CALLED FROM TEMPLATE

    _trackById(_: number, e: ITreeNodeHolder<T>) {
        return e.id;
    }

    _onEdit(event: FocusEvent | KeyboardEvent) {
        if (this.adapter.onDidEditName) {
            event.stopPropagation();

            const { node, text } = this.editing;
            if (!node) {
                throw new Error('There is no focused node.');
            }

            const isBlur = event instanceof FocusEvent && event.type === 'blur';
            const isEnter = event instanceof KeyboardEvent && event.key === 'Enter';
            const isEscape = event instanceof KeyboardEvent && event.key === 'Escape';

            if (isEscape) {
                this.endEdition();
            } else if (isBlur || isEnter) {
                event.preventDefault();
                const name = text?.trim() || '';
                try {
                    if (name) {
                        this.adapter.onDidEditName({
                            node: node,
                            text: name,
                        });
                    }
                } finally {
                    this.endEdition();
                }
            }
        }
    }

    _clearFilter() {
        this.search({
            term: ''
        });
    }

    //#endregion

    //#region EVENTS

    @HostListener('document:keyup', ['$event'])
    keyup($event: KeyboardEvent) {
        this.isShiftKeyPressed = $event.shiftKey;
    }

    @HostListener('document:keydown', ['$event'])
    keydown($event: KeyboardEvent) {
        this.isShiftKeyPressed = $event.shiftKey;
        if (this.isTreeFocused) {
            this.onKeyDown($event);
        }
    }

    @HostListener('document:click', ['$event'])
    mousedown($event: MouseEvent) {
        this.changeDetectorRef.detach();
        if (this.isTreeContainsEvent($event)) {
            this.changeDetectorRef.reattach();
            const node = this.findHolderFromEvent($event);
            if (!node) {
                return;
            }

            this.onMouseDown($event, node);
        }
    }

    @HostListener('document:contextmenu', ['$event'])
    contextmenu($event: MouseEvent) {
        if (this.isTreeContainsEvent($event)) {
            this.onContextMenu($event);
        }
    }

    private onKeyDown(event: FocusEvent | KeyboardEvent): void {
        const focus = this.currentFocus;
        if (!this.isShiftKeyPressed) {
            this.unselectAll();
        }
        this.focus(focus);

        if (!this.currentFocus && !this.isEmpty) {
            this.focus(this.controler.dataNodes[0]);
        }

        const element = this.currentFocus
            ? this.domNode(this.currentFocus)
            : undefined;

        if (!(event instanceof KeyboardEvent)) {
            return;
        }

        if (element && this.currentFocus) {
            switch (event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    event.stopPropagation();
                    this.navigate(element, 'up');
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    event.stopPropagation();
                    this.navigate(element, 'down');
                    break;
                case 'ArrowLeft':
                    if (!this.isShiftKeyPressed) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.collapse(this.currentFocus);
                    }
                    break;
                case 'ArrowRight':
                    if (!this.isShiftKeyPressed) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.expand(this.currentFocus);
                    }
                    break;
                default:
                    this.triggerKeyboardEvent(event);
                    this.triggerFilterEvent(event);
                    break;
            }
        } else {
            this.triggerFilterEvent(event);
        }

        if (event.key === 'Backspace') {
            // prevent browser to navigate back if Backspace is pressed
            event.preventDefault();
        }
    }

    private onMouseDown(event: MouseEvent, node: ITreeNodeHolder<T>): void {
        if (this.isShiftKeyPressed) {
            // select all nodes between the focused and the target node.
            if (!this.currentFocus) {
                this.focus(node);
                return;
            }

            const domStart = this.domNode(this.currentFocus);
            if (!domStart) {
                this.select(node);
                return;
            }

            let cursor = domStart;
            this.unselectAll();

            const domEnd = this.domNode(node);
            if (!domEnd) {
                return;
            }

            // tslint:disable-next-line: no-non-null-assertion
            const y2 = domEnd.getClientRects().item(0)!.top;
            // tslint:disable-next-line: no-non-null-assertion
            const y1 = domStart.getClientRects().item(0)!.top;
            if (y1 < y2) {
                // traverse down
                do {
                    this.select(cursor);
                    cursor = cursor.nextElementSibling as HTMLElement;
                } while (cursor && !cursor.isEqualNode(domEnd));
            } else if (y1 > y2) {
                // traverse up
                do {
                    this.select(domStart);
                    cursor = cursor.previousElementSibling as HTMLElement;
                } while (cursor && !cursor.isEqualNode(domEnd));
            }
            this.select(domEnd);
        } else {
            this.unselectAll();
            this.toggle(node.data);
            this.focus(node);
            const { actions } = this.adapter;
            if (actions?.mouse?.click) {
                actions.mouse.click({
                    node: node.data,
                    event: event,
                });
            }
        }
    }

    private onContextMenu(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        const node = this.findHolderFromEvent(e);
        if (node) {
            if (!this.isSelected(node)) {
                this.unselectAll();
            }
            this.focus(node);
        }

        const { actions } = this.adapter;
        if (actions?.mouse?.rightClick) {
            actions.mouse.rightClick({
                node: node?.data,
                event: e,
            });
        }
    }

    private isTreeContainsEvent(event: Event): boolean {
        return (this.isTreeFocused = this.elementRef.nativeElement.contains(
            event.target
        ));
    }

    private triggerFilterEvent(e: KeyboardEvent) {
        if (e.defaultPrevented || !this.adapter.enableKeyboardFiltering) {
            return;
        }

        // prevent browser to navigate back if Backspace is pressed
        e.preventDefault();
        e.stopPropagation();

        const updateTerm = (val: string) => {
            this.filter.term = val;
            this.search(this.filter);
        };

        const { term } = this.filter;
        switch (e.key) {
            case 'Backspace':
                if (term) {
                    updateTerm(term.slice(0, -1));
                }
                break;
            case ' ':
            case 'Tab':
                break;
            default:
                if (e.key.length === 1) {
                    updateTerm(term + e.key);
                }
                break;
        }
    }

    private triggerKeyboardEvent(event: KeyboardEvent): void {
        if (!this.currentFocus) {
            return;
        }

        const { actions } = this.adapter;
        if (actions) {
            const { keys } = actions;
            if (keys) {
                const action = keys[event.key];
                if (action) {
                    action({
                        event: event,
                        node: this.currentFocus.data,
                    });
                }
            }
        }
    }

    //#endregion

    //#region PRIVATE

    /**
     * Updates the nodes of the tree and render it.
     * @param nodes The new nodes of the tree.
     */
    private render(nodes: T[]): void {
        this.unselectAll();

        this.dataSource.data = nodes;
        this.changeDetectorRef.detectChanges();

        const { dataNodes } = this.controler;

        // TODO
        // https://github.com/angular/components/issues/11381#issuecomment-393534949
        // const data = this.dataSource.data;
        // this.dataSource.data = [];
        // this.dataSource.data = data;
        // this.changeDetectorRef.detectChanges();

        this.isEmpty = !dataNodes?.length;
    }

    /**
     * Gets the dom element associated to the given node.
     * @param e A node.
     */
    private domNode(e: Node<T>): HTMLElement | null {
        const node = this.findHolder(e);
        if (!node) {
            throw new Error(e + ' is not a registered node');
        }
        return document.querySelector(
            `[${this.DATA_TREE_NODE_ID}="${node.id}"]`
        );
    }

    /**
     * Adds the given node to the selected nodes.
     * @param e The node to select.
     */
    private select(e: Node<T>): void {
        const node = this.findHolder(e);
        if (!node) {
            throw new Error(e + ' is not a registered node');
        }

        if (!this.selectedNodes.has(node.id)) {
            this.selectedNodes.set(node.id, node);
        }

        this.changeDetectorRef.detectChanges();
    }

    /**
     * Removes the given node to the selected nodes.
     * @param e The node to unselect.
     */
    private unselect(e: Node<T>): void {
        const node = this.findHolder(e);
        if (!node) {
            throw new Error(e + ' is not a registered node');
        }
        this.selectedNodes.delete(node.id);
        this.changeDetectorRef.detectChanges();
    }

    /**
     * Clears the selected nodes.
     */
    private unselectAll(): void {
        this.currentFocus = undefined;
        this.selectedNodes.clear();
        this.changeDetectorRef.detectChanges();
    }

    /**
     * Moves the scrollbar to the given node.
     * @param e The node to show.
     */
    private scrollInto(e: Node<T>) {
        const node = this.findHolder(e);
        if (!node) {
            throw new Error(e + ' is not a registered node');
        }

        const element = this.domNode(node);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
        }
    }

    /**
     * Focus the node before of after `currEl` depending on the given `direction`.
     * @param currEl Current element
     * @param direction Navigation direction.
     */
    private navigate(currEl: Element, direction: 'up' | 'down'): void {
        const currNode = this.findHolderFromElement(currEl);
        if (!currNode) {
            return;
        }

        const prevEl = currEl.previousElementSibling;
        const nextEl = currEl.nextElementSibling;
        const targEl = direction === 'up' ? prevEl : nextEl;
        if (!targEl) {
            return;
        }

        const targNode = this.findHolderFromElement(targEl);
        if (!targNode) {
            this.focus(currNode);
            return;
        }

        const prevNode: ITreeNodeHolder<T> | undefined = prevEl
            ? this.findHolderFromElement(prevEl)
            : undefined;

        if (prevNode && this.isSelected(prevNode) && targEl.isEqualNode(prevEl)) {
            this.unselect(currNode);
        }

        const nextNode: ITreeNodeHolder<T> | undefined = nextEl
            ? this.findHolderFromElement(nextEl)
            : undefined;

        if (nextNode && this.isSelected(nextNode) && targEl.isEqualNode(nextEl)) {
            this.unselect(currNode);
        }

        this.focus(targNode);
    }

    private findHolderFromId(id: string): ITreeNodeHolder<T> | undefined {
        const { dataNodes } = this.controler;
        if (!dataNodes) {
            return undefined;
        }
        return dataNodes.find((n) => n.id === id);
    }

    private findHolderFromData(data: T): ITreeNodeHolder<T> | undefined {
        const { dataNodes } = this.controler;
        if (!dataNodes) {
            return undefined;
        }
        const id = this.adapter.idProvider(data);
        return id
            ? dataNodes?.find((node) => node.id === id)
            : undefined;
    }

    private findHolderFromEvent(event: Event): ITreeNodeHolder<T> | undefined {
        const { dataNodes } = this.controler;
        if (!dataNodes) {
            return undefined;
        }

        const dataId = this.DATA_TREE_NODE_ID;
        function recursive(
            target?: HTMLElement | null
        ): ITreeNodeHolder<T> | undefined {
            if (!target) {
                return undefined;
            }

            const targetId = target.getAttribute(dataId);
            return targetId
                ? dataNodes.find((n) => n.id === targetId)
                : recursive(target.parentElement);
        }

        return recursive(event.target as any);
    }

    private findHolderFromElement(element: Element): ITreeNodeHolder<T> | undefined {
        const { dataNodes } = this.controler;
        if (!dataNodes) {
            return undefined;
        }

        const id = element.getAttribute(this.DATA_TREE_NODE_ID);
        if (!id) {
            return undefined;
        }

        return dataNodes.find((n) => n.id === id);
    }

    private findHolder(node: Node<T>): ITreeNodeHolder<T> | undefined {
        if (!this.controler.dataNodes) {
            return undefined;
        }

        if (typeof node === 'string') {
            return this.findHolderFromId(node);
        }

        if (node instanceof Element) {
            return this.findHolderFromElement(node);
        }

        if ('data' in node) {
            // NodeWrapper<T>
            return node;
        }

        return this.findHolderFromData(node);
    }

    private findParentHolder(node: Node<T>): ITreeNodeHolder<T> | undefined {
        const holder = this.findHolder(node);
        if (!holder) {
            throw new Error(node + ' is not a registered node');
        }

        const level = this.controler.getLevel(holder);
        if (level < 1) {
            return undefined;
        }

        const startIndex = this.controler.dataNodes.indexOf(holder) - 1;
        let currentNode: ITreeNodeHolder<T>;
        for (let i = startIndex; i >= 0; i--) {
            currentNode = this.controler.dataNodes[i];
            if (this.controler.getLevel(currentNode) < level) {
                return currentNode;
            }
        }
    }

    private children(e: T): T[] {
        const children = this.adapter.childrenProvider(e);
        if (this.filter.term.trim().length) {
            return (children || []).filter((child) => {
                return !this.hiddenNodes.has(this.adapter.idProvider(child));
            });
        } else {
            return children;
        }
    }

    private transformer(node: T, level: number): ITreeNodeHolder<T> {
        const expandable = this.adapter.isExpandable(node);
        return {
            id: this.adapter.idProvider(node),
            data: node,
            name: this.adapter.nameProvider(node),
            level: level,
            children: this.children(node),
            expandable,
        };
    }

    //#endregion
}
