import React from 'react';
import InputHolder from '../components/InputHolder';
import PrettyList from '../components/PrettyList';

export default class RootApp extends React.Component {

    constructor() {
        super();
        this.state = {
            numbers: [],
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
                <InputHolder onchange={this.onChange.bind(this)} />
                <PrettyList list={this.state.numbers} />
            </div>
        )
    }
}