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
        test('renders properly', () => {
            const wrapper = shallow(<HeroList
                heroes={heroesMock}
                getThumbnailUrl={getThumbnailUrlMock}
                onHeroClick={handleHeroClickMock}
            />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('componentDidUpdate', () => {
        let wrapper;
        let focusSpy;

        beforeEach(() => {
            wrapper = shallow(<HeroList
                heroes={heroesMock}
                getThumbnailUrl={getThumbnailUrlMock}
                onHeroClick={handleHeroClickMock}
            />);
            focusSpy = jest.fn();
            wrapper.instance().firstCard = {
                current: {
                    focus: focusSpy,
                },
            };
        });

        test('focus on the firstCard ref', () => {
            wrapper.setProps({
                heroes: [
                    {
                        id: 3,
                    },
                ],
            });
            expect(focusSpy).toHaveBeenCalledTimes(1);
        });

        test("won't focus on the firstCard ref if same id", () => {
            wrapper.setProps({
                heroes: [
                    {
                        id: 1,
                    },
                ],
            });
            expect(focusSpy).toHaveBeenCalledTimes(0);
        });
    });
});
