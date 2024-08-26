/**
 * Representation of a node
 * T => data
 * string => id of a node
 * Element => dom element of a node
 * ITreeNodeHolder<T> internal representation
 */
export declare type INode<T> = T | string | Element | ITreeNodeHolder<T>

export interface ITreeState {
  active: string
  filter: ITreeFilter
  expandedNodes: string[]
}

export interface ITreeFilter {
  term: string
}

export interface ITreeEdition<T> {
  node: T
  text: string
  creation?: boolean
}

/**
 * Keyboard event handlers
 */
export interface ITreeKeyAction<T> {
  /**
   * Original dom event (MouseEvent|KeyboardEvent).
   * If `event.preventDefault()` is not called, the typed character will be added/removed
   * to the current filter of the tree.
   */
  event: KeyboardEvent
  /** The node on which the action is called. (`null` for contextmenu on the tree itself ) */
  node?: T
}

/** Mouse event handlers */
export interface ITreeMouseAction<T> {
  /** original dom event (MouseEvent|KeyboardEvent) */
  event: MouseEvent
  /** The node on which the action is called. (`null` for contextmenu on the tree itself ) */
  node?: T
}

/** Maps mouse events, and key codes, to callbacks. */
export interface ITreeActionMapping<T> {
  keys?: { [k: string]: (e: ITreeKeyAction<T>) => void }
  mouse?: {
    click?: (e: ITreeMouseAction<T>) => void
    rightClick?: (e: ITreeMouseAction<T>) => void
  }
}

/**
 * Tree api.
 */
export interface ITree<T> {
  /**
   * Gets the selected nodes.
   */
  selections(): T[]

  /**
   * Gets the current focused node.
   */
  focusedNode(): T | undefined

  /**
   * Gets a value indicating whether `node` is selected.
   * @param node A reference to a node.
   * @throws {ReferenceError} if node is null.
   */
  isSelected(node: INode<T>): boolean

  /**
   * Gets a value indicating whether `node` is the current focused node.
   * @param node A reference to a node.
   * @throws {ReferenceError} if node is null.
   */
  isFocused(node: INode<T>): boolean

  /**
   * Gets a value indicating whether `node` is expanded.
   * @param node A reference to a node.
   * @throws {ReferenceError} if node is null.
   */
  isExpanded(node: INode<T>): boolean

  /**
   * Sets `node` as the new focused node.
   *
   * Note:
   * The ancestors the of node will be expanded and the tree will scroll into the node.
   * @param node A reference to a node.
   */
  focus(node: INode<T>): void

  /** Unfocus the current focused node */
  unfocus(): void

  /**
   * Expands the passed `node` with all its parents.
   *
   * Note:
   * This method will not select/focus the node.
   *
   * @param node A reference to a node.
   * @throws {ReferenceError} if node is null.
   */
  expand(node: INode<T>): void

  /**
   * Expand the entire tree.
   */
  expandAll(): void

  /**
   * Collapses the given `node`.
   *
   * Note:
   * This method will not select/focus the node.
   *
   * @param node A reference to a node.
   * @throws {ReferenceError} if node is null.
   */
  collapse(node: INode<T>): void

  /**
   * Collapse the entire tree
   */
  collapseAll(): void

  /**
   * Toggles the expanded/collapse state of the given node.
   *
   * Note:
   * This method will not select/focus the node.
   *
   * @param node A reference to a node.
   * @throws {ReferenceError} if node is null.
   */
  toggle(node: INode<T>): void

  /**
   * Starts editing the given node.
   * @param node A reference to a node.
   * @param creation If true, an input will be displayed after the node to create a new child node.
   * @throws {ReferenceError} if `node` is null.
   */
  startEdition(node: INode<T>, creation?: boolean): void

  /**
   * End the editing of the current node in a editing state.
   */
  endEdition(): void

  /**
   * Filter the tree using the given filter.
   * @param filter The filter to apply.
   */
  search(filter: ITreeFilter): void

  /**
   * Saves the tree as an object to be restored later
   * by calling `tree.restoreState()`.
   */
  saveState(): ITreeState

  /**
   * Restores the state of the tree from `state`.
   * @param state the state.
   */
  restoreState(state: ITreeState): void
}

/**
 * Adapter class to map a generic type T to an ITreeHolder<T>
 * and attach event listeners to the tree instance.
 */
export interface ITreeAdapter<T> {
  /**
   * Unique identifier of the tree.
   *
   * This identifier is used to get a reference to the tree anywhere
   * by using `TreeService` class.
   */
  id: string

  /** Tree height (default 100%) */
  treeHeight?: string

  /** Item height (default 32) */
  itemHeight?: number

  /**
   * Function called to get the id of a node.
   */
  idProvider: (node: T) => string

  /**
   * Function called to get test whether a node is expandable.
   */
  isExpandable: (node: T) => boolean

  /**
   * Function called to get the display name of a node.
   */
  nameProvider: (node: T) => string

  /**
   * Function called to get the children of a node.
   */
  childrenProvider: (node: T) => T[]

  /**
   * Function called to get the display tooltip of a node.
   */
  tooltipProvider?: (node: T) => string

  /**
   * If enabled, this option will filter the tree
   * each time a keyboard key is pressed while the tree is focused.
   *
   * Note:
   *
   * The filter will be updated only if `preventDefault()` is not called
   * on the original KeyboardEvent by any of the event handlers.
   *
   */
  enableKeyboardFiltering?: boolean

  /**
   * Event called after a node is expanded in the tree.
   * @param e informations about the event.
   */
  onDidExpand?: (e: T) => void

  /**
   * Event called after a node is expanded in the tree.
   * @param e informations about the event.
   */
  onDidCollapse?: (e: T) => void

  /**
   * Event called after a node is edited in the tree.
   * @param e informations about the event.
   */
  onDidEditName?: (e: ITreeEdition<T>) => void

  /**
   * Maps mouse events, and key codes, to callbacks.
   */
  actions?: ITreeActionMapping<T>

  /** Should the tree keep the expands state when the nodes change? (default to `true`)*/
  keepStateOnChangeNodes?: boolean
}

/** Internal representation of a node */
export interface ITreeNodeHolder<T> {
  /** A unique key of this node. */
  id: string

  /** Reference to the original data. */
  data: T

  /** display name of the node */
  name: string

  /** Level in the tree (starts from 0). */
  level: number

  /** A value indicating whether the node is expandable */
  expandable: boolean

  /** Optional tooltip to show when the node is hovered */
  tooltip?: string

  padding: string

  // TODO precalculate the following properties instead of calling functions inside template.

  /** A value indicating whether the node is focused */
  focused?: boolean

  /** A value indicating whether the node is expanded */
  expanded?: boolean

  /** A value indicating whether the node is selected */
  selected?: boolean

  /** A value indicating whether the node is in creating state.  */
  creating?: boolean

  /** A value indicating whether the node is in renaming state.  */
  renaming?: boolean
}

export class TreeFilter implements ITreeFilter {
  constructor(public term = '') {}
}

export class TreeState implements ITreeState {
  constructor(
    public active = '',
    public expandedNodes: string[] = [],
    public filter: ITreeFilter = new TreeFilter()
  ) {}
}
