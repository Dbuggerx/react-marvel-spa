// @flow
import React, { Component } from 'react';
import { fetchHeros, getImageUrl } from '../../services/marvelApi';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingIndicator from '../../components/LoadingIndicator';
import HeroList from '../../components/HeroList';
import HeroDetails from '../../components/HeroDetails';
import Modal from '../../components/Modal';
import CancelablePromise from '../../services/CancelablePromise';
import type { Hero } from '../../services/types';

type State = {
    isLoading: boolean,
    heroes: Hero[],
    error?: string,
    selectedHero: ?Hero,
    selectedHeroImageUrl: ?string,
};

export default class HeroListContainer extends Component<void, State> {
    constructor(props: void) {
        super(props);
        this.state = {
            heroes: [],
            selectedHero: null,
            selectedHeroImageUrl: null,
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

    handleHeroClick = (hero: Hero) => {
        this.setState({
            selectedHero: hero,
            selectedHeroImageUrl: getImageUrl(hero, 'big'),
        });
    };

    handleCloseModal = () => {
        this.setState({
            selectedHero: null,
            selectedHeroImageUrl: null,
        });
    };

    async fetchMarvelHeroes() {
        try {
            this.cancelableFetch = new CancelablePromise(fetchHeros(10));
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
                {this.state.selectedHero && (
                    <Modal title={this.state.selectedHero.name} close={this.handleCloseModal}>
                        <HeroDetails hero={this.state.selectedHero} imageUrl={this.state.selectedHeroImageUrl || ''} />
                    </Modal>
                )}
                <HeroList
                    onHeroClick={this.handleHeroClick}
                    heroes={this.state.heroes}
                    getThumbnailUrl={this.getThumbnailUrl}
                />
            </div>
        );
    }
}
