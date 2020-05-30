import React from 'react';
import Main from '../Main';
import Login from '../Login';
import { PrivateRoute } from '../Routes';
import { Route, Switch, Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { setAuth } from '../../axios';
import Register from '../Register';
import HomePageComponent from '../HomePageComponent/HomePageComponent';
import ProjectsSearchComponent from '../HomePageComponent/ProjectsSearchComponent';
import ResetPassword from '../ResetPassword'
const Session = () => {

  const history = useHistory();

  const login = (token, type) => {
    if (token === undefined) {
      return;
    }
    localStorage.setItem('token', token);
    localStorage.setItem('V_USER_TYPE', type);
    setAuth(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('V_USER_TYPE');
    setAuth('');
    history.push('/login');
  };

  const auth = () => {
    const token = localStorage.getItem('token');
    if (token != null) {
      setAuth(token);
    }
  };

  auth();

  return (
    <Switch>
      <Route path="/login"
        exact
        render={() => <Login login={login}/>}
      />
      <Route path="/register" render={() => <Register/>}/>
      <Route path="/resetPassword" render={() => <ResetPassword/>}/>
      <PrivateRoute
        path="/dashboard/:section"
        login={login}
        props={{logout}}
        component={Main}
      />
      <Route exact path="/" render={() => <HomePageComponent />} /> 
      <Route path='/search' render={() => <ProjectsSearchComponent />} />       
    </Switch>
  );
};

export default Session;
