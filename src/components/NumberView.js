import React from 'react';
import { maxInList } from './NumberUtil';
import NumberBar from './NumberBar';

export default class NumberView extends React.Component {

    getPercentage() {
        const { list } = this.props;
        const max = maxInList(list);
        let heightPercentage = [];
        list.map(num => {
            heightPercentage.push((num / max * 100));
        });
        return heightPercentage;
    }

    render() {
        const list = this.getPercentage();
        const { indexHighlights, } = this.props;
        return (
            <div className="number-view">
                {list.map((height, index) => {
                    return <NumberBar key={index} height={height} highlight={indexHighlights.includes(index)} />
                })}
            </div>
        )
    }
}