import React from 'react';
import { shallow } from 'enzyme';
import HeroesContainer from '.';
import { fetchHeros, getImageUrl } from '../../services/marvelApi';

jest.mock('../../services/marvelApi');
const successfulResultMock = {
    code: 200,
    status: 'Ok',
    data: {
        offset: 111,
        limit: 222,
        total: 333,
        count: 444,
        results: [
            {
                id: 1011334,
                name: '3-D Man',
                description: '',
                modified: '2014-04-29T14:18:17-0400',
                thumbnail: {
                    path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
                    extension: 'jpg',
                },
            },
            {
                id: 1017100,
                name: 'A-Bomb (HAS)',
                description:
                    "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ",
                modified: '2013-09-18T15:54:04-0400',
                thumbnail: {
                    path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16',
                    extension: 'jpg',
                },
            },
        ],
    },
};

describe('HeroesContainer', () => {
    beforeEach(() => {
        fetchHeros.mockClear();
        getImageUrl.mockClear();
    });

    describe('render', () => {
        test('renders a loading message', () => {
            // A simple mocked Promise will do to test the loading message
            fetchHeros.mockReturnValue(Promise.resolve());

            const wrapper = shallow(<HeroesContainer />);
            expect(wrapper).toMatchSnapshot();
        });

        test('renders an error message', (done) => {
            // Simulate an error
            fetchHeros.mockReturnValue(Promise.reject(new Error('Testing an error')));

            const wrapper = shallow(<HeroesContainer />);

            process.nextTick(() => {
                wrapper.update();
                expect(wrapper).toMatchSnapshot();
                done();
            });
        });

        test('renders heroes', (done) => {
            // Mock the response from the API
            fetchHeros.mockReturnValue(Promise.resolve(successfulResultMock));

            const wrapper = shallow(<HeroesContainer />);

            process.nextTick(() => {
                wrapper.update();
                expect(wrapper).toMatchSnapshot();
                wrapper.instance().componentWillUnmount();
                done();
            });
        });
    });

    describe('componentDidUpdate', () => {
        test('calls "fetchMarvelHeroes"', () => {
            const wrapper = shallow(<HeroesContainer />);
            const fetchMarvelHeroesSpy = jest.spyOn(wrapper.instance(), 'fetchMarvelHeroes');
            wrapper.setState({
                query: {
                    search: 'Test',
                    offset: 10,
                },
            });
            expect(fetchMarvelHeroesSpy).toHaveBeenCalledTimes(1);
            expect(fetchMarvelHeroesSpy).toHaveBeenCalledWith(10, 'Test');
        });
    });

    describe('componentWillUnmount', () => {
        test('calls "cancel" on CancelablePromise object', () => {
            const wrapper = shallow(<HeroesContainer />);
            const spy = jest.spyOn(wrapper.instance().cancelableFetch, 'cancel');
            wrapper.unmount();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('getThumbnailUrl', () => {
        test('calls "getImageUrl"', () => {
            const wrapper = shallow(<HeroesContainer />);
            const testHero = {};
            wrapper.instance().getThumbnailUrl(testHero);
            expect(getImageUrl).toHaveBeenCalledWith(testHero, 'small');
        });
    });

    describe('handleHeroClick', () => {
        test('renders the Modal with HeroDetails', (done) => {
            // Mock the response from the API
            fetchHeros.mockReturnValue(Promise.resolve(successfulResultMock));
            getImageUrl.mockReturnValue('getImageUrl result');

            const wrapper = shallow(<HeroesContainer />);

            process.nextTick(() => {
                wrapper.instance().handleHeroClick({
                    id: 1011334,
                    name: '3-D Man',
                    description: '',
                    modified: '2014-04-29T14:18:17-0400',
                    thumbnail: {
                        path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
                        extension: 'jpg',
                    },
                });
                expect(wrapper).toMatchSnapshot();
                done();
            });
        });
    });

    describe('handleCloseModal', () => {
        test('changes state', () => {
            const wrapper = shallow(<HeroesContainer />);
            wrapper.setState({
                selection: {
                    hero: {},
                },
            });
            expect(wrapper.state('selection')).not.toBeNull();
            wrapper.instance().handleCloseModal();
            expect(wrapper.state('selection')).toBeNull();
        });
    });

    describe('fetchHeroesPage', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(<HeroesContainer pageSize="10" />);
        });

        test('calls setState setting "offset"', () => {
            wrapper.instance().fetchHeroesPage(3);
            expect(wrapper.state('query')).toEqual({
                offset: 20,
            });
        });

        test('calls setState keeping "search" state', () => {
            wrapper.setState({
                query: {
                    search: 'Test',
                },
            });
            wrapper.instance().fetchHeroesPage(4);
            expect(wrapper.state('query')).toEqual({
                offset: 30,
                search: 'Test',
            });
        });
    });

    describe('handleSearchChanged', () => {
        test('calls setState', () => {
            const wrapper = shallow(<HeroesContainer />);
            wrapper.instance().handleSearchChanged('Testing');
            expect(wrapper.state('query')).toEqual({
                search: 'Testing',
                offset: 0,
            });
        });
    });
});
