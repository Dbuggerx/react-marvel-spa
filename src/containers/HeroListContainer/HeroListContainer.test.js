import React from 'react';
import TestRenderer from 'react-test-renderer';
import HeroListContainer from './index';
import { fetchHeros, getImageUrl } from '../../services/marvelApi';

jest.mock('../../services/marvelApi');

describe('HeroListContainer', () => {
    beforeEach(() => {
        fetchHeros.mockClear();
        getImageUrl.mockClear();
    });

    test('it renders a loading message', () => {
        // A simple mocked Promise will do to test the loading message
        fetchHeros.mockReturnValue(Promise.resolve());

        const renderer = TestRenderer.create(<HeroListContainer />);
        expect(renderer.toJSON()).toMatchSnapshot();
        renderer.unmount();
    });

    test('it renders an error message', (done) => {
        // Simulate an error
        fetchHeros.mockReturnValue(Promise.reject(new Error('Testing an error')));

        const container = <HeroListContainer />;
        const renderer = TestRenderer.create(container);

        process.nextTick(() => {
            renderer.update(container);
            expect(renderer.toJSON()).toMatchSnapshot();
            renderer.unmount();
            done();
        });
    });

    test('it renders heroes', (done) => {
        // Mock the response from the API
        fetchHeros.mockReturnValue(Promise.resolve({
            code: 200,
            status: 'Ok',
            data: {
                offset: 0,
                limit: 2,
                total: 1491,
                count: 2,
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
        }));

        // Using the real implementation for 'getImageUrl'
        getImageUrl.mockImplementation(require.requireActual('../../services/marvelApi').getImageUrl);

        const container = <HeroListContainer />;
        const renderer = TestRenderer.create(container);

        process.nextTick(() => {
            renderer.update(container);
            expect(renderer.toJSON()).toMatchSnapshot();
            renderer.unmount();
            done();
        });
    });
});
