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

    describe('form submit', () => {
        test('calls "props.onSearch" with search param', () => {
            wrapper.setState({
                searchParam: 'Testing',
            });
            wrapper.find('form').simulate('submit', {
                preventDefault: jest.fn(),
            });
            expect(handleSearchMock).toHaveBeenCalledWith('Testing');
        });
    });

    describe('handleReset', () => {
        test('calls "props.onSearch" without search param', () => {
            wrapper.setState({
                searchParam: 'Testing',
            });
            wrapper.find('[title="Reset search"]').simulate('click', {
                preventDefault: jest.fn(),
            });
            expect(handleSearchMock).toHaveBeenCalledWith('Testing');
        });
    });
});
