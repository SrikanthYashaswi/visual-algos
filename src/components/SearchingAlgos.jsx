import React from 'react';
import NumberView from './NumberView';
import InputHolder from '../components/InputHolder';
import PrettyList from '../components/PrettyList';
import { linearSearch } from '../components/NumberUtil';
import { getRandomNumbers } from '../components/NumberUtil';

export default class SearchingAlgos extends React.Component {

    constructor() {
        super();
        this.state = {
            numbers: [],
            toFindNumber: null,
            searchIndex: -1,
            searchMatch: false
        }
    }

    setToFindNumber(number) {
        this.setState({ toFindNumber: number });
    }

    simpleSearch() {
        const { toFindNumber, numbers } = this.state;
        if (toFindNumber !== null) {
            linearSearch(numbers, toFindNumber[0], this.notifySearchIndex.bind(this))
        }
    }
    notifySearchIndex(index, match) {
        this.setState({ searchIndex: index, searchMatch: match });
    }

    render() {
        const { searchIndex, searchMatch, numbers } = this.state;
        return (
            <div>
                <div className="input-view">
                    <button onClick={() => this.setState({ numbers: getRandomNumbers(1, 40, 20) })}>Ramdom</button>
                    <PrettyList list={numbers} />
                </div>
                <InputHolder onchange={this.setToFindNumber.bind(this)} placeholder="Number To Find" />
                <button onClick={this.simpleSearch.bind(this)}>Linear Search</button>
                <NumberView list={numbers} highlightIndex={searchIndex} match={searchMatch} />
            </div>
        )
    }
}