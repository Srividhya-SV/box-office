import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navs from './components/Navs';
import Home from './pages/Home';
import Starred from './pages/Starred';

function App() {
  // exact matches the exact path, <Route></Route> is to handle the undefined routes
  return (
    <div>
      <Navs />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/starred">
          <Starred />
        </Route>
        <Route>
          <div>Not found</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
