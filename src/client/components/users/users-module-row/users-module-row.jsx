import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
// Components
import UserAdd from '../user-add/user-add';
import ListSelect from '../../list-select/list-select';


const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: `center`,
    margin: theme.spacing(2, 0, 2, 0),
  },
  avatar: {
    marginRight: theme.spacing(3),
  },
}));

// item - переданный документ или пользователь
const UsersModuleRow = ({ onUserSelected, users }) => {
  const classes = useStyles();
  
  const [openAddUser, setOpenAddUser] = useState(false);
  const handleAddUserOpen = () => setOpenAddUser(true);
  const handleAddUserClose = () => setOpenAddUser(false);

  const handleUserSelected = (user) => onUserSelected(user);

  return (
    <>
      <div className={classes.row}>
        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>

        <ListSelect
          title={`Выберите сотрудника`}
          items={users}
          valueField={`email`}
          label={`users`}
          placeholder={`Не выбран`}
          onSelected={handleUserSelected}
          onItemAdd={handleAddUserOpen}
          itemTextAdd={`пригласить нового`}
        />
        
        
      </div>
      <UserAdd open={openAddUser} onClose={handleAddUserClose}/>
    </>
  );
};


UsersModuleRow.propTypes = {
  users: pt.array.isRequired,
  onUserSelected: pt.func.isRequired,
  
};

const mapStateToProps = (state) => ({
  users: state.data.users,
});


export default connect(mapStateToProps)(UsersModuleRow);
