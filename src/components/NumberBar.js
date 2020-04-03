import React from 'react';

export default class NumberBar extends React.Component {
    render() {
        const { height, highlight, value } = this.props;
        let bottomBarStyle = { height: height+"%" };
        let topBarStyle = { height: (100 - height)+"%"};

        return (
            <div className="number-view-bar">
                <div className="top" style={topBarStyle} ></div>
                <div className={`bottom ${highlight ? 'highlight': ''}`} style={bottomBarStyle} ></div>
            </div>
        )
    }
}