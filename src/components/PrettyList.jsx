import React from 'react';

export default class PrettyList extends React.Component {

    render() {
        return (
            <div className="pretty-list">
                [{this.props.list.join(",")}]
            </div>
        )
    }
}
