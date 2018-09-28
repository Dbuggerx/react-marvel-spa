// @flow

import React, { Component } from 'react';
import './NameList.scss';

type Props = {
    names: string[],
    collectionName: string,
};

type State = {
    filterParam: string,
};

/**
 * Renders a filterable collection of strings
 */
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
            <section className="name-list">
                <h2 className="name-list__title">{this.props.collectionName}</h2>
                <aside className="name-list__filter">
                    Filter:
                    <input
                        type="text"
                        value={this.state.filterParam}
                        onChange={this.handleFilterChange}
                        className="name-list__filter-input"
                    />
                </aside>
                {(this.state.filterParam.length > 0
                    ? uniqueItems.filter(name => name.toLowerCase()
                        .indexOf(this.state.filterParam.toLowerCase()) !== -1)
                    : uniqueItems
                ).map(name => (
                    <div key={name} className="name-list__item">{name}</div>
                ))}
            </section>
        );
    }
}
