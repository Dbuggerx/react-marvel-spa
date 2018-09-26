// @flow

import React, { Component } from 'react';

type Props = {
    onSearch: (searchParam: string) => void,
};

type State = {
    searchParam: string,
};

export default class SearchForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { searchParam: '' };
    }

    handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
        this.setState({
            searchParam: event.currentTarget.value,
        });
    };

    handleSubmit = (event: SyntheticEvent<*>) => {
        event.preventDefault();
        this.props.onSearch(this.state.searchParam);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="search-param">Search:</label>
                <input id="search-param" type="text" value={this.state.searchParam} onChange={this.handleChange} />
                <button type="submit">Go</button>
            </form>
        );
    }
}
