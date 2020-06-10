export const binaryInsertionSort = (list) => {
    let changes = [];
    changes.push({ list: [...list], indexChanges: [1, 1] });

    for(let i=1; i<list.length; ++i){
        let j = i - 1;
        const item = list[i];

        const location = binarySearch(list, item, 0, j);

        while(j >= location){
            changes.push({ list: [...list], indexChanges: [j, j+1] });
            list[j + 1] = list[j];
            j -= 1;
        }

        list[j + 1] = item;
    }
    return changes;
}

const binarySearch = (array, item, low, high) => {
    if(high <= low)
        return (item > array[low]) ? (low + 1) : low;

    const mid = Math.floor((low + high) / 2);

    if(item === array[mid])
        return mid + 1;

    if(item > array[mid])
        return binarySearch(array, item, mid+1, high);

    return binarySearch(array, item, low, mid-1);
}
