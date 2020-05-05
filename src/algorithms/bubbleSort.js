export const bubbleSort = (list) => {
    let changes = [];
    changes.push({ list: [...list], indexChanges: [0, 0] });
    for (let i = 0; i < list.length-1; i++) {
        for (let j = 0; j < list.length-i-1; j++) {
            if (list[j] > list[j+1]) {
                const t = list[j];
                list[j] = list[j+1];
                list[j+1] = t;
            }
            changes.push({ list: [...list], indexChanges: [j, j+1] });
        }
    }
    return changes;
}

