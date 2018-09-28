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
    attribution: string,
};

export default class HeroListContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            heroes: [],
            isLoading: true,
            selection: null,
            pagination: null,
            attribution: 'Data provided by Marvel. © 2014 Marvel',
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

    handleSearchChanged = (param: string) => {
        this.fetchHeroesPage(1, param);
    };

    fetchHeroesPage = (page: number, searchParam?: string) => {
        this.fetchMarvelHeroes({
            offset: this.props.pageSize * (page - 1),
            ...(searchParam && searchParam.length > 0 ? { nameStartsWith: searchParam } : {}),
        });
    };

    async fetchMarvelHeroes(params?: { offset: number, nameStartsWith?: string }) {
        this.setState({
            isLoading: true,
        });

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
                    search={<SearchContainer onSearchChanged={this.handleSearchChanged} />}
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
