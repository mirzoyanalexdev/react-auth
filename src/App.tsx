import React from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Route } from './components/Route';
import { Routes } from './consts';
import { LoginPage, ProfilePage } from './pages';
import { AuthProvider } from './context/AuthContext';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <AuthProvider>
        <Switch>
          <Route exact path={Routes.Login} component={LoginPage} />
          <Route guarded path={Routes.Profile} component={ProfilePage}  />
          <Redirect to={Routes.Login} />
        </Switch> 
      </AuthProvider>
    </Router>
  );
}

export default App;
