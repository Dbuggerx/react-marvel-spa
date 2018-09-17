// @flow

import React from 'react';
import HeroCard from './HeroCard';
import type { Hero } from '../services/types';

type Props = {
    heroes: Hero[],
    getThumbnailUrl: (hero: Hero) => string,
};

const HeroesList = (props: Props) => (
    <div>
        {props.heroes.map(hero => (
            <HeroCard
                hero={hero}
                key={hero.id}
                imageUrl={props.getThumbnailUrl(hero)}
            />
        ))}
    </div>
);

HeroesList.displayName = 'HeroesList';

export default HeroesList;
