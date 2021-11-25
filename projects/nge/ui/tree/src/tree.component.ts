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
import { BehaviorSubject } from 'rxjs';
import { CURRENT_VISIBLE_TREES } from './internal';
import { TreeNodeDirective } from './tree-node.directive';
import {
    ITree,
    ITreeAdapter, ITreeEdition, ITreeFilter, ITreeNode, ITreeNodeHolder, ITreeState,
    TreeFilter
} from './tree.model';


/**
 * Representation of a node
 * T => data
 * string => id of a node
 * Element => dom element of a node
 * ITreeNodeHolder<T> internal representation
 */
declare type Node<T> = T | string | Element | ITreeNodeHolder<T>;

@Component({
    selector: 'ui-tree',
    templateUrl: 'tree.component.html',
    styleUrls: ['tree.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent<T extends ITreeNode> implements ITree<T>, OnInit, OnChanges, OnDestroy {
    private readonly DATA_TREE_NODE_ID = 'data-tree-node-id';

    private readonly flattener: MatTreeFlattener<T, ITreeNodeHolder<T>>;
    private readonly dataSource: MatTreeFlatDataSource<T, ITreeNodeHolder<T>>;

    private readonly allNodes = new Map<string, ITreeNodeHolder<T>>();
    private readonly hiddenNodes = new Map<string, ITreeNodeHolder<T>>();
    private readonly selectedNodes = new Map<string, ITreeNodeHolder<T>>();

    private isEmpty = false;
    private isShiftKeyPressed = false;
    private activeNode?: ITreeNodeHolder<T>;
    private suspendRendering = false;

    readonly filter: ITreeFilter = new TreeFilter();
    readonly editing: Partial<ITreeEdition<T>> = { text: '', node: undefined };
    readonly controler: FlatTreeControl<ITreeNodeHolder<T>>;
    readonly visibleNodes = new BehaviorSubject<ITreeNodeHolder<T>[]>([]);

    @Input() nodes: T[] = [];
    @Input() adapter!: ITreeAdapter<T>;

    @ContentChild(TreeNodeDirective, { static: true })
    nodeDirective!: TreeNodeDirective<T>;

    @ViewChild(CdkVirtualScrollViewport, { static: true })
    viewport!: CdkVirtualScrollViewport;

    constructor(
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {
        this.controler = new FlatTreeControl<ITreeNodeHolder<T>>(
            (node) => node.level,
            (node) => node.expandable,
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

        this.adapter.itemHeight = this.adapter.itemHeight || '32px';
        this.adapter.treeHeight = this.adapter.treeHeight || '300px';

        this.adapter.keepStateOnChangeNodes = this.adapter.keepStateOnChangeNodes ?? true;

        let state: ITreeState | undefined;
        if (this.adapter.keepStateOnChangeNodes) {
            state = this.saveState();
        }

        this.dataSource.data = this.nodes;

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

    isFocused(node: Node<T>): boolean {
        if (node == null) {
            throw new ReferenceError('Argument "node" is required.');
        }

        if (!this.activeNode) {
            return false;
        }

        return this.findHolder(node)?.id === this.activeNode.id;
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
        if (this.activeNode) {
            this.unselect(this.activeNode);
            this.activeNode = undefined;
        }

        if (!node) {
            return;
        }

        const holder = this.findHolder(node);
        if (holder) {
            this.activeNode = holder;
            this.select(node);
            this.scrollInto(holder);
        }

        this.changeDetectorRef.detectChanges();
    }

    expand(node: Node<T>): void {
        if (!node) {
            throw new ReferenceError('Argument "node" is required.');
        }

        const holder = this.findHolder(node);
        if (holder && holder.expandable) {
            this.ensureVisible(holder);
            this.render();
        }
    }

    expandAll(): void {
        this.controler.expandAll();
        this.render();
    }

    collapse(node: Node<T>): void {
        if (!node) {
            throw new ReferenceError('Argument "node" is required.');
        }

        const holder = this.findHolder(node);
        if (holder && holder.expandable) {
            this.controler.collapse(holder);
            if (this.adapter.onDidCollapse) {
                this.adapter.onDidCollapse(holder.data);
            }
            this.render();
        }

    }

    collapseAll(): void {
        this.controler.collapseAll();
        this.render();
    }

    toggle(node: Node<T>): void {
        if (!node) {
            throw new ReferenceError('Argument "node" is required.');
        }

        const holder = this.findHolder(node);
        if (holder?.expandable) {
            this.controler.toggle(holder);
            this.render();
        }
    }

    startEdition(node: Node<T>, creation?: boolean): void {
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
        }

        this.changeDetectorRef.detectChanges();
    }

    endEdition(): void {
        this.editing.text = '';
        this.editing.node = undefined;
        this.editing.creation = false;
        this.changeDetectorRef.detectChanges();
    }

    search(filter: ITreeFilter) {
        this.filter.term = (filter.term || '').trim();

        // keep tree state (focus, selections...) and show all nodes if filter is empty
        if (!this.filter.term) {
            this.hiddenNodes.clear();
            this.render();
            return;
        }

        let pattern: RegExp | undefined;
        try {
            if (filter.term) {
                const escape = (text: string) => {
                    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
                }
                pattern = new RegExp(`(${escape(filter.term)})`, 'g');
            }
        } catch { }

        const isChildOf = (child: string, parent: string) => {
            if (child === parent) return false
            const childs = child.split('/').filter(e => e.length);
            const parents = parent.split('/').filter(e => e.length);
            return parents.every((t, i) => childs[i] === t)
        }

        if (pattern) {
            this.activeNode = undefined;
            this.hiddenNodes.clear();
            this.selectedNodes.clear();

            const visibles: string[] = [];
            const n = this.controler.dataNodes.length;
            for (let i = n - 1; i >= 0; i--) {
                const node = this.controler.dataNodes[i];
                if (node.name.toLowerCase().match(pattern)) {
                    visibles.push(node.id);
                    continue;
                }

                // a node is hidden if it does not match the pattern and it's children are hidden
                if (!visibles.find((id) => isChildOf(id, node.id))) {
                    this.hiddenNodes.set(node.id, node);
                }
            }

            this.expandAll();
        } else {
            this.changeDetectorRef.detectChanges();
        }

        // do nothing if filter is wrong (regexp error)
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

        const { active, filter, expandedNodes } = state;

        if (filter.term) {
            this.search(filter);
        } else {
            this.suspendRendering = true;
            expandedNodes.forEach(this.expand.bind(this));
            this.suspendRendering = false;
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
        this.search({ term: '' });
    }

    _isRenaming(node: Node<T>): boolean {
        if (node == null) {
            throw new ReferenceError('Argument "node" is required.');
        }

        if (!this.editing?.node) {
            return false;
        }

        return !this.editing.creation && this.findHolder(node)?.id === this.adapter.idProvider(this.editing.node);
    }

    _isCreatingChildInside(node: Node<T>): boolean {
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
                        this.collapse(this.activeNode);
                    }
                    break;
                case 'ArrowRight':
                    if (!this.isShiftKeyPressed) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.expand(this.activeNode);
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

        if (this.isShiftKeyPressed) {
            if (!this.activeNode) {
                this.focus(node);
                return;
            }

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
            this.focus(node);
        } else {
            this.unselectAll(false);
            this.toggle(node);
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
        if (this.suspendRendering)
            return;

        this.isEmpty = true;

        const nodes: ITreeNodeHolder<T>[] = [];
        const dataNodes = this.controler.dataNodes || [];
        const expandedNodes = this.controler.expansionModel.selected;

        const dirname = (path: string) => {
            let head = path.slice(0, path.lastIndexOf('/') + 1);
            if (head && !head.match(/^\/*$/g)) {
                head = head.replace(/\/*$/g, '');
            }
            return head;
        };

        this.allNodes.clear();
        dataNodes.forEach(node => {
            this.allNodes.set(node.id, node);
            this.isEmpty = false;
            if (this.hiddenNodes.has(node.id)) {
                return;
            }

            // root nodes are always visible
            if (node.level === 0) {
                nodes.push(node);
                return;
            }

            let parent = dirname(node.id);
            do {
                if (!expandedNodes.find(e => e.id === parent)) {
                    return;
                }
                parent = dirname(parent);
            } while (parent && parent !== '/');
            nodes.push(node);
        });

        this.visibleNodes.next(nodes);
        this.changeDetectorRef.detectChanges();
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
     * @param node The node to select.
     */
    private select(node: Node<T>, detectChanges: boolean = true): void {
        const holder = this.findHolder(node);
        if (!holder) {
            throw new Error(node + ' is not a registered node');
        }

        if (!this.selectedNodes.has(holder.id)) {
            this.selectedNodes.set(holder.id, holder);
        }

        if (detectChanges) {
            this.changeDetectorRef.detectChanges();
        }
    }

    /**
     * Removes the given node to the selected nodes.
     * @param node The node to unselect.
     */
    private unselect(node: Node<T>, detectChanges: boolean = true): void {
        const holder = this.findHolder(node);
        if (!holder) {
            throw new Error(node + ' is not a registered node');
        }

        this.selectedNodes.delete(holder.id);

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
     * Expands the given node and all of it's ancestors.
     * @param node A node reference.
     */
    private ensureVisible(node: ITreeNodeHolder<T>) {
        if (this.controler.isExpandable(node)) {
            this.controler.expand(node);
            if (this.adapter.onDidExpand) {
                this.adapter.onDidExpand(node.data);
            }
        }

        const parent = this.findParentHolder(node);
        if (parent && parent.level >= 0) {
            this.ensureVisible(parent);
        }
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

        return this.allNodes.get(this.adapter.idProvider(data));
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
                ? this.allNodes.get(targetId)
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

        return this.allNodes.get(id);
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

        // instanceof ITreeNodeHolder<T>
        if ('data' in node) {
            return node;
        }

        // instance of T
        return this.findHolderFromData(node);
    }

    private findParentHolder(node: Node<T>): ITreeNodeHolder<T> | undefined {
        const holder = this.findHolder(node);
        if (!holder) {
            throw new Error(node + ' is not a registered node');
        }

        if (holder.level < 1) {
            return undefined;
        }

        const { dataNodes } = this.controler;
        const startIndex = dataNodes.indexOf(holder) - 1;
        let cursor: ITreeNodeHolder<T>;
        for (let i = startIndex; i >= 0; i--) {
            cursor = dataNodes[i];
            if (cursor.level < holder.level) {
                return cursor;
            }
        }
    }

    private children(node: T): T[] {
        return this.adapter.childrenProvider(node) || [];
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
