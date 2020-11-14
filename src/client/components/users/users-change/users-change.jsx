import React, {useState} from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Readux Stuff
import {connect} from 'react-redux';
import {addUser} from '../../../redux/actions/user-actions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
// Component


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

const UserAdd = ({open, onClose, UI, loading, addUser}) => {

  if (!open) {
    return null;
  }
  const classes = useStyles();

  const [user, setUser] = React.useState('');
  const handleChange = (e) => {
    setUser(Number(e.target.value) || '');
  };
  const handleClose = () => onClose();

  const handleSubmit = (e) => {
    e.preventDefault();
    // addUser(email);
  };

  const { errors } = UI;


  return (
    <>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        {/* fullWidth
        maxWidth="sm" */}
        <DialogTitle>Настройка сотрудников</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="users-label">Сотрудник</InputLabel>
              <Select
                labelId="users-label"
                id="users-select"
                value={user}
                onChange={handleChange}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </form>
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
  open: pt.bool.isRequired,
  loading: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  UI: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  loading: state.user.loading,
});

export default connect(mapStateToProps, {addUser})(UserAdd);
