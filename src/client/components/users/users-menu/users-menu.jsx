import React, {useState} from 'react';
import pt from 'prop-types';
// Redux Stuff
import {connect} from 'react-redux';
// import { logoutUser } from '../../../redux/actions/user-actions';
// MUI Stuff
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
// Components
import UserAdd from '../user-add/user-add';
import UsersChange from '../users-change/users-change';

const useStyles = makeStyles((theme) => {
  console.log('theme: ', theme);
  return {
    line: {
      borderTop: `1px solid ${theme.palette.primary.dark}`,
    },
  }
});
  


const UsersMenu = ({open, onClose, anchorEl, usersMenuId}) => {
  const classes = useStyles();

  const [addUser, setAddUser] = useState(false);
  const handleAddUserOpen = () => {
    onClose();
    setAddUser(true);
  };
  const handleAddUserClose = () => setAddUser(false);

  const [changeUsers, setChangeUsers] = useState(false);
  const handleChangeUsersOpen = () => {
    onClose();
    setChangeUsers(true);
  };
  const handleChangeUsersClose = () => setChangeUsers(false);

  
  
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={usersMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={onClose}
    >
      <MenuItem onClick={handleAddUserOpen}>
        <ListItemIcon>
          <AddIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Пригласить нового" />
      </MenuItem>

      <UserAdd open={addUser} onClose={handleAddUserClose}/>
      
      <MenuItem onClick={handleChangeUsersOpen}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Изменить существующего" />
      </MenuItem>

      <UsersChange open={changeUsers} onClose={handleChangeUsersClose}/>

    </Menu>
  )
}

UsersMenu.propTypes = {
  onClose: pt.func.isRequired,
  open: pt.bool.isRequired,
  anchorEl: pt.object,
  usersMenuId: pt.string.isRequired,
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(UsersMenu);
