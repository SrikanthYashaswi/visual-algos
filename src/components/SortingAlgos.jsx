import React from 'react';
import { delayOperation, getRandomNumbers } from './NumberUtil';
import NumberView from './NumberView';
import PrettyList from '../components/PrettyList';

export default class SortingAlgos extends React.Component {

    constructor() {
        super();
        this.state = {
            numbers: [],
            indexChanges: [],
        }
    }

    bubbleSort() {
        delayOperation(this.state.numbers, this.setChangingList.bind(this));
    }

    setChangingList(change) {
        this.setState({ numbers: change.list, indexChanges: change.indexChanges });
    }

    render() {
        let { numbers, indexChanges } = this.state;
        return (
            <div>
                <div className="input-view">
                    <button onClick={() => this.setState({ numbers: getRandomNumbers(1, 100, 80) })}>Ramdom</button>
                    <PrettyList list={numbers} />
                </div>
                <button onClick={this.bubbleSort.bind(this)}>Bubble Sort</button>
                <NumberView list={numbers} indexHighlights={indexChanges} />
            </div>
        );
    }
}