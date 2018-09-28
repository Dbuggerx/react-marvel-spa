// @flow

import React, { Component } from 'react';
import './SearchForm.scss';

type Props = {
    onSearch: (searchParam: string) => void,
    lastSearch: string,
};

type State = {
    searchParam: string,
};

/**
 * Renders a simple Form to search for heroes
 */
export default class SearchForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { searchParam: props.lastSearch };
    }

    handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
        this.setState({
            searchParam: event.currentTarget.value,
        });
    };

    handleSubmit = (event: SyntheticEvent<*>) => {
        event.preventDefault();
        this.props.onSearch(this.state.searchParam);
    };

    handleReset = (event: SyntheticEvent<*>) => {
        event.preventDefault();
        this.setState({
            searchParam: '',
        });
        this.props.onSearch('');
    };

    render() {
        return (
            <form className="search-form" onSubmit={this.handleSubmit}>
                <svg width="0" height="0" viewBox="0 0 18.43 18.43">
                    <defs>
                        <path
                            id="broom"
                            d="m 17.01,0 1.42,1.42 -5.72,5.71 c 1.07,1.54 1.22,3.39 0.32,4.59 L 6.71,5.4 C 7.91,4.5 9.76,4.65 11.3,5.72 L 17.01,0 M 3.58,14.85 C 1.57,12.84 0.34,10.44 0,8.2 l 4.88,-2.09 7.44,7.44 -2.09,4.88 C 7.99,18.09 5.59,16.86 3.58,14.85 Z"
                        />
                        <path
                            id="search"
                            d="M 6.5,0 A 6.5,6.5 0 0 1 13,6.5 c 0,1.61 -0.59,3.09 -1.56,4.23 L 11.71,11 h 0.79 l 5,5 -1.5,1.5 -5,-5 V 11.71 L 10.73,11.44 C 9.59,12.41 8.11,13 6.5,13 A 6.5,6.5 0 0 1 0,6.5 6.5,6.5 0 0 1 6.5,0 m 0,2 C 4,2 2,4 2,6.5 2,9 4,11 6.5,11 9,11 11,9 11,6.5 11,4 9,2 6.5,2 Z"
                        />
                    </defs>
                </svg>

                <label className="search-form__label" htmlFor="search-param">
                    Search:
                </label>
                <input
                    className="search-form__input"
                    id="search-param"
                    type="text"
                    value={this.state.searchParam}
                    onChange={this.handleChange}
                />
                <button className="search-form__button" type="submit" title="Search">
                    <svg viewBox="0 0 17.5 17.5">
                        <use xlinkHref="#search" />
                    </svg>
                </button>
                <button className="search-form__button" onClick={this.handleReset} title="Reset search">
                    <svg viewBox="0 0 17.5 17.5">
                        <use xlinkHref="#broom" />
                    </svg>
                </button>
            </form>
        );
    }
}
