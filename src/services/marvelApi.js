// @flow
import type { HeroesResult, Hero } from './types';

const apiKey = '570b1cdca67e5243b4db4425b1b4ee4e';
const imageSizes = {
    small: 'standard_fantastic',
    big: 'portrait_uncanny',
};

/**
 * Fetches data and returns the extracted JSON from the response
 */
async function getJsonFromUrl(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export async function fetchHeros(params: {
    limit: number,
    offset?: number,
    nameStartsWith?: string,
}): Promise<HeroesResult> {
    const queryString = Object.keys(params)
        .map(k => [k, params[k]])
        .reduce((agg, cur) => (cur[1] ? `${agg + (agg.length > 0 ? '&' : '')}${cur[0]}=${String(cur[1])}` : agg), '');

    const url = `https://gateway.marvel.com/v1/public/characters?${queryString}&apikey=${apiKey}`;
    return getJsonFromUrl(url);
}

export async function fetchHeroById(id: number): Promise<HeroesResult> {
    const url = `https://gateway.marvel.com/v1/public/characters/${id}?apikey=${apiKey}`;
    return getJsonFromUrl(url);
}

export function getImageUrl(hero: Hero, size: $Keys<typeof imageSizes>) {
    return `${hero.thumbnail.path}/${imageSizes[size]}.${hero.thumbnail.extension}?apikey=${apiKey}`.replace(
        'http:',
        '',
    );
}
