import React from 'react';
import { shallow } from 'enzyme';
import Pagination from './index';

describe('Pagination', () => {
    let wrapper;
    let goToPreviousPageMock;
    let goToNextPageMock;

    beforeEach(() => {
        goToPreviousPageMock = jest.fn();
        goToNextPageMock = jest.fn();

        wrapper = shallow(<Pagination
            currentPage={1}
            pageCount={10}
            goToPreviousPage={goToPreviousPageMock}
            goToNextPage={goToNextPageMock}
        />);
    });

    test('renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('back button calls "props.goToPreviousPage" upon click', () => {
        wrapper.find('[aria-label="Go to previous page"]').simulate('click');
        expect(goToPreviousPageMock).toHaveBeenCalledTimes(1);
    });

    test('forward button calls "props.goToNextPage" upon click', () => {
        wrapper.find('[aria-label="Go to next page"]').simulate('click');
        expect(goToNextPageMock).toHaveBeenCalledTimes(1);
    });
});
