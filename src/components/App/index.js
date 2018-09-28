// @flow

import React from 'react';
import type { StatelessFunctionalComponent } from 'react';
import './App.scss';
import HeroesContainer from '../../containers/HeroesContainer';

/**
 * Application component, used as the main component to be rendered
 */
const App: StatelessFunctionalComponent<*> = () => (
    <div className="app">
        <HeroesContainer pageSize={10} />
    </div>
);

App.displayName = 'App';

export default App;
