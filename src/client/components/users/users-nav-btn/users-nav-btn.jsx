import React, { useState } from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
// Components
import UserChange from '../users-change/users-change';


const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
  },
}));


const UsersNavBtn = () => {
  const classes = useStyles();
  const [isUsers, setIsUsers] = useState(false);
  const handleUsersOpen = () => setIsUsers(true);
  const handleUsersClose = () => setIsUsers(false);


  return (
    <>
      <ListItem button onClick={handleUsersOpen} className={classes.button}>
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText primary="СОТРУДНИКИ" />
      </ListItem>
        
      <UserChange
        open={isUsers}
        onClose={handleUsersClose}
      />
    </>
  )
};

UsersNavBtn.propTypes = {
};

export default UsersNavBtn;