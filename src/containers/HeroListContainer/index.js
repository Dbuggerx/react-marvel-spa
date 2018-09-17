// @flow

import React, { Component } from 'react';
import { fetchHeros, getImageUrl } from '../../services/marvelApi';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingIndicator from '../../components/LoadingIndicator';
import HeroList from '../../components/HeroList';
import CancelablePromise from '../../services/CancelablePromise';
import type { Hero } from '../../services/types';

type State = {
    isLoading: boolean,
    heroes: Hero[],
    error?: string,
};

export default class HeroListContainer extends Component<void, State> {
    constructor(props: void) {
        super(props);
        this.state = {
            heroes: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        this.fetchMarvelHeroes();
    }

    componentWillUnmount() {
        if (this.cancelableFetch) {
            this.cancelableFetch.cancel();
        }
    }

    getThumbnailUrl = (hero: Hero) => getImageUrl(hero, 'small');

    cancelableFetch: *;

    async fetchMarvelHeroes() {
        try {
            this.cancelableFetch = new CancelablePromise(fetchHeros());
            const heroesResult = await this.cancelableFetch.promise;
            this.setState({
                heroes: heroesResult.data.results,
                isLoading: false,
            });
        } catch (error) {
            if (error.message !== CancelablePromise.errorMessage) {
                this.setState({
                    error: 'Error loading heroes',
                });
            }
        }
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage message={this.state.error} />;
        }
        if (this.state.isLoading) {
            return <LoadingIndicator />;
        }
        return (
            <div>
                <HeroList heroes={this.state.heroes} getThumbnailUrl={this.getThumbnailUrl} />
            </div>
        );
    }
}
