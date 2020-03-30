import React from 'react';
import InputHolder from '../components/InputHolder';
import PrettyList from '../components/PrettyList';
import { Properties } from '../components/Constants';
import SearchingAlgos from '../components/SearchingAlgos';
import SortingAlgos from '../components/SortingAlgos';



export default class RootApp extends React.Component {

    constructor() {
        super();
        this.state = {
            numbers: [],
        }
    }

    render() {
        return (
            <div>
                <SearchingAlgos />
                <SortingAlgos list={this.state.numbers} />
            </div>
        )
    }
}