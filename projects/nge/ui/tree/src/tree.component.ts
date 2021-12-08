import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
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
    ViewChild
} from '@angular/core';
import {
    MatTreeFlatDataSource,
    MatTreeFlattener
} from '@angular/material/tree';
import { $ } from 'protractor';
import { BehaviorSubject } from 'rxjs';
import { CURRENT_VISIBLE_TREES } from './internal';
import { TreeNodeDirective } from './tree-node.directive';
import {
    INode,
    ITree,
    ITreeAdapter, ITreeEdition, ITreeFilter, ITreeNodeHolder, ITreeState,
    TreeFilter
} from './tree.model';


@Component({
    selector: 'ui-tree',
    templateUrl: 'tree.component.html',
    styleUrls: ['tree.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent<T> implements ITree<T>, OnInit, OnChanges, OnDestroy {
    private readonly DATA_TREE_NODE_ID = 'data-tree-node-id';

    private readonly flattener: MatTreeFlattener<T, ITreeNodeHolder<T>>;
    private readonly dataSource: MatTreeFlatDataSource<T, ITreeNodeHolder<T>>;

    private readonly nodesIndex = new Map<string, ITreeNodeHolder<T>>();
    private readonly parentsIndex = new Map<string, string>();
    private readonly hiddenNodes = new Map<string, ITreeNodeHolder<T>>();
    private readonly selectedNodes = new Map<string, ITreeNodeHolder<T>>();

    private isEmpty = false;
    private isShiftKeyPressed = false;
    private activeNode?: ITreeNodeHolder<T>;
    private stateBeforeSearching: ITreeState | undefined;

    readonly filter: ITreeFilter = new TreeFilter();
    readonly editing: Partial<ITreeEdition<T>> = { text: '', node: undefined };
    readonly controler: FlatTreeControl<ITreeNodeHolder<T>>;
    readonly visibleNodes = new BehaviorSubject<ITreeNodeHolder<T>[]>([]);

    @Input() nodes: T[] = [];
    @Input() adapter!: ITreeAdapter<T>;
    @Input() minBuffer = 10;
    @Input() maxBuffer = 20;

    @ContentChild(TreeNodeDirective, { static: true })
    nodeDirective!: TreeNodeDirective<T>;

    @ViewChild(CdkVirtualScrollViewport, { static: true })
    viewport!: CdkVirtualScrollViewport;

    get minBufferPx(): string {
        return ((this.adapter.itemHeight || 32) * this.minBuffer) + 'px';
    }

    get maxBufferPx(): string {
        return ((this.adapter.itemHeight || 32) * this.maxBuffer) + 'px';
    }

    constructor(
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {
        this.controler = new FlatTreeControl<ITreeNodeHolder<T>>(
            (node) => node.level,
            (node) => node.expandable,
            {
                trackBy: (node) => node
            }
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

    ngOnInit(): void {
        if (!this.adapter.id?.trim()) {
            throw new Error('@Input() adapter.id is required !');
        }
        CURRENT_VISIBLE_TREES.set(this.adapter.id, this);
    }

    ngOnChanges(): void {
        if (!this.adapter) {
            throw new Error('@Input() adapter is required !');
        }

        const requires: (keyof ITreeAdapter<T>)[] = ['id', 'idProvider', 'nameProvider', 'isExpandable', 'childrenProvider'];
        for (const key of requires) {
            const value = this.adapter[key];
            if (!value || (typeof value === 'string' && value.trim() === '')) {
                throw new Error(`@Input() adapter.${key} is required !`);
            }
        }

        this.adapter.itemHeight = this.adapter.itemHeight || 32;
        this.adapter.treeHeight = this.adapter.treeHeight || '100%';
        this.adapter.keepStateOnChangeNodes = this.adapter.keepStateOnChangeNodes ?? true;

        let state: ITreeState | undefined;
        if (this.adapter.keepStateOnChangeNodes) {
            state = this.saveState();
        }

        this.buildIndexes();

        if (state) {
            this.restoreState(state);
        } else {
            this.unselectAll(false);
            this.render();
        }

        this.viewport.scrollToIndex(0);
    }

    ngOnDestroy(): void {
        if (this.adapter?.id) {
            CURRENT_VISIBLE_TREES.delete(this.adapter.id);
        }
    }

    //#region API

    selections(): T[] {
        return Array.from(this.selectedNodes.values()).map((e) => e.data);
    }

    focusedNode(): T | undefined {
        return this.activeNode?.data;
    }

    isFocused(node: INode<T>): boolean {
        if (node == null) {
            throw new ReferenceError('Argument "node" is required.');
        }

        if (!this.activeNode) {
            return false;
        }

        return this.findHolder(node)?.id === this.activeNode.id;
    }

    isExpanded(node: INode<T>): boolean {
        if (node == null) {
            throw new ReferenceError('Argument "node" is required.');
        }

        const holder = this.findHolder(node);
        if (!holder?.expandable) {
            return false;
        }

        return this.controler.isExpanded(holder);
    }

    isSelected(node: INode<T>): boolean {
        if (node == null) {
            throw new ReferenceError('Argument "node" is required.');
        }

        const holder = this.findHolder(node);
        if (!holder) {
            return false;
        }

        return this.selectedNodes.has(holder.id);
    }

    focus(node: INode<T>, render = true): void {
        const holder = this.findHolder(node);
        if (holder) {
            if (this.activeNode) {
                this.unselect(this.activeNode, false);
            }
            this.activeNode = holder;
            this.select(node, false);
            this.expandAncestors(holder);
            if (render) {
                this.render();
            }
            this.scrollInto(holder);
        }
    }

    unfocus(): void {
        this.activeNode = undefined;
        this.changeDetectorRef.detectChanges();
    }

    expand(node: INode<T>, render = true): void {
        if (!node) {
            return;
        }

        const holder = this.findHolder(node);
        if (!holder) {
            return;
        }

        if (holder.expandable && !this.controler.isExpanded(holder)) {
            this.controler.expand(holder);
            this.expandAncestors(holder);
            if (render) {
                this.render();
            }
        }
    }

    expandAll(render = true): void {
        this.controler.dataNodes?.forEach(node => {
            this.controler.expand(node);
        });
        // this.controler.expandAll(); // https://github.com/vmware/clarity/issues/4850
        if (render) {
            this.render();
        }
    }

    collapse(node: INode<T>, render = true): void {
        if (!node) {
            return;
        }

        const holder = this.findHolder(node);
        if (!holder) {
            return;
        }

        if (holder.expandable && this.controler.isExpanded(holder)) {
            this.controler.collapse(holder);
            if (this.adapter.onDidCollapse) {
                this.adapter.onDidCollapse(holder.data);
            }
            if (render) {
                this.render();
            }
        }
    }

    collapseAll(render = true): void {
        this.controler.collapseAll();
        if (render) {
            this.render();
        }
    }

    toggle(node: INode<T>, render = true): void {
        if (!node) {
            return;
        }

        const holder = this.findHolder(node);
        if (holder?.expandable) {
            if (this.controler.isExpanded(holder)) {
                this.collapse(node, render);
            } else {
                this.expand(node, render);
            }
        }
    }

    startEdition(node: INode<T>, creation?: boolean): void {
        if (!this.adapter.onDidEditName)
            return;

        if (!node) {
            throw new ReferenceError('Argument "node" is required.');
        }

        const holder = this.findHolder(node);
        if (holder) {
            this.unselectAll(false);
            this.editing.node = holder.data;
            this.editing.text = creation ? '' : holder.name;
            this.editing.creation = creation;
            if (!this.isExpanded(node)) {
                this.expand(node);
            } else {
                this.changeDetectorRef.detectChanges();
            }
        }

    }

    endEdition(): void {
        this.editing.text = '';
        this.editing.node = undefined;
        this.editing.creation = false;
        this.changeDetectorRef.detectChanges();
    }

    search(filter: ITreeFilter) {
        if (!this.filter.term) {
            this.stateBeforeSearching = this.saveState();
        }

        this.filter.term = (filter.term || '').trim();

        if (!this.filter.term) {
            if (this.stateBeforeSearching) {
                this.restoreState(this.stateBeforeSearching);
                this.stateBeforeSearching = undefined;
            } else {
                this.hiddenNodes.clear();
                this.render();
            }
            return;
        }

        const pattern = this.buildSearchPattern();
        if (pattern) {
            this.activeNode = undefined;
            this.hiddenNodes.clear();
            this.selectedNodes.clear();
            this.collapseAll(false);

            const p = pattern;
            const matches = new Set<string>();
            const nodes = this.controler.dataNodes || [];
            const n = nodes.length - 1;
            for (let i = n; i >= 0; i--) {
                const node = nodes[i];
                if (matches.has(node.id))
                    continue;

                if (node.name.toLowerCase().match(p)) {
                    matches.add(node.id);
                    this.iterateAncestors(node, e => {
                        this.controler.expand(e);
                        matches.add(e.id);
                    });
                } else {
                    this.hiddenNodes.set(node.id, node);
                }
            }
            this.render();
        } else {
            this.changeDetectorRef.detectChanges();
        }
    }

    saveState(): ITreeState {
        const { term } = this.filter;
        const dataNodes = this.controler.dataNodes || [];
        const state: ITreeState = {
            filter: { term },
            active: this.activeNode ? this.activeNode.id : '',
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

        this.hiddenNodes.clear();
        this.selectedNodes.clear();

        this.collapseAll(false);

        const { active, filter, expandedNodes } = state;

        if (filter.term) {
            this.search(filter);
        } else {
            expandedNodes.forEach(node => this.expand(node, false));
            this.render();
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
    _onEdit(event: Event): void {
        if (this.adapter.onDidEditName) {
            event.stopPropagation();

            const { node, text, creation } = this.editing;
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
                            creation,
                        });
                    }
                } finally {
                    this.focus(node);
                    this.endEdition();
                }
            }
        }
    }

    _clearFilter(): void {
        this.search({ term: '' });
    }

    _isRenaming(node: INode<T>): boolean {
        if (node == null) {
            throw new ReferenceError('Argument "node" is required.');
        }

        if (!this.editing?.node) {
            return false;
        }

        return !this.editing.creation && this.findHolder(node)?.id === this.adapter.idProvider(this.editing.node);
    }

    _isCreating(node: INode<T>): boolean {
        if (node == null) {
            throw new ReferenceError('Argument "node" is required.');
        }

        if (!this.editing?.node) {
            return false;
        }

        return !!this.editing.creation && this.findHolder(node)?.id === this.adapter.idProvider(this.editing.node);
    }

    _trackById(_: number, e: ITreeNodeHolder<T>) {
        return e.id;
    }
    //#endregion

    //#region EVENTS

    @HostListener('document:keyup')
    keyup() {
        this.isShiftKeyPressed = false;
    }

    @HostListener('document:keydown', ['$event'])
    keydown($event: KeyboardEvent) {
        this.isShiftKeyPressed = $event.shiftKey;
        if (this.isTreeContainsEvent($event)) {
            this.onKeyDown($event);
        }
    }

    @HostListener('document:click', ['$event'])
    mousedown($event: MouseEvent) {
        this.changeDetectorRef.detach();
        if (this.isTreeContainsEvent($event)) {
            this.changeDetectorRef.reattach();
            this.onMouseDown($event);
        }
    }

    @HostListener('document:contextmenu', ['$event'])
    contextmenu($event: MouseEvent) {
        if (this.isTreeContainsEvent($event)) {
            this.onContextMenu($event);
        }
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (!this.activeNode && !this.isEmpty && !this.selectedNodes.size) {
            this.focus(this.controler.dataNodes[0]);
        }

        const element = this.activeNode
            ? this.domNode(this.activeNode)
            : undefined;

        if (element && this.activeNode) {
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
                        this.collapse(this.activeNode, true);
                    }
                    break;
                case 'ArrowRight':
                    if (!this.isShiftKeyPressed) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.expand(this.activeNode, true);
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

    private onMouseDown(event: MouseEvent): void {
        const node = this.findHolderFromEvent(event);
        if (!node) {
            return;
        }

        if (this.isShiftKeyPressed && this.activeNode) {
            const domStart = this.domNode(this.activeNode);
            if (!domStart) {
                this.select(node);
                return;
            }

            const domEnd = this.domNode(node);
            if (!domEnd) {
                return;
            }

            // select all nodes between the focused and the target node.

            this.unselectAll(false);

            let cursor = domStart;
            const y2 = domEnd.getClientRects().item(0)!.top;
            const y1 = domStart.getClientRects().item(0)!.top;
            if (y1 < y2) {
                // traverse down
                do {
                    this.select(cursor, false);
                    cursor = cursor.nextElementSibling as HTMLElement;
                } while (cursor && !cursor.isEqualNode(domEnd));
            } else if (y1 > y2) {
                // traverse up
                do {
                    this.select(cursor, false);
                    cursor = cursor.previousElementSibling as HTMLElement;
                } while (cursor && !cursor.isEqualNode(domEnd));
            }

            this.select(domEnd, false);
            this.focus(node, true);
        } else {
            this.unselectAll(false);
            this.toggle(node, false);
            this.focus(node, true);

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
                this.unselectAll(false);
            }
            this.focus(node, true);
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
        return (this.elementRef.nativeElement.contains(
            event.target as any
        ));
    }

    private triggerFilterEvent(e: KeyboardEvent) {
        if (e.defaultPrevented || !this.adapter.enableKeyboardFiltering) {
            return;
        }

        // prevent browser to navigate back if Backspace is pressed
        e.preventDefault();
        e.stopPropagation();

        const { term } = this.filter;
        switch (e.key) {
            case 'Backspace':
                if (term) {
                    this.search({ term: term.slice(0, -1) });
                }
                break;
            case ' ':
            case 'Tab':
                break;
            default:
                if (e.key.length === 1) {
                    this.search({ term: term + e.key });
                }
                break;
        }
    }

    private triggerKeyboardEvent(event: KeyboardEvent): void {
        if (!this.activeNode) {
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
                        node: this.activeNode.data,
                    });
                }
            }
        }
    }

    //#endregion

    //#region PRIVATE
    private render() {
        const nodes: ITreeNodeHolder<T>[] = [];
        const dataNodes = this.controler.dataNodes || [];
        const expandedNodes = new Set(this.controler.expansionModel.selected.map(node => node.id));

        this.isEmpty = true;
        dataNodes.forEach(node => {
            this.isEmpty = false;
            if (this.hiddenNodes.has(node.id)) {
                return;
            }

            // root nodes are always visible
            if (node.level === 0) {
                nodes.push(node);
                return;
            }

            let parent = this.findParent(node);
            while (parent != null) {
                // hide a node if any of its ancestors is not expanded
                if (!expandedNodes.has(parent.id)) {
                    return;
                }

                if (parent.level === 0) {
                    break;
                }

                parent = this.findParent(parent);
            }
            nodes.push(node);
        });

        this.visibleNodes.next(nodes);
        this.changeDetectorRef.detectChanges();
    }

    private buildIndexes(): void {
        this.nodesIndex.clear();
        this.parentsIndex.clear();
        this.dataSource.data = this.nodes;
        this.controler.dataNodes?.forEach(node => {
            this.nodesIndex.set(node.id, node);
        });
    }

    private buildSearchPattern() {
        let pattern: RegExp | undefined;
        try {
            if (this.filter.term) {
                const escape = (text: string) => {
                    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
                };
                pattern = new RegExp(`(${escape(this.filter.term)})`, 'g');
            }
        } catch (error) {
            console.error(error);
        }
        return pattern;
    }

    /**
     * Gets the dom element associated to the given node.
     * @param e A node.
     */
    private domNode(e: INode<T>): HTMLElement | null {
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
     * @param node The node to select.
     */
    private select(node: INode<T>, detectChanges: boolean = true): void {
        const holder = this.findHolder(node);
        if (!holder) {
            return;
        }

        this.selectedNodes.set(holder.id, holder);

        if (detectChanges) {
            this.changeDetectorRef.detectChanges();
        }
    }

    /**
     * Removes the given node to the selected nodes.
     * @param node The node to unselect.
     */
    private unselect(node: INode<T>, detectChanges: boolean = true): void {
        const holder = this.findHolder(node);
        if (!holder) {
            return;
        }

        this.selectedNodes.delete(holder.id);

        if (holder.id === this.activeNode?.id) {
            this.activeNode = undefined;
        }

        if (detectChanges) {
            this.changeDetectorRef.detectChanges();
        }
    }

    /**
     * Clears the selected nodes.
     */
    private unselectAll(detectChanges: boolean = true): void {
        this.activeNode = undefined;
        this.selectedNodes.clear();

        if (detectChanges) {
            this.changeDetectorRef.detectChanges();
        }
    }

    /**
     * Expands the ancestors of the given node.
     * @param node A node reference.
     */
    private expandAncestors(node: ITreeNodeHolder<T>) {
        this.iterateAncestors(node, e => {
            if (e.expandable && !this.controler.isExpanded(e)) {
                this.controler.expand(e);
                if (this.adapter.onDidExpand) {
                    this.adapter.onDidExpand(e.data);
                }
            }
        });
    }

    /**
     * Call the given `action` for the ancestors of the given node.
     * @param node A node reference.
     * @param action A function to call for each ancestor.
     */
    private iterateAncestors(node: ITreeNodeHolder<T>, action: (e: ITreeNodeHolder<T>) => void) {
        const recursive = (e: ITreeNodeHolder<T>) => {
            action(e);
            const p = this.findParent(e);
            if (p && p.level >= 0) {
                recursive(p);
            }
        };

        const parent = this.findParent(node);
        if (parent) {
            recursive(parent);
        }
    }

    /**
     * Moves the scrollbar to the given node.
     * @param node The node to show.
     */
    private scrollInto(node: INode<T>) {
        const holder = this.findHolder(node);
        if (holder) {
            const index = this.visibleNodes.value.indexOf(holder);
            if (index == -1)
                return;
            const range = this.viewport.getRenderedRange();
            if (index < range.start || index > range.end) {
                this.viewport.scrollToIndex(index, 'smooth');
            }
        }
    }


    /**
 * Focus the node before of after `currEl` depending on the given `direction`.
 * @param currEl Current element
 * @param direction Navigation direction.
 */
    private navigate(currEl: Element, direction: 'up' | 'down'): void {
        this.unselectAll();

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

    private findParent(node: INode<T>): ITreeNodeHolder<T> | undefined {
        const holder = this.findHolder(node)
        if (!holder) {
            return;
        }
        const parentId = this.parentsIndex.get(holder.id);
        if (parentId) {
            return this.nodesIndex.get(parentId);
        }
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

        return this.nodesIndex.get(this.adapter.idProvider(data));
    }

    private findHolderFromEvent(event: Event): ITreeNodeHolder<T> | undefined {
        const { dataNodes } = this.controler;
        if (!dataNodes) {
            return undefined;
        }

        const dataId = this.DATA_TREE_NODE_ID;
        const fn = (
            target?: HTMLElement | null
        ): ITreeNodeHolder<T> | undefined => {
            if (!target) {
                return undefined;
            }

            const targetId = target.getAttribute(dataId);
            return targetId
                ? this.nodesIndex.get(targetId)
                : fn(target.parentElement);
        }

        return fn(event.target as any);
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

        return this.nodesIndex.get(id);
    }

    private findHolder(node: INode<T>): ITreeNodeHolder<T> | undefined {
        if (!node) {
            return undefined;
        }

        if (!this.controler.dataNodes) {
            return undefined;
        }

        if (typeof node === 'string') {
            return this.findHolderFromId(node);
        }

        if (node instanceof Element) {
            return this.findHolderFromElement(node);
        }

        // instanceof ITreeNodeHolder<T>
        if ('data' in node) {
            return node;
        }

        // instance of T
        return this.findHolderFromData(node);
    }

    private children(node: T): T[] {
        const children = this.adapter.childrenProvider(node) || [];
        const parentId = this.adapter.idProvider(node);
        children.forEach(child => {
            this.parentsIndex.set(this.adapter.idProvider(child), parentId);
        })
        return children;
    }

    private transformer(node: T, level: number): ITreeNodeHolder<T> {
        const expandable = this.adapter.isExpandable(node);
        return {
            id: this.adapter.idProvider(node),
            data: node,
            name: this.adapter.nameProvider(node),
            level: level,
            padding: level * 12 + 'px',
            tooltip: this.adapter.tooltipProvider?.(node),
            expandable,
        };
    }
    //#endregion
}
