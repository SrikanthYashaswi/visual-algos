import { selectionSort } from './selectionSort';
import { insertionSort } from "./insertionSort";
import { mergeSort } from './mergeSort';
import { bubbleSort } from './bubbleSort';
import { shellSort } from './shellSort';

export const sortingAlgorithms = {
    SELECTION_SORT: 'selection-sort',
    INSERTION_SORT: 'insertion-sort',
    MERGE_SORT: 'merge-sort',
    BUBBLE_SORT: 'bubble-sort',
    SHELL_SORT: 'shell-sort'
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
        case sortingAlgorithms.BUBBLE_SORT: {
            return bubbleSort(list);
        }
        case sortingAlgorithms.SHELL_SORT: {
            return shellSort(list);
        }
        default: {
            return []
        }
    }
}