// @flow
import type { HeroesResult, Hero } from './types';

const apiKey = '570b1cdca67e5243b4db4425b1b4ee4e';
const imageSizes = {
    small: 'standard_medium',
    big: 'portrait_uncanny',
};

async function getJsonFromUrl(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export async function fetchHeros(offset: number = 0): Promise<HeroesResult> {
    const url = `https://gateway.marvel.com:443/v1/public/characters?offset=${offset}&apikey=${apiKey}`;
    return getJsonFromUrl(url);
}

export async function fetchHeroById(id: number): Promise<HeroesResult> {
    const url = `https://gateway.marvel.com:443/v1/public/characters/${id}/?apikey=${apiKey}`;
    return getJsonFromUrl(url);
}

export async function fetchHeroSearch(nameStartsWith: string, offset: number = 0): Promise<HeroesResult> {
    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${nameStartsWith}&offset=${offset}&apikey=${apiKey}`;
    return getJsonFromUrl(url);
}

export function getImageUrl(hero: Hero, size: $Keys<typeof imageSizes>) {
    return `${hero.thumbnail.path}/${imageSizes[size]}.${hero.thumbnail.extension}?apikey=${apiKey}`;
}
