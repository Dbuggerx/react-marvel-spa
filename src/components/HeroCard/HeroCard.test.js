import React from 'react';
import { shallow } from 'enzyme';
import HeroCard from './index';

const basicHeroMock = {
    id: 1011334,
    name: '3-D Man',
    description: 'This is a test!',
    modified: '2014-04-29T14:18:17-0400',
    thumbnail: {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
        extension: 'jpg',
    },
};

describe('HeroCard', () => {
    test('renders properly', () => {
        const wrapper = shallow(<HeroCard hero={basicHeroMock} imageUrl="the/img/url" />);
        expect(wrapper).toMatchSnapshot();
    });


    test('it calls props.onClick upon click', () => {
        const handleClickMock = jest.fn();
        const wrapper = shallow(<HeroCard hero={basicHeroMock} imageUrl="the/img/url" onClick={handleClickMock} />);
        wrapper.find('[role="button"]').simulate('click');
        expect(handleClickMock).toHaveBeenCalledTimes(1);
    });

    test('it calls props.onClick upon keyup', () => {
        const handleClickMock = jest.fn();
        const wrapper = shallow(<HeroCard hero={basicHeroMock} imageUrl="the/img/url" onClick={handleClickMock} />);
        const target = wrapper.find('[role="button"]');
        target.simulate('keyUp', {
            key: 'Enter',
        });
        target.simulate('keyUp', {
            keyCode: 13,
        });
        target.simulate('keyUp', {
            key: 'wrongOne',
        });
        expect(handleClickMock).toHaveBeenCalledTimes(2);
    });
});
