import React from 'react';
import pt from 'prop-types';
// Redux Stuff
import {connect} from 'react-redux';
import { logoutUser } from '../../redux/actions/user-actions';
// MUI Stuff
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import HomeIcon from '@material-ui/icons/Home';


const useStyles = makeStyles((theme) => {
  console.log('theme: ', theme);
  return {
    line: {
      borderTop: `1px solid ${theme.palette.primary.dark}`,
    },
    
  }});


const Profile = ({open, onClose, anchorEl, profileMenuId, logoutUser}) => {
  const classes = useStyles();

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={onClose}
    >
      <MenuItem onClick={onClose}>
        <HomeIcon />
        <div>Компания</div>
      </MenuItem>
      <MenuItem onClick={onClose}>
        <AccountCircle />
        <div>Ваш профиль</div>
      </MenuItem>
      <div className={classes.line}></div>
      <MenuItem onClick={logoutUser}>
        <KeyboardReturn />
        <div>Выйти</div>
      </MenuItem>
    </Menu>
  )
}

Profile.propTypes = {
  onClose: pt.func.isRequired,
  open: pt.bool.isRequired,
  anchorEl: pt.object,
  profileMenuId: pt.string.isRequired,
}

Profile.propTypes = {
  logoutUser: pt.func.isRequired,
}
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, {logoutUser})(Profile);
