import React from 'react';
import NumberView from './NumberView';
import InputHolder from './InputHolder';
import {linearSearch} from '../components/NumberUtil';
export default class SearchingAlgos extends React.Component {

    constructor(){
        super();
        this.state={
            toFindNumber: null,
            searchIndex: -1,
            searchMatch: false
        }
    }

    setToFindNumber(number){
        this.setState({toFindNumber: number});
    }

    simpleSearch(){
        const {toFindNumber} = this.state;
        const {list} = this.props;
        linearSearch(list, toFindNumber[0],this.notifySearchIndex.bind(this))
    }

    notifySearchIndex(index, match){
        this.setState({searchIndex: index , searchMatch: match});
    }

    render(){
        const {searchIndex, searchMatch} = this.state;
        return(
            <div>
                <InputHolder onchange={this.setToFindNumber.bind(this)} placeholder="Number To Find"/>
                <button onClick={this.simpleSearch.bind(this)}>Linear Search</button>
                <NumberView list={this.props.list} highlightIndex={searchIndex}/>
            </div>
        )
    }
}