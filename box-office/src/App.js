import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  // exact matches the exact path, <Route></Route> is to handle the undefined routes
  return (
    <Switch>
      <Route exact path="/">
        This is home page
      </Route>

      <Route exact path="/login">
        This is login page
      </Route>
      <Route>This is 404 page</Route>
    </Switch>
  );
}

export default App;
