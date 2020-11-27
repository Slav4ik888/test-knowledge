import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


const UsersSelectList = ({userSeleted, onSelected, users}) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const email = e.target.value;
    const newIdx = users.findIndex(user => user.email === email);
    onSelected(email, newIdx);
  };


  return (
    <>
      <form className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel id="users-label">Сотрудник</InputLabel>
          <Select
            labelId="users-label"
            id="users-select"
            value={userSeleted}
            onChange={handleChange}
            input={<Input />}
          >
            <MenuItem value=""><em>Не выбран</em></MenuItem>
            {users.map((user) => <MenuItem key={user.email} value={user.email}>{user.email}</MenuItem>)}
          </Select>
        </FormControl>
      </form>
    </>
  )
}

UsersSelectList.propTypes = {
  userSeleted: pt.string.isRequired,
  users: pt.array.isRequired,
  onSelected: pt.func.isRequired,
}

export default UsersSelectList;
