import { selectionSort } from './selectionSort';
import { insertionSort } from "./insertionSort";
import { mergeSort } from './mergeSort';

export const sortingAlgorithms = {
    SELECTION_SORT: 'selection-sort',
    INSERTION_SORT: 'insertion-sort',
    MERGE_SORT: 'merge-sort'
}

export const getSortEventsForAlgorithm = (algorithm, list) => {
    switch (algorithm) {
        case sortingAlgorithms.SELECTION_SORT: {
            return selectionSort(list);
        }
        case sortingAlgorithms.INSERTION_SORT: {
            return insertionSort(list);
        }
        case sortingAlgorithms.MERGE_SORT: {
            return mergeSort(list);
        }
        default: {
            return []
        }
    }
}