import React from 'react';
import pt from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import route from './routes';
// Redux
import {connect} from 'react-redux';


const PrivateRoute = ({ exact, path, render, authenticated }) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        if (authenticated === true) {
          return render();
        } else {
          return <Redirect to={route.ROOT} />;
        }
      }}
    />
  );
};

PrivateRoute.propTypes = {
  exact: pt.bool.isRequired,
  path: pt.string.isRequired,
  render: pt.func.isRequired,
  authenticated: pt.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
