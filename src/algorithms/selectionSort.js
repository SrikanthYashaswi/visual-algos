export const selectionSort = (list) => {
    let changes = [];
    changes.push({ list: [...list], indexChanges: [0, 0] });
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i] > list[j]) {
                const t = list[j];
                list[j] = list[i];
                list[i] = t;
            }
            changes.push({ list: [...list], indexChanges: [i, j] });
        }
    }
    return changes;
}