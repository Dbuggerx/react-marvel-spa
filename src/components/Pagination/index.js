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

/**
 * Renders a pagination section
 */
const Pagination: StatelessFunctionalComponent<Props> = (props: Props) => (
    <React.Fragment>
        <svg width="0" height="0" viewBox="0 0 8 12">
            <defs>
                <path id="chevron-left" d="M 7.41,10.58 2.83,6 7.41,1.41 6,0 0,6 6,12 Z" />
            </defs>
        </svg>
        <nav className="pagination" aria-label="Pagination Navigation">
            <button
                className="pagination__prev-button"
                onClick={props.goToPreviousPage}
                aria-label="Go to previous page"
            >
                <svg viewBox="0 0 8 12">
                    <use xlinkHref="#chevron-left" />
                </svg>
            </button>
            Showing page {props.currentPage} of {props.pageCount}
            <button className="pagination__next-button" onClick={props.goToNextPage} aria-label="Go to next page">
                <svg viewBox="0 0 8 12">
                    <use xlinkHref="#chevron-left" />
                </svg>
            </button>
        </nav>
    </React.Fragment>
);

Pagination.displayName = 'Pagination';

export default Pagination;
