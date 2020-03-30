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

export const linearSearch = (list, toFind, callback) => {
    delayLoop(list, (item, i) => {
        let found = (item === toFind);
        callback(i, found);
        return found;
    }, TIME_DELAY);
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

export const delayOperation = (list, emitChange) => {
    let changes = [];
    bubbleSort(list, (change) => changes.push(change));
    delayLoopMap(changes, (key, value) => {
        emitChange(value);
    }, 20);
}

export const bubbleSort = (list, emitChange) => {
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i] > list[j]) {
                const t = list[j];
                list[j] = list[i];
                list[i] = t;
            }
            emitChange({ list: [...list], indexChanges: [i, j] });
        }
    }
    return list;
}

const delayLoop = (list, fn, eachDelay) => {
    const listLen = list.length;
    let index = 0;
    let interval = setInterval(() => {
        let found = fn(list[index], index);
        index++;
        if (found || index === listLen) {
            clearInterval(interval);
        }
    }, eachDelay);
}

const delayLoopMap = (map, fn, eachDelay) => {
    const keys = Object.keys(map);
    const length = keys.length;
    let index = 0;
    let interval = setInterval(() => {
        const key = keys[index++];
        const value = map[key];

        fn(key, value);
        console.log(`${index} ${length}`)
        if (index === length) {
            clearInterval(interval);
        }
    }, eachDelay);
}