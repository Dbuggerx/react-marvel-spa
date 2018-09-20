/* eslint-disable */

// @flow

import React from 'react';
import HeroCard from './HeroCard';
import type { Hero } from '../services/types';

type Props = {
    heroes: Hero[],
    getThumbnailUrl: (hero: Hero) => string,
    onHeroClick: (event: SyntheticEvent<*>) => void,
};

const HeroesList = (props: Props) => (
    <div>
        {props.heroes.map(hero => (
            <div onClick={props.onHeroClick} key={hero.id} id={hero.id} data-hero-name={hero.name}>
                <HeroCard hero={hero} imageUrl={props.getThumbnailUrl(hero)} />
            </div>
        ))}
    </div>
);

HeroesList.displayName = 'HeroesList';

export default HeroesList;
