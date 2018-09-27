import React from 'react';
import { shallow } from 'enzyme';
import SearchContainer from './index';

describe('SearchContainer', () => {
    describe('render', () => {
        test('renders properly', () => {
            const wrapper = shallow(<SearchContainer onSearchChanged={jest.fn()} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handleSearch', () => {
        test('it calls "onSearchChanged"', () => {
            const handleSearchChangedMock = jest.fn();
            const wrapper = shallow(<SearchContainer onSearchChanged={handleSearchChangedMock} />);
            wrapper.instance().handleSearch('test');
            expect(handleSearchChangedMock).toHaveBeenCalledTimes(1);
            expect(handleSearchChangedMock).toHaveBeenCalledWith('test');
        });

        test('it does not call "onSearchChanged"', () => {
            const handleSearchChangedMock = jest.fn();
            const wrapper = shallow(<SearchContainer onSearchChanged={handleSearchChangedMock} />);
            wrapper.instance().lastSearch = 'test';
            wrapper.instance().handleSearch('test');
            expect(handleSearchChangedMock).not.toHaveBeenCalled();
        });
    });
});
