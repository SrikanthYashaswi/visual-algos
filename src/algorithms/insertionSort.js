export const insertionSort = (arr) => {
    let changes = [];
    let temp;
    changes.push({ list: [...arr], indexChanges: [0] });
    for (let i = 1; i < arr.length; i++) {
        changes.push({ list: [...arr], indexChanges: [i] });
        for (let j = i; j > 0; j--) {
            if (arr[j - 1] < arr[j]) {
                break;
            }
            temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
            changes.push({ list: [...arr], indexChanges: [j, j - 1] });
        }
    }
    return changes;
}