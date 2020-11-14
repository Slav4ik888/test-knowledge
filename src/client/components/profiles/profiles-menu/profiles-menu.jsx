import React, {useState} from 'react';
import pt from 'prop-types';
// Redux Stuff
import {connect} from 'react-redux';
import { logoutUser } from '../../../redux/actions/user-actions';
// MUI Stuff
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import HomeIcon from '@material-ui/icons/Home';
// Components
import ProfielUserEdit from '../profile-user/profile-user-edit';
import ProfielCompanyEdit from '../profile-company/profile-company-edit';


const useStyles = makeStyles((theme) => {
  return {
    line: {
      borderTop: `1px solid ${theme.palette.primary.dark}`,
    },
  }
});
  


const ProfilesMenu = ({open, onClose, anchorEl, profilesMenuId, logoutUser}) => {
  const classes = useStyles();
  const [userProfile, setUserProfile] = useState(false);
  const handleUserProfileOpen = () => {
    onClose();
    setUserProfile(true);
  };
  const handleUserProfileClose = () => setUserProfile(false);

  const [companyProfile, setCompanyProfile] = useState(false);
  const handleCompanyProfileOpen = () => {
    onClose();
    setCompanyProfile(true);
  };
  const handleCompanyProfileClose = () => setCompanyProfile(false);

  
  
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={profilesMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={onClose}
    >
      <MenuItem onClick={handleCompanyProfileOpen}>
        <ListItemIcon>
          <HomeIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Компания" />
      </MenuItem>

      <ProfielCompanyEdit open={companyProfile} onClose={handleCompanyProfileClose}/>
      
      <MenuItem onClick={handleUserProfileOpen}>
        <ListItemIcon>
          <AccountCircle fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Ваш профиль" />
      </MenuItem>

      <ProfielUserEdit open={userProfile} onClose={handleUserProfileClose}/>

      <div className={classes.line}></div>
      <MenuItem onClick={logoutUser}>
        <ListItemIcon>
          <KeyboardReturn fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Выйти" />
      </MenuItem>
    </Menu>
  )
}

ProfilesMenu.propTypes = {
  logoutUser: pt.func.isRequired,
  onClose: pt.func.isRequired,
  open: pt.bool.isRequired,
  anchorEl: pt.object,
  profilesMenuId: pt.string.isRequired,
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, {logoutUser})(ProfilesMenu);
