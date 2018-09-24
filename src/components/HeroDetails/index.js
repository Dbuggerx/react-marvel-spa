// @flow

import React from 'react';
import NameList from '../NameList';
import type { Hero } from '../../services/types';

type Props = {
    hero: Hero,
    imageUrl: string,
};

const renderLinksFor = (
    collectionName: string,
    collection: {
        items: $Shape<{
            resourceURI: string,
            name: string,
            type: string,
        }>[],
    },
) =>
    (collection.items.length > 0 ? (
        <div>
            <h2>{collectionName}</h2>
            <NameList
                names={collection.items.map(c => c.name)}
            />
        </div>
    ) : null);

const HeroDetails = (props: Props) => (
    <div>
        <div>
            <img src={props.imageUrl} alt="Loading..." />
        </div>
        {props.hero.description.length > 0 && <div>Description: {props.hero.description}</div>}
        {renderLinksFor('Comics', props.hero.comics)}
        {renderLinksFor('Series', props.hero.series)}
        {renderLinksFor('Stories', props.hero.stories)}
        {renderLinksFor('Events', props.hero.events)}
    </div>
);

HeroDetails.displayName = 'HeroDetails';

export default HeroDetails;
