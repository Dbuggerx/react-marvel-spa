import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ErrorMessage from './index';

test('it renders without crashing', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<ErrorMessage message="This is a test" />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('h1');
    expect(result.props.children).toBe('This is a test');
});
