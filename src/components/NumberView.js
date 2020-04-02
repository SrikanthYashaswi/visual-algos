import React from 'react';
import NumberBar from './NumberBar';

export default class NumberView extends React.Component {

    getPercentage() {
        const { list } = this.props;
        const max = Math.max(...list);
        let heightPercentage = list.map(num => {
            return (num / max * 100);
        });
        return heightPercentage;
    }

    render() {
        const {list} = this.props;
        const modifiedList = this.getPercentage();
        const { indexHighlights, } = this.props;
        return (
            <div className="number-view">
                {modifiedList.map((height, index) => {
                    return <NumberBar key={index} height={height} value={list[index]} highlight={indexHighlights.includes(index)} />
                })}
            </div>
        )
    }
}