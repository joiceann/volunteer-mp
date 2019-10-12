import React from 'react';
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ component: Component, props: childProps, ...rest }) => {
  const isAuth = localStorage.getItem('token') != null;
  return (
    <Route
      {...rest}
      render={(props) => isAuth
        ? <Component {...props} {...childProps} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  );
};

export default PrivateRoute;
