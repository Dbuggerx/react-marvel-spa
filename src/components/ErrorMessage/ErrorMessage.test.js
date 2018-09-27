import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from './index';

describe('ErrorMessage', () => {
    test('renders properly', () => {
        const wrapper = shallow(<ErrorMessage message="This is a test" />);
        expect(wrapper).toMatchSnapshot();
    });
});
