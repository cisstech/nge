export interface ListContext<T> {
    item: T;
    items: T[];
    /** The index of the current item in the iterable. */
    index: number;
    /** True when the item is the first item in the iterable. */
    first: boolean;
    /** True when the item is the last item in the iterable. */
    last: boolean;
    /** True when the item has an even index in the iterable. */
    even: boolean;
    /** True when the item has an odd index in the iterable. */
    odd: boolean;
}

export declare type ListTemplateSlots =
    | 'row'
    | 'empty'
    | 'header'
    | 'noresult'
    | 'selection';

export interface ListAction<T> {
    color?: string;
    side?: 'start' | 'end';
    icon?: string;
    text?: string;
    when?: (item: T) => boolean;
    action: (item: T) => void | Promise<void>;
}
