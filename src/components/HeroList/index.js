/* eslint-disable */

// @flow

import React, { Component } from 'react';
import HeroCard from '../HeroCard';
import type { Hero } from '../../services/types';

type Props = {
    heroes: Hero[],
    getThumbnailUrl: (hero: Hero) => string,
    onHeroClick: (hero: Hero) => void,
};

export default class HeroesList extends Component<Props> {
    render() {
        return this.props.heroes.map(hero => (
            <HeroCard
                onClick={this.props.onHeroClick}
                hero={hero}
                key={hero.id}
                imageUrl={this.props.getThumbnailUrl(hero)}
            />
        ));
    }
}
