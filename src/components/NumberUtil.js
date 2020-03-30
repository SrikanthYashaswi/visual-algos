const TIME_DELAY = 50;

export const maxInList = (list) => {
    let max = -1;
    list.map(num => {
        if (num > max) {
            max = num;
        }
    })
    return max;
}

export const linearSearch = (list, toFind) => {
    let changes = [];
    for (let i = 0; i < list.length; i++) {
        changes.push({ indexChanges: [i] })
        if (toFind === list[i]) {
            break;
        }
    }
    return changes;
}

export const getRandomNumbers = (start, end, n) => {
    let numbers = []
    let rand;
    let range = end - start;

    while (n >= 0) {
        rand = start + ((Math.random() * 10000).toFixed() % range);
        if (numbers.indexOf(rand) === -1) {
            numbers.push(rand)
            n--;
        }
    }
    return numbers;
}

export const selectionSort = (list) => {
    let changes = [];
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

export const delayLoop = (list, fn, eachDelay) => {
    const listLen = list.length;
    let index = 0;
    let interval = setInterval(() => {
        fn(list[index], index);
        index++;
        if (index === listLen) {
            clearInterval(interval);
        }
    }, eachDelay);
}