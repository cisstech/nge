import { Injectable } from '@angular/core';
import { CURRENT_VISIBLE_TREES } from './internal';
import { ITree } from './tree.model';

@Injectable({ providedIn: 'root' })
export class TreeService {
    /**
     * Gets the tree identified by `id` if the tree is visible.
     * @param id Identifier of a tree.
     */
    get<T>(id: string): ITree<T> | undefined {
        return CURRENT_VISIBLE_TREES.get(id) as ITree<T>;
    }
}


