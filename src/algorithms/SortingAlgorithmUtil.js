import { selectionSort } from './selectionSort';
import { insertionSort } from "./insertionSort";

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
        default: {
            return []
        }
    }
}