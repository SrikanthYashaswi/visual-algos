export const gnomeSort = (list) => {
    let changes = [];
    changes.push({list: [...list], indexChanges: [0, 0]});
    let i = 0;

    while (i < list.length) {
        if (i === 0)
            i++;
        if (list[i] >= list[i - 1])
            i++;
        else {
            const temp = list[i];
            list[i] = list[i - 1];
            list[i - 1] = temp;

            changes.push({list: [...list], indexChanges: [i, i - 1]});
            i--;
        }
    }

    return changes;
}
