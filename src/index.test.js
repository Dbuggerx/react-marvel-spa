import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

jest.mock('react-dom');

describe('Application', () => {
    test('renders App component', () => {
        const div = document.createElement('div');
        document.getElementById = id => id === 'root' && div;

        require('./index'); // eslint-disable-line

        expect(render).toHaveBeenCalledWith(<App />, div);
        expect(render).toHaveBeenCalledTimes(1);
    });
});
