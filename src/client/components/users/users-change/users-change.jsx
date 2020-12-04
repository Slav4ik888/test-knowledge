import React, { useState } from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Readux Stuff
import { connect } from 'react-redux';
import { deleteUser, updateUserDetails } from '../../../redux/actions/user-actions';
// MUI Stuff
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// Icons
// Components
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import UsersModuleRow from '../users-module-row/users-module-row';
import PositionsModuleRow from '../../positions/positions-module-row/positions-module-row';
import UsersStatusRow from '../users-status-row/users-status-row';
import DeleteUserButton from '../../buttons/delete-user-button/delete-user-button';
// import CancelSubmitBtn from '../../buttons/cancel-submit-btn/cancel-submit-btn';
import { typePosModule } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
  textField: {
    margin: `10px auto 10px auto`,
  },
  row: {
    display: 'flex',
    alignItems: `center`,
  },
  
  // button: {
  //   marginTop: 30,
  //   position: `relative`,
  //   float: `right`,
  // },
}));

const UserChange = ({ open, onClose, UI: { loading, errors, messages }, deleteUser, updateUserDetails}) => {

  if (!open) {
    return null;
  }
  const classes = useStyles();
  // const [isChange, setIsChange] = useState(false);

  const [userSeleted, setUserSelected] = useState(null);

  const handleUserSelected = (user) => {
    if (user) {
      setUserSelected(user);
      // setIsChange(false);
    } else {
      setUserSelected(null);
      // setIsChange(false);
    }
  };

  const handleSetUserRole = (role) => {
    if (role !== userSeleted.role) {
      const userChangeRole = userSeleted;
      userChangeRole.role = role;
      setUserSelected(userChangeRole);
      updateUserDetails(userChangeRole);
      // setIsChange(true);
    }
  };

  const handleDeleteAccount = () => {
    deleteUser(userSeleted);
    onClose();
  };

  const handleClose = () => onClose();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   updateUserDetails(userSeleted);
  //   // setIsChange(false);
  // };

  return (
    <>
      <Dialog disableBackdropClick className={classes.dialog}
        open={open} onClose={handleClose} fullWidth maxWidth="sm"
      >
        <DialogTitle onClose={handleClose}>Настройки пользователей</DialogTitle>
        <DialogContent className={classes.dialog}>
          <Typography variant="h5" color="primary">
            {userSeleted ? `Сотрудник` : `Выберите сотрудника`}
          </Typography>
          <UsersModuleRow onUserSelected={handleUserSelected} />
          
          {
            userSeleted &&
              <>
                <Typography variant="h5" color="primary" >Занимаемые должности</Typography>
                <PositionsModuleRow item={userSeleted} type={typePosModule.USER} />
              
                <Typography variant="h5" color="primary">Статус в приложении</Typography>
                <UsersStatusRow user={userSeleted} onSetRole={handleSetUserRole}/>
              
                <DeleteUserButton onDel={handleDeleteAccount} />
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
          {/* <CancelSubmitBtn
            onCancel={handleClose}
            onSubmit={handleSubmit}
            disabled={loading || !isChange}
            loading={loading}
          /> */}
        </DialogActions>
      </Dialog>
    </>
  );
}

UserChange.propTypes = {
  deleteUser: pt.func.isRequired,
  updateUserDetails: pt.func.isRequired,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  UI: pt.object.isRequired,
  // users: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  // users: state.data.users,
});

export default connect(mapStateToProps, {deleteUser, updateUserDetails})(UserChange);
