import React from 'react'
import pt from 'prop-types'
// MUI Stuff
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// Icons
import AccountCircle from '@material-ui/icons/AccountCircle';

const Profile = ({open, onClose, anchorEl, profileMenuId}) => {
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
      <MenuItem onClick={onClose}>Profile</MenuItem>
      <MenuItem onClick={onClose}>
        <AccountCircle />
        <p>My account</p>
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
