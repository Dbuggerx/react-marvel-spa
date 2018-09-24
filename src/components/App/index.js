// @flow

import React from 'react';
import type { StatelessFunctionalComponent } from 'react';
import './App.css';
import HeroesContainer from '../../containers/HeroesContainer';

const App: StatelessFunctionalComponent<*> = () => (
    <div className="App">
        <HeroesContainer pageSize={10} />
    </div>
);

App.displayName = 'App';

export default App;
