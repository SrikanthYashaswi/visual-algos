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
                sortEventIndex: 0,
                selectedAlgorithm: Properties.sortingAlgorithms.SELECTION_SORT
            },
            sortEvents: sortEvents,
            playState: MACHINE_STATE.PAUSE,
        }
    }

    initialize() {
        const init = this.getInitState();
        this.setState({ ...init.state });

        this.sortEvents = init.sortEvents;
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
        const { sortEventIndex } = this.state;
        if (sortEventIndex < this.sortEvents.length - 1)
            this.setState({ sortEventIndex: sortEventIndex + 1 })
    }

    moveBackward() {
        const { sortEventIndex } = this.state;
        if (sortEventIndex - 1 >= 0)
            this.setState({ sortEventIndex: sortEventIndex - 1 })
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
        this.setState({ sortEventIndex: 0 });
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
        const { sortEventIndex } = this.state;
        const change = this.sortEvents[sortEventIndex];
        return (
            <div >
                <div className="input-view">
                    <button onClick={this.initialize.bind(this)}>Reset</button>
                </div>
                {this.renderSortingTypes()}
                <button onClick={this.togglePlayPause.bind(this)}>PLAY/PAUSE</button>
                <NumberView list={change.list} indexHighlights={change.indexChanges} />
            </div>
        );
    }
}