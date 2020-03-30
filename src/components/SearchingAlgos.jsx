import React from 'react';
import NumberView from './NumberView';
import InputHolder from '../components/InputHolder';
import PrettyList from '../components/PrettyList';
import { linearSearch, delayLoop } from '../components/NumberUtil';
import { getRandomNumbers } from '../components/NumberUtil';

export default class SearchingAlgos extends React.Component {

    constructor() {
        super();
        this.state = {
            numbers: [],
            toFindNumber: null,
            indexChanges: [],
        }
    }

    setToFindNumber(number) {
        this.setState({ toFindNumber: number });
    }

    simpleSearch() {
        const { toFindNumber, numbers } = this.state;
        if (toFindNumber !== null) {
            const changes = linearSearch(numbers, toFindNumber[0]);
            delayLoop(changes, this.setChanges.bind(this))
        }
    }
    setChanges(change) {
        this.setState({ indexChanges: change.indexChanges });
    }

    render() {
        const { numbers, indexChanges } = this.state;
        return (
            <div>
                <div className="input-view">
                    <button onClick={() => this.setState({ numbers: getRandomNumbers(1, 40, 20) })}>Ramdom</button>
                    <PrettyList list={numbers} />
                </div>
                <InputHolder onchange={this.setToFindNumber.bind(this)} placeholder="Number To Find" />
                <button onClick={this.simpleSearch.bind(this)}>Linear Search</button>
                <NumberView list={numbers} indexHighlights={indexChanges} />
            </div>
        )
    }
}