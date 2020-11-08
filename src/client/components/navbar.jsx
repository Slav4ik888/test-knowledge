import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import pt from 'prop-types';
import route from '../utils/routes';
// Redux Stuff
import {connect} from 'react-redux';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// Icons
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import Notifications from '@material-ui/icons/Notifications';
// Component
import MyButton from './button/button';


class Navbar extends Component {
  render() {
    const {authenticated} = this.props;
    return (
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          {
            authenticated ?
              (
                <>
                  <MyButton title="Написать пост" onClick={() => {}} className="button" placement={"bottom"}>
                    <AddIcon color="primary" />
                  </MyButton>
                  <Link to={route.HOME}>
                    <MyButton title="На главную" onClick={() => {}} className="button" placement={"bottom"}>
                      <HomeIcon color="primary" />
                    </MyButton>
                  </Link>
                  <MyButton title="Уведомления" onClick={() => {}} className="button" placement={"bottom"}>
                    <Notifications color="primary" />
                  </MyButton>
                </>
              ) :
              (
                <>
                  <Button color="inherit" component={Link} to={route.HOME}>Home</Button>
                  <Button color="inherit" component={Link} to={route.SIGNUP}>Signup</Button>
                  <Button color="inherit" component={Link} to={route.LOGIN}>Login</Button>
                </>
              )
          }
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: pt.bool.isRequired,
}
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
