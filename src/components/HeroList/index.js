// @flow

import React from 'react';
import type { StatelessFunctionalComponent } from 'react';
import HeroCard from '../HeroCard';
import type { Hero } from '../../services/types';
import './HeroList.scss';

type Props = {
    heroes: Hero[],
    getThumbnailUrl: (hero: Hero) => string,
    onHeroClick: (hero: Hero) => void,
};

/**
 * Renders a list of HeroCard
 */
const HeroList: StatelessFunctionalComponent<Props> = (props: Props) => (
    <main className="hero-list" tabIndex="-1">
        {props.heroes.length === 0 && <h2>No results found!</h2>}
        {props.heroes.length > 0 &&
            props.heroes.map(hero => (
                <div className="hero-list__card" key={hero.id}>
                    <HeroCard onClick={props.onHeroClick} hero={hero} imageUrl={props.getThumbnailUrl(hero)} />
                </div>
            ))}
    </main>
);

HeroList.displayName = 'HeroList';

export default HeroList;
