import React from 'react';
import { getRandomNumbers, delayIndexLoop, getSortEventsForAlgorithm } from './NumberUtil';
import NumberView from './NumberView.js';
import { Properties } from './Constants';
const MACHINE_STATE = {
    PLAY: 'play', PAUSE: 'pause'
}
export default class SortingAlgos extends React.Component {

    constructor() {
        super();
        const initState = this.getInitState();

        this.state = initState.state;

        this.sortEvents = initState.sortEvents;
        this.sortEventIndex = initState.sortEventIndex;
        this.playState = initState.playState;
        this.intervalInstance = null;
        document.addEventListener("keydown", this.handleKey.bind(this), false);
    }

    getInitState() {
        const numbers = getRandomNumbers(10, 100, 30);
        const sortEvents = getSortEventsForAlgorithm(Properties.sortingAlgorithms.SELECTION_SORT, [...numbers]);

        return {
            state: {
                numbers: numbers,
                sortEventIndexChange: [],
                selectedAlgorithm: Properties.sortingAlgorithms.SELECTION_SORT
            },
            sortEvents: sortEvents,
            playState: MACHINE_STATE.PAUSE,
            sortEventIndex: 0
        }
    }

    initialize() {
        const init = this.getInitState();
        this.setState({ ...init.state });

        this.sortEvents = init.sortEvents;
        this.sortEventIndex = init.sortEventIndex;
        this.playState = init.playState;
        clearInterval(this.intervalInstance);
        this.intervalInstance = null;
    }

    handleKey(event) {
        switch (event.keyCode) {
            case Properties.keyPress.SPACEBAR: {
                this.togglePlayPause();
                break;
            }
            case Properties.keyPress.LEFT: {
                this.moveBackward();
                break;
            }
            case Properties.keyPress.RIGHT: {
                this.moveForeward();
                break;
            }
            default: {

            }
        }
    }

    moveForeward() {
        this.sortEventIndex++;
        if (this.sortEventIndex >= this.sortEvents.length) {
            this.sortEventIndex = this.sortEvents.length;
        }
        if (this.sortEventIndex < this.sortEvents.length) {
            const change = this.sortEvents[this.sortEventIndex];
            this.setState({ numbers: change.list, sortEventIndexChange: change.indexChanges });
        }
    }

    moveBackward() {
        this.sortEventIndex--;
        if (this.sortEventIndex <= 0) {
            this.sortEventIndex = 0;
        }
        if (this.sortEventIndex > 0) {
            const change = this.sortEvents[this.sortEventIndex];
            this.setState({ numbers: change.list, sortEventIndexChange: change.indexChanges });
        }
    }

    togglePlayPause() {
        if (this.playState === MACHINE_STATE.PAUSE) {
            this.playChanges();
        }
        else if (this.playState === MACHINE_STATE.PLAY) {
            this.resetPlayState()
        }
    }

    playChanges() {
        this.intervalInstance = delayIndexLoop(this.sortEventIndex,
            this.sortEvents.length, this.moveForeward.bind(this), Properties.TIME_DELAY);
        this.playState = MACHINE_STATE.PLAY;
    }

    resetPlayState() {
        clearInterval(this.intervalInstance);
        this.intervalInstance = null;
        this.playState = MACHINE_STATE.PAUSE;
    }

    setSortingAlgorithm(algorithm) {
        this.setState({ selectedAlgorithm: algorithm });
        this.setSortEvents(algorithm);
    }

    setSortEvents(algorithm) {
        const { numbers } = this.state;
        this.sortEvents = getSortEventsForAlgorithm(algorithm, [...numbers]);
        this.sortEventIndex = 0;
    }

    renderSortingTypes() {
        const { selectedAlgorithm } = this.state;
        const algorithmList = Properties.sortingAlgorithms;
        const keys = Object.keys(algorithmList);
        return (
            <div className="algo-select-holder">
                {keys.map((algorithm, key) => {
                    return <button
                        key={key}
                        className={`algo-select-btn ${selectedAlgorithm === algorithmList[algorithm] ? 'selected' : ''}`}
                        onClick={this.setSortingAlgorithm.bind(this, algorithmList[algorithm])}>
                        {algorithmList[algorithm]}
                    </button>
                })}
            </div>
        )
    }

    render() {
        let { numbers, sortEventIndexChange } = this.state;
        return (
            <div >
                <div className="input-view">
                    <button onClick={this.initialize.bind(this)}>Reset</button>
                </div>
                {this.renderSortingTypes()}
                <button onClick={this.togglePlayPause.bind(this)}>PLAY/PAUSE</button>
                <NumberView list={numbers} indexHighlights={sortEventIndexChange} />
            </div>
        );
    }
}