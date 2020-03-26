import React from 'react';
import InputHolder from '../components/InputHolder';
import PrettyList from '../components/PrettyList';
import {Properties} from '../components/Constants';
import SearchingAlgos from '../components/SearchingAlgos';
export default class RootApp extends React.Component {

    constructor() {
        super();
        this.state = {
            numbers: [],
            selectedComponent: Properties.component.SEARCHING
        }
    }

    onChange(input) {
        this.setState({numbers: input});
        console.log(input);
    }

    returnPrettyList(){
        return(
            <div>
                {this.state.numbers}
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="input-view">
                    <InputHolder onchange={this.onChange.bind(this)} placeholder="Enter Array"/>
                    <PrettyList list={this.state.numbers} />
                </div>
                <SearchingAlgos list={this.state.numbers}/>
            </div>
        )
    }
}