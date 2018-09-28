// @flow

import React from 'react';
import type { StatelessFunctionalComponent } from 'react';
import './LoadingIndicator.scss';

/**
 * Renders a simple loading message
 */
const LoadingIndicator: StatelessFunctionalComponent<*> = () => (
    <div className="loading-indicator">
        <h1>Loading...</h1>
    </div>
);

LoadingIndicator.displayName = 'LoadingIndicator';

export default LoadingIndicator;
