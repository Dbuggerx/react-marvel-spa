// @flow

import React from 'react';
import type { StatelessFunctionalComponent } from 'react';
import NameList from '../NameList';
import type { Hero } from '../../services/types';
import './HeroDetails.scss';

type Props = {
    hero: Hero,
    imageUrl: string,
};

/**
 * Renders a collection of string
 */
const renderListFor = (
    collectionName: string,
    collection: {
        items: $Shape<{
            resourceURI: string,
            name: string,
            type: string,
        }>[],
    },
) =>
    (collection && collection.items.length > 0 ? (
        <div className="hero-details__list">
            <NameList collectionName={collectionName} names={collection.items.map(c => c.name)} />
        </div>
    ) : null);

/**
 * Renders the image and detailed information for the Hero
 */
const HeroDetails: StatelessFunctionalComponent<Props> = (props: Props) => (
    <div className="hero-details">
        <img className="hero-details__image" src={props.imageUrl} alt={props.hero.name} />
        {props.hero.description.length > 0 && props.hero.description}
        <div className="hero-details__lists">
            {renderListFor('Comics', props.hero.comics)}
            {renderListFor('Series', props.hero.series)}
            {renderListFor('Stories', props.hero.stories)}
            {renderListFor('Events', props.hero.events)}
        </div>
    </div>
);

HeroDetails.displayName = 'HeroDetails';

export default HeroDetails;
