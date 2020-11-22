import React, {useState} from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Readux Stuff
import {connect} from 'react-redux';
import {addUser, deleteUser} from '../../../redux/actions/user-actions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// Icons
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
  textField: {
    margin: `10px auto 10px auto`,
  },
  // button: {
  //   marginTop: 30,
  //   position: `relative`,
  //   float: `right`,
  // },
  
  customError: {
    color: `red`,
    fontSize: `0.8rem`,
    marginTop: 10,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const UserAdd = ({ open, onClose, UI: { loading, errors, messages }, addUser, deleteUser, users}) => {

  if (!open) {
    return null;
  }
  const classes = useStyles();

  const [userSeleted, setUserSelected] = useState(``);
  const [userIdx, setUserIdx] = useState(null);

  const handleChange = (e) => {
    const email = e.target.value;
    const newIdx = users.findIndex(user => user.email === email);
    console.log('newIdx: ', newIdx);
    setUserSelected(email);
    setUserIdx(newIdx);
  };
  const handleClose = () => onClose();

  const handleSubmit = (e) => {
    e.preventDefault();
    // addUser(email);
  };

  const handleDeleteAccount = () => {
    console.log(`users[userIdx]: `, users[userIdx]);
    deleteUser(users[userIdx]);
    onClose();
  };

  return (
    <>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Настройки</DialogTitle>
        <DialogContent>
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
                <MenuItem value=""><em>None</em></MenuItem>
                {users.map((user) => <MenuItem key={user.email} value={user.email}>{user.email}</MenuItem>)}
              </Select>
            </FormControl>
          </form>
          {userSeleted &&
            <>
              <Typography variant="h5" color="primary" >Занимаемые должности</Typography>
              {users[userIdx].positions.map((pos) => <Typography key={pos} variant="body1" >{pos}</Typography>)}
              <Typography variant="h5" color="primary">Статус в приложении</Typography>
              <Typography variant="body1" >{users[userIdx].role}</Typography>
              <Button onClick={handleDeleteAccount}>
                Удалить пользователя
              </Button>
            </>
          }

          {
            errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >
            Отмена
          </Button>
          <Button onClick={handleSubmit} disabled={loading} variant="contained" color="primary">
            Сохранить
            {
              loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )
            }
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

UserAdd.propTypes = {
  addUser: pt.func.isRequired,
  deleteUser: pt.func.isRequired,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  UI: pt.object.isRequired,
  users: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  users: state.data.users,
});

export default connect(mapStateToProps, {addUser, deleteUser})(UserAdd);
