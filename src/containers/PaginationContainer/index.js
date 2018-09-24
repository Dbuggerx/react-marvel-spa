// @flow

import React, { Component } from 'react';
import Pagination from '../../components/Pagination';

type Props = {
    offset: number,
    limit: number,
    total: number,
    goToPage: (page: number) => void,
};

export default class PaginationContainer extends Component<Props> {
    get pageCount() {
        return Math.ceil(this.props.total / this.props.limit);
    }

    get currentPage() {
        return Math.ceil(this.pageCount - ((this.props.total - this.props.offset) / this.props.limit));
    }

    goToPreviousPage = () => {
        if (this.currentPage === 1) return;
        this.props.goToPage(this.currentPage - 1);
    };

    goToNextPage = () => {
        if (this.currentPage === this.pageCount) return;
        this.props.goToPage(this.currentPage + 1);
    };

    render() {
        return (
            <Pagination
                pageCount={this.pageCount}
                currentPage={this.currentPage}
                goToNextPage={this.goToNextPage}
                goToPreviousPage={this.goToPreviousPage}
            />
        );
    }
}
