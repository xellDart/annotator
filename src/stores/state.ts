import { writable } from 'svelte/store';

export interface Rect {
    label?: string;
    index?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

export interface Active {
    rect?: Rect[];
    name?: string;
    image?: string | ArrayBuffer;
}

export const active = writable<Active>({
    rect: []
});

export const selectItem = writable<number>(-1);