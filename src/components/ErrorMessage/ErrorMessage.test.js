import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from './index';

test('it renders properly', () => {
    const wrapper = shallow(<ErrorMessage message="This is a test" />);
    expect(wrapper).toMatchSnapshot();
});
