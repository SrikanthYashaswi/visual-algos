import React from 'react';
import { getRandomNumbers, selectionSort, insertionSort, delayLoop, delayIndexLoop } from './NumberUtil';
import NumberView from './NumberView.js';
import PrettyList from '../components/PrettyList';
import { Properties } from './Constants';
const MACHINE_STATE = {
    PLAY: 'play', PAUSE: 'pause'
}
export default class SortingAlgos extends React.Component {

    constructor() {
        super();
        this.state = {
            numbers: [],
            indexChanges: [],
            selectedAlgorithm: Properties.sortingAlgorithms.SELECTION_SORT,
        }
        this.changeListIndex = 0;
        this.intervalInstance = null;
        this.sortingChanges = null;
        this.playState = MACHINE_STATE.PAUSE;
    }

    componentWillMount() {
        document.addEventListener("keydown", this.handleKey.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKey.bind(this), false);
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
        }
    }

    moveForeward() {
        if (this.changeListIndex < this.sortingChanges.length) {
            const change = this.sortingChanges[this.changeListIndex++];
            this.setState({ numbers: change.list, indexChanges: change.indexChanges });
        }
    }

    moveBackward() {
        if (this.changeListIndex > 0) {
            const change = this.sortingChanges[this.changeListIndex--];
            this.setState({ numbers: change.list, indexChanges: change.indexChanges });
        }
    }

    togglePlayPause() {
        if (this.playState === MACHINE_STATE.PAUSE) {
            this.playChanges();
            this.playState = MACHINE_STATE.PLAY;
        }
        else if (this.playState === MACHINE_STATE.PLAY) {
            clearInterval(this.intervalInstance);
            this.intervalInstance = null;
            this.playState = MACHINE_STATE.PAUSE;
        }
    }

    playChanges() {
        if (this.sortingChanges === null) {
            this.sortingChanges = this.getSortingChanges();
        }
        this.intervalInstance = delayIndexLoop(this.changeListIndex,
            this.sortingChanges.length, this.moveForeward.bind(this), Properties.TIME_DELAY);
    }

    getSortingChanges() {
        const { selectedAlgorithm } = this.state;
        const algorithm = Properties.sortingAlgorithms;
        switch (selectedAlgorithm) {
            case algorithm.SELECTION_SORT: {
                return selectionSort(this.state.numbers);
            }
            case algorithm.INSERTION_SORT: {
                return insertionSort(this.state.numbers);
            }
        }
    }

    setSortingAlgorithm(algorithm) {
        this.setState({ selectedAlgorithm: algorithm });
    }

    setRandomNumbers() {
        this.setState({ numbers: getRandomNumbers(1, 100, 80), indexChanges: [] });
        this.sortingChanges = null;
        this.changeListIndex = 0;
        this.playState = MACHINE_STATE.PAUSE;
    }


    renderSortingTypes() {
        const { selectedAlgorithm } = this.state;
        const algorithmList = Properties.sortingAlgorithms;
        const keys = Object.keys(algorithmList);
        return (
            <div className="algo-select-holder">
                {keys.map(algorithm => {
                    return <button
                        className={`algo-select-btn ${selectedAlgorithm == algorithmList[algorithm] ? 'selected': ''}`}
                        onClick={this.setSortingAlgorithm.bind(this, algorithmList[algorithm])}>
                        {algorithmList[algorithm]}
                    </button>
                })}
            </div>
        )
    }

    render() {
        let { numbers, indexChanges } = this.state;
        return (
            <div >
                <div className="input-view">
                    <button onClick={this.setRandomNumbers.bind(this)}>Ramdom</button>
                    <PrettyList list={numbers} />
                </div>
                {this.renderSortingTypes()}
                <button onClick={this.togglePlayPause.bind(this)}>PLAY/PAUSE</button>
                <NumberView list={numbers} indexHighlights={indexChanges} />
            </div>
        );
    }
}