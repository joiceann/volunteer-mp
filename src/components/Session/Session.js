import React from 'react';
import Main from '../Main';
import Login from '../Login';
import { PrivateRoute } from '../Routes';
import { Route, Switch, Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { setAuth } from '../../axios';

const Session = () => {

  const history = useHistory();

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth('');
    history.push('/login');
  };
  return (
    <Switch>
      <Route path="/login"
        exact
        render={() => <Login login={login}/>}
      />
      <PrivateRoute
        path="/dashboard/:section"
        props={{logout}}
        component={Main}
      />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};

export default Session;
