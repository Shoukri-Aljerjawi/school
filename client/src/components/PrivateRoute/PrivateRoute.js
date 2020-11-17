import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roler, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = JSON.parse(localStorage.getItem('userLogin'));
      console.log(currentUser);
      if (currentUser && currentUser.roler === roler) {
        return <Component {...props} />;
      } else {
        return <Redirect to="/error" />;
      }
    }}
  />
);

export default PrivateRoute;
