import React from 'react';
import { getRandomNumbers, delayIndexLoop } from './NumberUtil';
import NumberView from './NumberView.js';
import { Properties } from './Constants';
import { sortingAlgorithms, getSortEventsForAlgorithm } from '../algorithms/SortingAlgorithmUtil';
const MACHINE_STATE = {
    PLAY: 'play', PAUSE: 'pause'
}
export default class SortingAlgos extends React.Component {

    constructor() {
        super();
        const initState = this.getInitState();

        this.state = initState.state;

        this.sortEvents = initState.sortEvents;
        this.intervalInstance = null;
        document.addEventListener("keydown", this.handleKey.bind(this), false);
    }

    getInitState() {
        const numbers = getRandomNumbers(10, 300, 200);
        const sortEvents = getSortEventsForAlgorithm(sortingAlgorithms.SELECTION_SORT, [...numbers]);

        return {
            state: {
                numbers: numbers,
                sortEventIndexChange: [],
                sortEventIndex: 0,
                selectedAlgorithm: sortingAlgorithms.SELECTION_SORT,
                playState: MACHINE_STATE.PAUSE
            },
            sortEvents: sortEvents,
        }
    }

    initialize() {
        const init = this.getInitState();
        this.setState({ ...init.state });

        this.sortEvents = init.sortEvents;
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
        if (this.state.playState === MACHINE_STATE.PAUSE) {
            this.playChanges();
        }
        else if (this.state.playState === MACHINE_STATE.PLAY) {
            this.resetPlayState()
        }
    }

    playChanges() {
        this.intervalInstance = delayIndexLoop(this.state.sortEventIndex,
            this.sortEvents.length, this.moveForeward.bind(this), Properties.TIME_DELAY);
        this.setState({playState: MACHINE_STATE.PLAY});
    }

    resetPlayState() {
        clearInterval(this.intervalInstance);
        this.intervalInstance = null;
        this.setState({playState: MACHINE_STATE.PAUSE});
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
        const algorithmList = sortingAlgorithms;
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
                {this.renderSortingTypes()}
                <NumberView list={change.list} indexHighlights={change.indexChanges} />
                <center>
                    <button className="playpause-btn" onClick={this.moveBackward.bind(this)}>⬅️</button>
                    <button className="playpause-btn" onClick={this.togglePlayPause.bind(this)}>{this.state.playState === MACHINE_STATE.PAUSE ? '▶️' : '⏸'}</button>
                    <button className="playpause-btn" onClick={this.moveForeward.bind(this)}>➡️</button>
                </center>
                <center>
                    <button className="playpause-btn" onClick={this.initialize.bind(this)}>🔄</button>
                </center>
                <center>
                    <span style={{ fontFamily: "monospace" }}> [Play. Pause. Use Arrows. Learn.]</span>
                </center>
            </div>
        );
    }
}