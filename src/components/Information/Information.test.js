import React from 'react';
import { shallow } from 'enzyme';
import Information from './index';

describe('Information', () => {
    test('renders properly', () => {
        const wrapper = shallow(<Information attribution="Attribution text" />);
        expect(wrapper).toMatchSnapshot();
    });
});
