import React from 'react';
import {toNumList} from './StringUtil.js';

export default class InputHolder extends React.Component {

    updateList(e){
        const list = toNumList(e.target.value.split(","));
        this.props.onchange(list);
    }

    render(){
        return(
            <div>
                <input className="listInput" onChange={this.updateList.bind(this)} placeholder={this.props.placeholder}></input>
            </div>
        );
    }
}