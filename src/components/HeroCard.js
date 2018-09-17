// @flow

import React from 'react';
import type { Hero } from '../services/types';

type Props = {
    hero: Hero,
    imageUrl: string,
};

export default (props: Props) => (
    <div>
        <img src={props.imageUrl} alt={props.hero.name} />
        Name: {props.hero.name}
    </div>
);
