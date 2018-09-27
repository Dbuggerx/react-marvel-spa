import React from 'react';
import { shallow } from 'enzyme';
import NameList from './index';

describe('NameList', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NameList names={['aaa', 'aaa', 'bbb', 'ccc']} />);
    });

    test('renders properly', () => {
        wrapper = shallow(<NameList names={['aaa', 'aaa', 'bbb', 'ccc']} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('input changes state on change', () => {
        wrapper.find('input').simulate('change', {
            currentTarget: {
                value: 'test',
            },
        });

        expect(wrapper.state('filterParam')).toBe('test');
    });
});
