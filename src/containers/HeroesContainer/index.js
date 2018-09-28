// @flow
import React, { Component } from 'react';
import { fetchHeros, getImageUrl } from '../../services/marvelApi';
import MainLayout from '../../components/MainLayout';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingIndicator from '../../components/LoadingIndicator';
import HeroList from '../../components/HeroList';
import HeroDetails from '../../components/HeroDetails';
import Information from '../../components/Information';
import Modal from '../../components/Modal';
import PaginationContainer from '../PaginationContainer';
import SearchContainer from '../SearchContainer';
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
    query: ?{
        search?: string,
        offset: number,
    },
    attribution: string,
};

/**
 * Handles the data for the Heroes and passes props to children components
 */
export default class HeroListContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            heroes: [],
            isLoading: true,
            selection: null,
            pagination: null,
            query: null,
            attribution: 'Data provided by Marvel. © 2014 Marvel',
        };
    }

    componentDidMount() {
        this.fetchMarvelHeroes();
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (this.state.query && this.state.query !== prevState.query) {
            this.fetchMarvelHeroes(this.state.query.offset, this.state.query.search || '');
        }
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

    handleSearchChanged = (param: string) => {
        this.setState({
            query: {
                search: param,
                offset: 0,
            },
        });
    };

    fetchHeroesPage = (page: number) => {
        this.setState({
            query: {
                ...this.state.query,
                offset: this.props.pageSize * (page - 1),
            },
        });
    };

    async fetchMarvelHeroes(offset: number = 0, nameStartsWith: string = '') {
        this.setState({
            isLoading: true,
        });

        try {
            // Wrapping the result promise in a "CancelablePromise", in order to be safe to unmount
            this.cancelableFetch = new CancelablePromise(fetchHeros({
                limit: this.props.pageSize,
                offset,
                nameStartsWith,
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
                attribution: heroesResult.attributionText,
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
            <React.Fragment>
                {this.state.selection && (
                    <Modal title={this.state.selection.hero.name} onClose={this.handleCloseModal}>
                        <HeroDetails hero={this.state.selection.hero} imageUrl={this.state.selection.imageUrl} />
                    </Modal>
                )}
                <MainLayout
                    search={
                        <SearchContainer
                            lastSearch={this.state.query ? this.state.query.search || '' : ''}
                            onSearchChanged={this.handleSearchChanged}
                        />
                    }
                    list={
                        <HeroList
                            onHeroClick={this.handleHeroClick}
                            heroes={this.state.heroes}
                            getThumbnailUrl={this.getThumbnailUrl}
                        />
                    }
                    pagination={
                        this.state.heroes.length > 0 &&
                        this.state.pagination && (
                            <PaginationContainer {...this.state.pagination} goToPage={this.fetchHeroesPage} />
                        )
                    }
                    info={<Information attribution={this.state.attribution} />}
                />
            </React.Fragment>
        );
    }
}
