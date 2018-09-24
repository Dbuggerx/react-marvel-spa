// @flow

import React from 'react';
import type { StatelessFunctionalComponent } from 'react';
import './Pagination.scss';

export type Props = {
    currentPage: number,
    pageCount: number,
    goToPreviousPage: () => void,
    goToNextPage: () => void,
};

const Pagination: StatelessFunctionalComponent<Props> = (props: Props) => (
    <nav aria-label="Pagination Navigation">
        <button onClick={props.goToPreviousPage} aria-label="Go to previous page">
            back
        </button>
        Showing page {props.currentPage} of {props.pageCount}
        <button onClick={props.goToNextPage} aria-label="Go to next page">
            forward
        </button>
    </nav>
);

Pagination.displayName = 'Pagination';

export default Pagination;
