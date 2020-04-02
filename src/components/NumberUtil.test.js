import { delayIndexLoop } from "./NumberUtil";

test('adds 1 + 2 to equal 3', () => {
    let count = 0;
    delayIndexLoop(0,4, (i) => {console.log(i)},0)
});

