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
// Icons
import UsersSelectList from '../users-select-list/users-select-list';
// Components
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import CancelSubmitBtn from '../../buttons/cancel-submit-btn/cancel-submit-btn';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
  textField: {
    margin: `10px auto 10px auto`,
  },
  // button: {
  //   marginTop: 30,
  //   position: `relative`,
  //   float: `right`,
  // },
}));

const UserAdd = ({ open, onClose, UI: { loading, errors, messages }, addUser, deleteUser, users}) => {

  if (!open) {
    return null;
  }
  const classes = useStyles();
  const [isChange, setIsChange] = useState(false);

  const [userSeleted, setUserSelected] = useState(``);
  const [userIdx, setUserIdx] = useState(null);

  const handleUserSelected = (email, userIndex) => {
    setUserSelected(email);
    setUserIdx(userIndex);
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
      <Dialog disableBackdropClick disableEscapeKeyDown className={classes.dialog}
        open={open} onClose={handleClose} fullWidth maxWidth="sm"
      >
        <DialogTitle onClose={handleClose}>Настройки пользователей</DialogTitle>
        <DialogContent>
          <UsersSelectList userSeleted={userSeleted} onSelected={handleUserSelected} users={users}/>

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
          <CancelSubmitBtn
            onCancel={handleClose}
            onSubmit={handleSubmit}
            disabled={loading || !isChange}
            loading={loading}
          />
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
