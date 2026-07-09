import { SelectionModel } from '@angular/cdk/collections'

/**
 * Minimal flat-tree expansion control, replacing the deprecated `FlatTreeControl`
 * from `@angular/cdk/tree` (removed in a future Angular). The component owns and
 * renders the flat `dataNodes` list; expansion is tracked by node identity in a
 * `SelectionModel` (selected = expanded).
 */
export class FlatTreeControl<T> {
  /** The flattened tree nodes, in display order. */
  dataNodes: T[] = []

  /** Selected entries are the expanded nodes. */
  readonly expansionModel = new SelectionModel<T>(true)

  isExpanded(node: T): boolean {
    return this.expansionModel.isSelected(node)
  }

  expand(node: T): void {
    this.expansionModel.select(node)
  }

  collapse(node: T): void {
    this.expansionModel.deselect(node)
  }

  expandAll(): void {
    this.expansionModel.select(...this.dataNodes)
  }

  collapseAll(): void {
    this.expansionModel.clear()
  }
}
