import { ITree } from './tree.model';

/**
 * Stores the actual visible trees of the page.
 *
 * This variable is private to the library and should not be added to the entry file of the api.
 */
export const CURRENT_VISIBLE_TREES = new Map<string, ITree<any>>();
