import React from 'react';
import { shallow } from 'enzyme';
import SearchForm from './index';

describe('SearchForm', () => {
    const handleSearchMock = jest.fn();
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SearchForm onSearch={handleSearchMock} />);
    });

    test('input changes state', () => {
        wrapper.find('input').simulate('change', {
            currentTarget: { value: 'Test' },
        });
        expect(wrapper.state('searchParam')).toBe('Test');
    });

    test('submit calls "props.onSearch"', () => {
        wrapper.setState({
            searchParam: 'Testing',
        });
        wrapper.find('form').simulate('submit', {
            preventDefault: jest.fn(),
        });
        expect(handleSearchMock).toHaveBeenCalledWith('Testing');
    });
});
