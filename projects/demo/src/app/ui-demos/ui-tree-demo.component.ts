import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ITreeAdapter, TreeComponent, TreeNodeDirective } from '@cisstech/nge/ui/tree'

interface FileNode {
  id: string
  name: string
  children?: FileNode[]
}

/** Live sample of `ui-tree`, embedded in the Tree page with `<ui-tree-demo>`. */
@Component({
  selector: 'ui-tree-demo',
  imports: [TreeComponent, TreeNodeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ui-demo ui-demo-tree">
      <ui-tree [nodes]="nodes" [adapter]="adapter">
        <ng-template treeNode let-node>{{ node.name }}</ng-template>
      </ui-tree>
    </div>
  `,
  styles: [
    `
      .ui-demo {
        padding: 0.5rem;
        border: 1px solid var(--nge-doc-border, #e4e4e7);
        border-radius: var(--nge-doc-r-lg, 12px);
        background: var(--nge-doc-bg-subtle, #fafafa);
      }
      .ui-demo-tree {
        height: 240px;
      }
    `,
  ],
})
export class UiTreeDemoComponent {
  readonly nodes: FileNode[] = [
    {
      id: 'src',
      name: 'src',
      children: [
        {
          id: 'app',
          name: 'app',
          children: [
            { id: 'app.ts', name: 'app.component.ts' },
            { id: 'app.html', name: 'app.component.html' },
          ],
        },
        { id: 'main', name: 'main.ts' },
      ],
    },
    { id: 'readme', name: 'README.md' },
    { id: 'pkg', name: 'package.json' },
  ]

  readonly adapter: ITreeAdapter<FileNode> = {
    id: 'demo-tree',
    idProvider: (node) => node.id,
    isExpandable: (node) => !!node.children?.length,
    nameProvider: (node) => node.name,
    childrenProvider: (node) => node.children ?? [],
  }
}
