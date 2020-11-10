import React from 'react'
import pt from 'prop-types'
// MUI Stuff
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';


const useStyles = makeStyles((theme) => {
  console.log('theme: ', theme);
  return {
    line: {
      borderTop: `1px solid ${theme.palette.primary.dark}`,
    },
    profileMenu: {
      position: `absolute`,
      top: 50,
      right: 10,
      width: 200,
      minWidth: `240px`,
    }
  }});


const Profile = ({open, onClose, anchorEl, profileMenuId}) => {
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
      classes={classes.profileMenu}
    >
      <MenuItem onClick={onClose}>Компания</MenuItem>
      <MenuItem onClick={onClose}>
        <AccountCircle />
        <div>Ваш профиль</div>
      </MenuItem>
      <div className={classes.line}></div>
      <MenuItem onClick={onClose}>
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

export default Profile;
