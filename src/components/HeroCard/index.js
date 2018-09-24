// @flow

import React, { Component } from 'react';
import type { Hero } from '../../services/types';

type Props = {
    hero: Hero,
    imageUrl: string,
    onClick: (hero: Hero) => void,
};

export default class HeroCard extends Component<Props> {
    handleClick = () => {
        this.props.onClick(this.props.hero);
    };

    handleKeyUp = (event: SyntheticKeyboardEvent<*>) => {
        if ('key' in event ? event.key === 'Enter' : event.keyCode === 13) this.props.onClick(this.props.hero);
    };

    render() {
        return (
            <div onClick={this.handleClick} onKeyUp={this.handleKeyUp} role="button" tabIndex="0">
                <img src={this.props.imageUrl} alt={this.props.hero.name} />
                Name: {this.props.hero.name}
            </div>
        );
    }
}
