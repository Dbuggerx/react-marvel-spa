// @flow
import React, { Component } from 'react';
import { fetchHeros, getImageUrl } from '../../services/marvelApi';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingIndicator from '../../components/LoadingIndicator';
import HeroList from '../../components/HeroList';
import Modal from '../../components/Modal';
import CancelablePromise from '../../services/CancelablePromise';
import type { Hero } from '../../services/types';

type State = {
    isLoading: boolean,
    heroes: Hero[],
    error?: string,
    modalOpened: boolean,
    selectedHero?: {
        id: string,
        name: string,
    },
};

export default class HeroListContainer extends Component<void, State> {
    constructor(props: void) {
        super(props);
        this.state = {
            heroes: [],
            isLoading: true,
            modalOpened: false,
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

    handleCardClick = (event: SyntheticEvent<HTMLDivElement>) => {
        console.log('EVENT', event.currentTarget.dataset.heroName);
        this.setState({
            modalOpened: true,
            selectedHero: {
                id: event.currentTarget.id,
                name: event.currentTarget.dataset.heroName,
            },
        });
    };

    handleToggleModal = () => {
        this.setState({ modalOpened: !this.state.modalOpened });
    };

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
                {this.state.modalOpened &&
                    this.state.selectedHero && (
                        <Modal title={this.state.selectedHero.name} close={this.handleToggleModal}>
                            Hero details for id : {this.state.selectedHero.id}
                        </Modal>
                    )}
                <HeroList
                    onHeroClick={this.handleCardClick}
                    heroes={this.state.heroes}
                    getThumbnailUrl={this.getThumbnailUrl}
                />
            </div>
        );
    }
}
