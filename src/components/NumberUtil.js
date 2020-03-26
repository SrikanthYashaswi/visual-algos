const TIME_DELAY = 0;

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
        let found = (item == toFind);
        callback(i, found);
        return found;
    }, TIME_DELAY);
}

export const binarySearch = (list, toFind, callback) => {
    delayLoop(list, (item, i) => {

    }, TIME_DELAY);
};

const delayLoop = (list, fn, eachDelay) => {
    const listLen = list.length;
    let index = 0;
    let interval = setInterval(() => {
        let found = fn(list[index], index);
        index++;
        if (found || index == listLen) {
            clearInterval(interval);
        }
    }, eachDelay);
}