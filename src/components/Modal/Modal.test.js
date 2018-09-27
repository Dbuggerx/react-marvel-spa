import React from 'react';
import { shallow } from 'enzyme';
import Modal from './index';

describe('Modal', () => {
    describe('render', () => {
        test('renders properly', () => {
            const wrapper = shallow(<Modal title="Testing">Test</Modal>);
            expect(wrapper).toMatchSnapshot();
        });

        test('close button calls "props.onClose" upon click', () => {
            const onCloseSpy = jest.fn();
            const wrapper = shallow(<Modal onClose={onCloseSpy} />);
            wrapper.find('.modal__close').simulate('click');

            expect(onCloseSpy).toHaveBeenCalledTimes(1);
        });

        test('close button calls "props.onClose" upon Esc keyUp', () => {
            const onCloseSpy = jest.fn();
            const wrapper = shallow(<Modal onClose={onCloseSpy} />);
            const closeButon = wrapper.find('.modal__close');
            closeButon.simulate('keyUp', {
                key: 'Esc',
            });
            closeButon.simulate('keyUp', {
                keyCode: 27,
            });
            closeButon.simulate('keyUp', {
                key: 'wrongOne',
            });
            expect(onCloseSpy).toHaveBeenCalledTimes(2);
        });
    });

    describe('componentDidMount', () => {
        test('focuses on the close button', () => {
            const wrapper = shallow(<Modal />);
            const focusSpy = jest.fn();

            wrapper.instance().closeButton = {
                current: {
                    focus: focusSpy,
                },
            };
            wrapper.instance().componentDidMount();
            expect(focusSpy).toHaveBeenCalledTimes(1);
        });

        test('adds event listeners to window', () => {
            window.addEventListener = jest.fn();
            const wrapper = shallow(<Modal />);
            expect(window.addEventListener).toHaveBeenCalledTimes(2);
            expect(window.addEventListener).toHaveBeenCalledWith('keyup', wrapper.instance().handleCloseKeyUp);
            expect(window.addEventListener).toHaveBeenCalledWith('focus', wrapper.instance().handleFocus, true);
        });

        test('adds "no-scroll" class to body', () => {
            document.body.classList.remove('no-scroll');
            expect(document.body.classList).not.toContain('no-scroll');
            shallow(<Modal />);
            expect(document.body.classList).toContain('no-scroll');
        });
    });

    describe('componentWillUnmount', () => {
        test('removes event listeners from window', () => {
            window.removeEventListener = jest.fn();
            const wrapper = shallow(<Modal />);
            wrapper.instance().componentWillUnmount();
            expect(window.removeEventListener).toHaveBeenCalledTimes(2);
            expect(window.removeEventListener).toHaveBeenCalledWith('keyup', wrapper.instance().handleCloseKeyUp);
            expect(window.removeEventListener).toHaveBeenCalledWith('focus', wrapper.instance().handleFocus, true);
        });

        test('removes "no-scroll" class from body', () => {
            document.body.classList.add('no-scroll');
            expect(document.body.classList).toContain('no-scroll');
            const wrapper = shallow(<Modal />);
            wrapper.instance().componentWillUnmount();
            expect(document.body.classList).not.toContain('no-scroll');
        });
    });

    describe('handleFocus', () => {
        test('focuses on the close button', () => {
            const wrapper = shallow(<Modal />);
            const containerRefMock = {
                current: {
                    focus: jest.fn(),
                    contains() {
                        return false;
                    },
                },
            };
            const closeButtonRefMock = {
                current: {
                    focus: jest.fn(),
                },
            };
            wrapper.instance().container = containerRefMock;
            wrapper.instance().closeButton = closeButtonRefMock;
            wrapper.instance().handleFocus({
                currentTarget: {},
            });
            expect(closeButtonRefMock.current.focus).toHaveBeenCalledTimes(1);
        });

        test('does not focus on the close button', () => {
            const wrapper = shallow(<Modal />);
            const containerRefMock = {
                current: {
                    focus: jest.fn(),
                    contains() {
                        return true;
                    },
                },
            };
            const closeButtonRefMock = {
                current: {
                    focus: jest.fn(),
                },
            };
            wrapper.instance().container = containerRefMock;
            wrapper.instance().closeButton = closeButtonRefMock;
            wrapper.instance().handleFocus({
                currentTarget: {},
            });
            expect(closeButtonRefMock.current.focus).not.toHaveBeenCalled();
        });
    });
});
