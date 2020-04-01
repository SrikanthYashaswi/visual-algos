import React from 'react';
import { getRandomNumbers, selectionSort, insertionSort, delayLoop } from './NumberUtil';
import NumberView from './NumberView.js';
import PrettyList from '../components/PrettyList';
import { Properties } from './Constants';

export default class SortingAlgos extends React.Component {

    constructor() {
        super();
        this.state = {
            numbers: [],
            indexChanges: [],
            selectedAlgorithm: Properties.sortingAlgorithms.SELECTION_SORT,
        }
    }

    startSorting() {
        const { selectedAlgorithm } = this.state;
        const algorithm = Properties.sortingAlgorithms;
        let changes = [];
        switch (selectedAlgorithm) {
            case algorithm.SELECTION_SORT: {
                changes = selectionSort(this.state.numbers);
                break;
            }
            case algorithm.INSERTION_SORT: {
                changes = insertionSort(this.state.numbers);
            }
        }
        delayLoop(changes, this.setChangingList.bind(this), Properties.TIME_DELAY);
    }

    setChangingList(change) {
        this.setState({ numbers: change.list, indexChanges: change.indexChanges });
    }

    setRandomNumbers() {
        this.setState({ numbers: getRandomNumbers(1, 100, 80), indexChanges: [] });
    }

    renderSortingTypes() {
        const { selectedAlgorithm } = this.state;
        const algorithmList = Properties.sortingAlgorithms;
        const keys = Object.keys(algorithmList);
        return (
            <select onChange={(event) => { this.setState({ selectedAlgorithm: event.target.value }) }} value={selectedAlgorithm}>
                {keys.map(algorithm => {
                    return <option value={algorithmList[algorithm]}>{algorithmList[algorithm]}</option>
                })}
            </select>
        )
    }

    render() {
        let { numbers, indexChanges } = this.state;
        return (
            <div >
                <div className="input-view">
                    <button onClick={() => this.setState({ numbers: getRandomNumbers(1, 100, 80) })}>Ramdom</button>
                    <PrettyList list={numbers} />
                </div>
                {this.renderSortingTypes()}
                <button onClick={this.startSorting.bind(this)}>Begin Sort...</button>
                <NumberView list={numbers} indexHighlights={indexChanges} />
            </div>
        );
    }
}