import React from 'react';
import pt from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import route from './routes';


const AuthRoute = ({component: Component, authenticated}) => (
  <Route
    render={(props) => authenticated === true ?
      <Redirect to={route.HOME} /> :
      <Component {...props} />
    }
  />
);

AuthRoute.propTypes = {
  component: pt.node.isRequired,
  authenticated: pt.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
