import React from 'react';
import { shallow } from 'enzyme';
import LoadingIndicator from './index';

describe('LoadingIndicator', () => {
    test('renders properly', () => {
        const wrapper = shallow(<LoadingIndicator />);
        expect(wrapper).toMatchSnapshot();
    });
});
