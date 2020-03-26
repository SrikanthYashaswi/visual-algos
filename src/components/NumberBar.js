import React from 'react';

export default class NumberBar extends React.Component {
    render(){
        const {height, highlight} = this.props;
        let styles = {height: height };
        if(highlight){
            styles['backgroundColor'] = 'yellow';
        }
        return <div className="number-view-bar" style={styles} ></div>
    }
}