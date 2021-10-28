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
    size?: number;
    image?: string | ArrayBuffer;
}

export interface DataTraining {
    items?: Active[];
}

export const active = writable<Active>({
    rect: []
});

export const trainingData = writable<DataTraining>({
    items: []
});
export const selectItem = writable<number>(-1);