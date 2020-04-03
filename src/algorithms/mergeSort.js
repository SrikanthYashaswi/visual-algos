export const mergeSort = (list) => {
    let changes = [{ list: [...list], indexChanges: [0] }]
    internalMergeSort(list, 0, list.length, changes);
    return changes;
}

function internalMergeSort(list, start, end, changes) {
    if (list.length === 1) {
        return list;
    }
    let identifierPivot = Math.trunc((end - start) / 2) + start;
    let pivot = Math.trunc((list.length - 0) / 2);
    let front = list.slice(0, pivot);
    let back = list.slice(pivot, list.length);
    let nfront = internalMergeSort(front, start, identifierPivot, changes);
    let nback = internalMergeSort(back, identifierPivot, end, changes);
    let merged = merge(nfront, nback, changes);
    let previousChange = [...changes[changes.length - 1].list];
    let indexChanges = [];
    merged.forEach((item, index) => {
        previousChange[start + index] = item
        indexChanges.push(start + index);
    })
    changes.push({ list: previousChange, indexChanges: indexChanges });
    return merged;
}

let merge = (nfront, nback, changes) => {
    let k = new Array(nfront.length + nback.length);
    let ki = 0;
    let ifront = nfront.length;
    let iback = nback.length;
    let fi = 0, bi = 0;
    while (fi < ifront && bi < iback) {
        if (nfront[fi] < nback[bi]) {
            k[ki++] = nfront[fi];
            fi++;
        }
        else {
            k[ki++] = nback[bi];
            bi++;
        }
    }

    while (fi < ifront) {
        k[ki++] = nfront[fi++]
    }
    while (bi < iback) {
        k[ki++] = nback[bi++]
    }
    return k;
}