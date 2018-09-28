import React from 'react';
import { shallow } from 'enzyme';
import MainLayout from './index';

describe('MainLayout', () => {
    test('renders properly', () => {
        const wrapper = shallow(<MainLayout
            search="Search"
            list="List"
            pagination="Pagination"
            info="Information"
        />);
        expect(wrapper).toMatchSnapshot();
    });
});
