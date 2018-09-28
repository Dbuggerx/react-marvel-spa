import React from 'react';
import { shallow } from 'enzyme';
import HeroList from './index';

describe('HeroList', () => {
    let getThumbnailUrlMock;
    let handleHeroClickMock;
    let heroesMock;

    beforeEach(() => {
        getThumbnailUrlMock = jest.fn().mockImplementation(hero => `image URL for ${hero.name}`);
        handleHeroClickMock = jest.fn();
        heroesMock = [
            {
                id: 1,
                name: 'hero1',
            },
            {
                id: 2,
                name: 'hero2',
            },
        ];
    });

    describe('render', () => {
        test('renders properly with results', () => {
            const wrapper = shallow(<HeroList
                heroes={heroesMock}
                getThumbnailUrl={getThumbnailUrlMock}
                onHeroClick={handleHeroClickMock}
            />);
            expect(wrapper).toMatchSnapshot();
        });

        test('renders properly with no results', () => {
            const wrapper = shallow(<HeroList
                heroes={[]}
                getThumbnailUrl={getThumbnailUrlMock}
                onHeroClick={handleHeroClickMock}
            />);
            expect(wrapper).toMatchSnapshot();
        });
    });
});
