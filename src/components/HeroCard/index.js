// @flow

import React, { Component } from 'react';
import type { Hero } from '../../services/types';
import './HeroCard.scss';

type Props = {
    hero: Hero,
    imageUrl: string,
    onClick: (hero: Hero) => void,
};

/**
 * Renders a card that displays the passed Hero data and its image
 */
export default class HeroCard extends Component<Props> {
    handleClick = () => {
        this.props.onClick(this.props.hero);
    };

    handleKeyUp = (event: SyntheticKeyboardEvent<*>) => {
        if ('key' in event ? event.key === 'Enter' : event.keyCode === 13) this.props.onClick(this.props.hero);
    };

    render() {
        return (
            <div className="hero-card" onClick={this.handleClick} onKeyUp={this.handleKeyUp} role="button" tabIndex="0">
                <img src={this.props.imageUrl} alt={this.props.hero.name} />
                <div className="hero-card__label">{this.props.hero.name}</div>
            </div>
        );
    }
}
