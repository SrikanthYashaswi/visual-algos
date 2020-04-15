import React from 'react';
import './App.css';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import SearchingAlgos from './components/SearchingAlgos';
import SortingAlgos from './components/SortingAlgos';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/algos/searching" component={SearchingAlgos} />
          <Route path="/algos/sorting" component={SortingAlgos} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
