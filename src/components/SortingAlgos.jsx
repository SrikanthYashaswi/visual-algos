import React from 'react';
import { getRandomNumbers, selectionSort, delayLoop } from './NumberUtil';
import NumberView from './NumberView.js';
import PrettyList from '../components/PrettyList';

export default class SortingAlgos extends React.Component {

    constructor() {
        super();
        this.state = {
            numbers: [],
            indexChanges: [],
        }
    }

    selectionSort() {
        const changes = selectionSort(this.state.numbers);
        delayLoop(changes, this.setChangingList.bind(this), 200);
    }

    setChangingList(change) {
        this.setState({ numbers: change.list, indexChanges: change.indexChanges });
    }

    setRandomNumbers() {
        this.setState({ numbers: getRandomNumbers(1, 100, 80) , indexChanges: []});
    }

    render() {
        let { numbers, indexChanges } = this.state;
        return (
            <div>
                <div className="input-view">
                    <button onClick={() => this.setState({ numbers: getRandomNumbers(1, 100, 80) })}>Ramdom</button>
                    <PrettyList list={numbers} />
                </div>
                <button onClick={this.selectionSort.bind(this)}>Selection Sort</button>
                <NumberView list={numbers} indexHighlights={indexChanges} />
            </div>
        );
    }
}