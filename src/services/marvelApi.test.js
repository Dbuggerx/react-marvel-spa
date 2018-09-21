import * as marvelApi from './marvelApi';

const successHeroesResult = {
    successfulHeroesResult: true,
};

const successHeroResult = {
    successfulHeroResult: true,
};

const heroesEndpoint = 'https://gateway.marvel.com/v1/public/characters';

function mockFetchResult(jsonResult) {
    window.fetch = jest.fn().mockReturnValue(Promise.resolve({
        ok: true,
        json: () => jsonResult,
    }));
}

function mockFetchError(statusText) {
    window.fetch = jest.fn().mockReturnValue(Promise.resolve({
        ok: false,
        statusText,
    }));
}

describe('marvelApi', () => {
    describe('fetchHeros', () => {
        beforeEach(() => {
            mockFetchResult(successHeroesResult);
        });

        test('it returns correct JSON', async () => {
            const result = await marvelApi.fetchHeros();
            expect(result).toEqual(successHeroesResult);
        });

        test('it calls the endpoint with correct params', async () => {
            await marvelApi.fetchHeros(10, 20);
            expect(window.fetch).toHaveBeenCalledWith(expect.stringMatching(new RegExp(`${heroesEndpoint}\\?limit=10\\&offset=20\\&apikey=.{32}`)));
        });

        test('it throws error containing the statusText', async () => {
            mockFetchError('Testing an error');
            expect.assertions(1);
            try {
                await marvelApi.fetchHeros();
            } catch (e) {
                expect(e.message).toEqual('Testing an error');
            }
        });
    });

    describe('fetchHeroById', () => {
        beforeEach(() => {
            mockFetchResult(successHeroResult);
        });

        test('it returns correct JSON', async () => {
            const result = await marvelApi.fetchHeroById(123);
            expect(result).toEqual(successHeroResult);
        });

        test('it calls the endpoint with correct params', async () => {
            await marvelApi.fetchHeroById(123);
            expect(window.fetch).toHaveBeenCalledWith(expect.stringMatching(new RegExp(`${heroesEndpoint}/123\\?apikey=.{32}`)));
        });

        test('it throws error containing the statusText', async () => {
            mockFetchError('Testing an error');
            expect.assertions(1);
            try {
                await marvelApi.fetchHeroById();
            } catch (e) {
                expect(e.message).toEqual('Testing an error');
            }
        });
    });

    describe('fetchHeroSearch', () => {
        beforeEach(() => {
            mockFetchResult(successHeroesResult);
        });

        test('it returns correct JSON', async () => {
            const result = await marvelApi.fetchHeroSearch('test');
            expect(result).toEqual(successHeroesResult);
        });

        test('it calls the endpoint with correct params', async () => {
            await marvelApi.fetchHeroSearch('test', 5, 10);
            expect(window.fetch).toHaveBeenCalledWith(expect.stringMatching(new RegExp(`${heroesEndpoint}\\?limit=5\\&offset=10\\&nameStartsWith=test\\&apikey=.{32}`)));
        });

        test('it throws error containing the statusText', async () => {
            mockFetchError('Testing an error');
            expect.assertions(1);
            try {
                await marvelApi.fetchHeroSearch();
            } catch (e) {
                expect(e.message).toEqual('Testing an error');
            }
        });
    });

    describe('getImageUrl', () => {
        const hero = {
            thumbnail: {
                path: 'path/to/the/image',
                extension: 'jpg',
            },
        };

        test('it returns URL for small image', () => {
            expect(marvelApi.getImageUrl(hero, 'small')).toMatch(/path\/to\/the\/image\/standard_medium\.jpg\?apikey=.{32}/);
        });

        test('it returns URL for big image', () => {
            expect(marvelApi.getImageUrl(hero, 'big')).toMatch(/path\/to\/the\/image\/portrait_uncanny\.jpg\?apikey=.{32}/);
        });
    });
});
