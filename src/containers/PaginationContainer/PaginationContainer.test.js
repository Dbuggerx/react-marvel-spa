import React from 'react';
import { shallow } from 'enzyme';
import PaginationContainer from './index';

describe('PaginationContainer', () => {
    describe('render', () => {
        test('renders Pagination', () => {
            const props = {
                offset: 3,
                limit: 10,
                total: 100,
                goToPage: jest.fn(),
            };
            const wrapper = shallow(<PaginationContainer {...props} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('pageCount', () => {
        test('returns correct value', () => {
            const props = {
                offset: 3,
                limit: 10,
                total: 100,
                goToPage: jest.fn(),
            };
            const wrapper = shallow(<PaginationContainer {...props} />);
            expect(wrapper.instance().pageCount).toBe(10);
        });
    });

    describe('currentPage', () => {
        test('returns correct value', () => {
            const props = {
                offset: 30,
                limit: 10,
                total: 100,
                goToPage: jest.fn(),
            };
            const wrapper = shallow(<PaginationContainer {...props} />);
            expect(wrapper.instance().currentPage).toBe(3);
        });
    });

    describe('goToPreviousPage', () => {
        test('calls "props.goToPage"', () => {
            const props = {
                offset: 30,
                limit: 10,
                total: 100,
                goToPage: jest.fn(),
            };
            const wrapper = shallow(<PaginationContainer {...props} />);
            wrapper.instance().goToPreviousPage();
            expect(props.goToPage).toHaveBeenCalledWith(2);
        });

        test('doesn\'t call "props.goToPage" when already on the first page', () => {
            const props = {
                offset: 3,
                limit: 10,
                total: 100,
                goToPage: jest.fn(),
            };
            const wrapper = shallow(<PaginationContainer {...props} />);
            wrapper.instance().goToPreviousPage();
            expect(props.goToPage).not.toHaveBeenCalled();
        });
    });

    describe('goToNextPage', () => {
        test('calls "props.goToPage"', () => {
            const props = {
                offset: 30,
                limit: 10,
                total: 100,
                goToPage: jest.fn(),
            };
            const wrapper = shallow(<PaginationContainer {...props} />);
            wrapper.instance().goToNextPage();
            expect(props.goToPage).toHaveBeenCalledWith(4);
        });

        test('doesn\'t call "props.goToPage" when already on the last page', () => {
            const props = {
                offset: 100,
                limit: 10,
                total: 100,
                goToPage: jest.fn(),
            };
            const wrapper = shallow(<PaginationContainer {...props} />);
            wrapper.instance().goToNextPage();
            expect(props.goToPage).not.toHaveBeenCalled();
        });
    });
});
