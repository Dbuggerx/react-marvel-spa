import React from 'react';
import './App.css';
import HeroListContainer from '../../containers/HeroListContainer';

const App = () => (
    <div className="App">
        <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
        </header>
        <HeroListContainer />
    </div>
);

export default App;
