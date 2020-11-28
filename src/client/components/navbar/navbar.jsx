import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Redux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
// Components
import NavbarAuth from './navbar-auth/navbar-auth';
import NavbarNoAuth from './navbar-no-auth/navbar-no-auth';
import MiniDrawer from '../drawer/drawer/drawer';
import {drawerWidth} from '../../utils/consts';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const Navbar = ({authenticated}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={cl(classes.appBar, { [classes.appBarShift]: open })}
      >
        <Toolbar>
          {
            authenticated ?
              <NavbarAuth open={open} onOpen={handleDrawerOpen} /> :
              <NavbarNoAuth />
          }
        </Toolbar>
      </AppBar>
      {
        authenticated && <MiniDrawer onClose={handleDrawerClose} open={open} />
      }
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