import React, {useState} from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Readux Stuff
import {connect} from 'react-redux';
import {addUser, deleteUser} from '../../../redux/actions/user-actions';
// MUI Stuff
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// Icons
// Components
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import CancelSubmitBtn from '../../buttons/cancel-submit-btn/cancel-submit-btn';
import UserAdd from '../user-add/user-add';
import ListSelect from '../../list-select/list-select';
import DeleteUserButton from '../../buttons/delete-user-button/delete-user-button';


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

const UserChange = ({ open, onClose, UI: { loading, errors, messages }, addUser, deleteUser, users}) => {

  if (!open) {
    return null;
  }
  const classes = useStyles();
  const [isChange, setIsChange] = useState(false);

  const [openAddUser, setOpenAddUser] = useState(false);
  const handleAddUserOpen = () => setOpenAddUser(true);
  const handleAddUserClose = () => setOpenAddUser(false);

  const [userSeleted, setUserSelected] = useState(``);
  const [userIdx, setUserIdx] = useState(null);

  const handleUserSelected = (user) => {
    console.log('user: ', user);
    if (user) {
      const email = user.email;
      setUserSelected(email);
      const userIndex = users.findIndex(user => user.email === email);
      setUserIdx(userIndex);
    }
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
      <Dialog disableBackdropClick className={classes.dialog}
        open={open} onClose={handleClose} fullWidth maxWidth="sm"
      >
        <DialogTitle onClose={handleClose}>Настройки пользователей</DialogTitle>
        <DialogContent>
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
          {userSeleted &&
            <>
              <Typography variant="h5" color="primary" >Занимаемые должности</Typography>
              {users[userIdx].positions.map((pos) => <Typography key={pos} variant="body1" >{pos}</Typography>)}
              <Typography variant="h5" color="primary">Статус в приложении</Typography>
              <Typography variant="body1" >{users[userIdx].role}</Typography>
            
              <DeleteUserButton onClick={handleDeleteAccount} />
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

        <DialogActions className={classes.dialog}>
          <CancelSubmitBtn
            onCancel={handleClose}
            onSubmit={handleSubmit}
            disabled={loading || !isChange}
            loading={loading}
          />
        </DialogActions>
      </Dialog>

      <UserAdd open={openAddUser} onClose={handleAddUserClose}/>

    </>
  );
}

UserChange.propTypes = {
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

export default connect(mapStateToProps, {addUser, deleteUser})(UserChange);
