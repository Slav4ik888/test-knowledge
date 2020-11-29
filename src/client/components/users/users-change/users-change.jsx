import React, { useState } from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Readux Stuff
import { connect } from 'react-redux';
import { deleteUser } from '../../../redux/actions/user-actions';
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
import CancelSubmitBtn from '../../buttons/cancel-submit-btn/cancel-submit-btn';
import DeleteUserButton from '../../buttons/delete-user-button/delete-user-button';
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

const UserChange = ({ open, onClose, UI: { loading, errors, messages }, deleteUser}) => {

  if (!open) {
    return null;
  }
  const classes = useStyles();
  const [isChange, setIsChange] = useState(false);

  const [userSeleted, setUserSelected] = useState(null);

  const handleUserSelected = (user) => {
    console.log('user: ', user);
    if (user) {
      setUserSelected(user);
      setIsChange(true);
    } else {
      setUserSelected(null);
      setIsChange(false);
    }
  };

  const handleClose = () => onClose();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDeleteAccount = () => {
    console.log(`user delete: `, userSeleted);
    deleteUser(userSeleted);
    onClose();
  };

  return (
    <>
      <Dialog disableBackdropClick className={classes.dialog}
        open={open} onClose={handleClose} fullWidth maxWidth="sm"
      >
        <DialogTitle onClose={handleClose}>Настройки пользователей</DialogTitle>
        <DialogContent className={classes.dialog}>
          <UsersModuleRow onUserSelected={handleUserSelected} />
          
          {
            userSeleted &&
              <>
                <Typography variant="h5" color="primary" >Занимаемые должности</Typography>
                
                <PositionsModuleRow item={userSeleted} type={typePosModule.USER} />
              
                <Typography variant="h5" color="primary">Статус в приложении</Typography>
                <Typography variant="body1" >{userSeleted.role}</Typography>
              
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

UserChange.propTypes = {
  deleteUser: pt.func.isRequired,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  UI: pt.object.isRequired,
  // users: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  // users: state.data.users,
});

export default connect(mapStateToProps, {deleteUser})(UserChange);
