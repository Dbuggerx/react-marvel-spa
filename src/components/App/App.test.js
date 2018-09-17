import React from 'react';
import ReactDOM from 'react-dom';
import App from '.';

jest.mock('../../services/marvelApi', () => ({
    fetchHeros: jest.fn().mockReturnValue(Promise.resolve()),
}));

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
