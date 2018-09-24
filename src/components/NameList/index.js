// @flow

import React, { Component } from 'react';

type Props = {
    names: string[],
};

type State = {
    filterParam: string,
};

export default class NameList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { filterParam: '' };
    }

    handleFilterChange = (event: SyntheticEvent<HTMLInputElement>) => {
        this.setState({
            filterParam: event.currentTarget.value,
        });
    };

    render() {
        const uniqueItems = this.props.names.reduce((acc, cur) => {
            if (acc.indexOf(cur) === -1) acc.push(cur);
            return acc;
        }, []);

        return (
            <div>
                Filter:
                <input
                    type="text"
                    placeholder="Filter"
                    value={this.state.filterParam}
                    onChange={this.handleFilterChange}
                />
                {(this.state.filterParam.length > 0
                    ? uniqueItems.filter(name => name.toLowerCase()
                        .indexOf(this.state.filterParam.toLowerCase()) !== -1)
                    : uniqueItems
                ).map(name => (
                    <div key={name}>{name}</div>
                ))}
            </div>
        );
    }
}
