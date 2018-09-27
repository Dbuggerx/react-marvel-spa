import React from 'react';
import { shallow } from 'enzyme';
import HeroDetails from './index';

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

describe('HeroDetails', () => {
    test('renders basic data', () => {
        const wrapper = shallow(<HeroDetails hero={basicHeroMock} imageUrl="the/img/url" />);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders collections data', () => {
        const mock = {
            ...basicHeroMock,
            comics: {
                items: [
                    {
                        name: 'comicA',
                    },
                    {
                        name: 'comicB',
                    },
                ],
                returned: 0,
            },
            series: {
                items: [
                    {
                        name: 'serieA',
                    },
                    {
                        name: 'serieB',
                    },
                ],
                returned: 0,
            },
        };
        const wrapper = shallow(<HeroDetails hero={mock} imageUrl="the/img/url" />);
        expect(wrapper).toMatchSnapshot();
    });
});
