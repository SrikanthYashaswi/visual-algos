export const mergeSort = (list) => {
    changes = [{ list: [...list], indexChanges: [] }]
    internalMergeSort(list, 0, list.length, 0, changes);
    return changes;
}

function internalMergeSort(list, start, end, depth, changes) {
    if (list.length == 1) {
        return list;
    }
    let identifierPivot = Math.trunc((end - start) / 2) + start;
    let pivot = Math.trunc((list.length - 0) / 2);
    let front = list.slice(0, pivot);
    let back = list.slice(pivot, list.length);
    console.log(`${'\t'.repeat(depth)} ${start} ${identifierPivot}`)

    let nfront = internalMergeSort(front, start, identifierPivot, depth + 1, changes);
    console.log(`${'\t'.repeat(depth + 1)} ${nfront} [${start} ${identifierPivot}]`)

    console.log(`${'\t'.repeat(depth)} ${identifierPivot} ${end}`)
    let nback = internalMergeSort(back, identifierPivot, end, depth + 1, changes);
    console.log(`${'\t'.repeat(depth + 1)} ${nback} [${identifierPivot} ${end}]`)

    let k = [];
    let ifront = nfront.length;
    let iback = nback.length;
    let fi = 0, bi = 0;
    while (fi < ifront && bi < iback) {
        if (nfront[fi] < nback[bi]) {
            k.push(nfront[fi]);
            fi++;
        }
        else {
            k.push(nback[bi]);
            bi++;
        }
    }
    if (fi < ifront) {
        k.push(nfront[fi])
    }
    else {
        k.push(nback[bi])
    }
    let change = { ...changes[changes.length - 1] };
    change.indexChanges = [];
    k.forEach((item, index) => {
        change.list[start + index] = item
        change.indexChanges.push(start + index);
    })
    changes.push(change);
    return k;
}
/*
    0 3
    [9,8,7]
    3/2 = 1
    p = 1
    front = (0,1) [9]
        > [1], 0, 1

    end = (2,3) [8,7]
        > [8,7], 2,3
        3-2/2 = 0
        p = 0
        front = (0,0) []

        if(front.length = 0){
            pivot =
        }
        back = (1,2) = []
    [9,2,7,3]

    [9,2]  [7,3]
    [9] [2]
    [2,9]  [3,7]
    [2,3,7]


*/