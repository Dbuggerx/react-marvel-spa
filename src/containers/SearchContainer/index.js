// @flow

import React, { Component } from 'react';
import SearchForm from '../../components/SearchForm';

type Props = {
    onSearchChanged: (param: string) => void,
    lastSearch: string,
};

/**
 * Handles search data
 */
export default class SearchContainer extends Component<Props> {
    handleSearch = (param: string) => {
        if (param.toLowerCase() !== this.props.lastSearch) this.props.onSearchChanged(param);
    };

    render() {
        return <SearchForm lastSearch={this.props.lastSearch} onSearch={this.handleSearch} />;
    }
}
