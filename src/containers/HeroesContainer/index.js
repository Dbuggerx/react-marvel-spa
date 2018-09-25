// @flow
import React, { Component } from 'react';
import { fetchHeros, getImageUrl } from '../../services/marvelApi';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingIndicator from '../../components/LoadingIndicator';
import HeroList from '../../components/HeroList';
import HeroDetails from '../../components/HeroDetails';
import Modal from '../../components/Modal';
import PaginationContainer from '../PaginationContainer';
import CancelablePromise from '../../services/CancelablePromise';
import type { Hero } from '../../services/types';

type Props = {
    pageSize: number,
};

type State = {
    isLoading: boolean,
    heroes: Hero[],
    error?: string,
    selection: ?{
        hero: Hero,
        imageUrl: string,
    },
    pagination: ?{
        offset: number,
        limit: number,
        total: number,
        count: number,
    },
};

export default class HeroListContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            heroes: [],
            isLoading: true,
            selection: null,
            pagination: null,
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
            selection: {
                hero,
                imageUrl: getImageUrl(hero, 'big'),
            },
        });
    };

    handleCloseModal = () => {
        this.setState({
            selection: null,
        });
    };

    fetchHeroesPage = (page: number) => {
        this.fetchMarvelHeroes({
            offset: this.props.pageSize * (page - 1),
        });
    };

    async fetchMarvelHeroes(params?: { offset: number, nameStartsWith?: string }) {
        try {
            this.cancelableFetch = new CancelablePromise(fetchHeros({
                limit: this.props.pageSize,
                ...params,
            }));
            const heroesResult = await this.cancelableFetch.promise;
            this.setState({
                heroes: heroesResult.data.results,
                isLoading: false,
                pagination: {
                    offset: heroesResult.data.offset,
                    limit: heroesResult.data.limit,
                    total: heroesResult.data.total,
                    count: heroesResult.data.count,
                },
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
                {this.state.selection && (
                    <Modal title={this.state.selection.hero.name} close={this.handleCloseModal}>
                        <HeroDetails hero={this.state.selection.hero} imageUrl={this.state.selection.imageUrl} />
                    </Modal>
                )}
                <HeroList
                    onHeroClick={this.handleHeroClick}
                    heroes={this.state.heroes}
                    getThumbnailUrl={this.getThumbnailUrl}
                />
                {this.state.pagination && (
                    <PaginationContainer {...this.state.pagination} goToPage={this.fetchHeroesPage} />
                )}
            </div>
        );
    }
}
