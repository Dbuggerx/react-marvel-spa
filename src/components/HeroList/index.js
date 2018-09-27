// @flow

import * as React from 'react';
import HeroCard from '../HeroCard';
import type { Hero } from '../../services/types';

type Props = {
    heroes: Hero[],
    getThumbnailUrl: (hero: Hero) => string,
    onHeroClick: (hero: Hero) => void,
};

// $FlowFixMe
const HeroCardWithRef = React.forwardRef((props, ref) => <HeroCard {...props} cardRef={ref} />);

export default class HeroList extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.firstCard = React.createRef();
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.heroes[0].id !== this.props.heroes[0].id && this.firstCard && this.firstCard.current) {
            this.firstCard.current.focus();
        }
    }

    firstCard: *;

    render() {
        return (
            <React.Fragment>
                {this.props.heroes.map((hero, idx) => (
                    <HeroCardWithRef
                        ref={idx === 0 ? this.firstCard : null}
                        onClick={this.props.onHeroClick}
                        hero={hero}
                        key={hero.id}
                        imageUrl={this.props.getThumbnailUrl(hero)}
                    />
                ))}
            </React.Fragment>
        );
    }
}
