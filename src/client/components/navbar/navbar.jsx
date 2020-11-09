import React from 'react';
import pt from 'prop-types';
// Redux Stuff
import {connect} from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// Components
import NavbarAuth from './navbar-auth/navbar-auth';
import NavbarNoAuth from './navbar-no-auth/navbar-no-auth';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

const Navbar = ({authenticated}) => {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          {
            authenticated ?
              <NavbarAuth /> :
              <NavbarNoAuth />
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  authenticated: pt.bool.isRequired,
}
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);