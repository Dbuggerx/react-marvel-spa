// @flow

import React, { Component } from 'react';
import SearchForm from '../../components/SearchForm';

type Props = {
    onSearchChanged: (param: string) => void,
};

export default class SearchContainer extends Component<Props> {
    lastSearch: string;

    handleSearch = (param: string) => {
        if (param.toLowerCase() !== this.lastSearch) this.props.onSearchChanged(param);
    };

    render() {
        return <SearchForm onSearch={this.handleSearch} />;
    }
}
