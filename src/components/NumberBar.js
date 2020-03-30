import React from 'react';

export default class NumberBar extends React.Component {
    render() {
        const { height, highlight, match } = this.props;
        let bottomBarStyle = { height: height+"%" };
        let topBarStyle = { height: (100 - height)+"%"};

        if (highlight) {
            bottomBarStyle['backgroundColor'] = match ? '#33ff33' : 'red';
        }

        return (
            <div className="number-view-bar">
                <div className="top" style={topBarStyle} ></div>
                <div className="bottom" style={bottomBarStyle} ></div>
            </div>
        )
    }
}