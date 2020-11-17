import React, {useState} from 'react';
import pt from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// Readux Stuff
import {connect} from 'react-redux';
import {updateUserDetails, deleteUser} from '../../../redux/actions/user-actions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';
// Component
import MyButton from '../../buttons/button-icon/button-icon';


const styles = {
  textField: {
    margin: `10px auto 10px auto`,
  },
  button: {
    marginTop: 30,
    position: `relative`,
    float: `right`,
  },
  imageWrapper: {
    "textAlign": `center`,
    "position": `relative`,
    '& button': {
      position: `absolute`,
      top: `70%`,
      left: `60%`
    }
  },
  profileImage: {
    width: 100,
    height: 100,
    objectFit: `cover`,
    maxWidth: `100%`,
    borderRadius: `50%`
  },
  profileDetails: {
    "textAlign": `center`,
    '& span, svg': {
      verticalAlign: `middle`
    },
  },
  buttons: {
    "textAlign": `center`,
    '& a': {
      margin: `20px 10px`
    }
  },
};

const ProfielUserEdit = ({classes, open, onClose, userProfile, updateUserDetails, deleteUser}) => {

  if (!open) {
    return null;
  }
  
  const [newUP, setNewUP] = useState(userProfile);

  const handleChange = (e) => {

    let userProfileUpdate = Object.assign({}, newUP);
    userProfileUpdate[e.target.name] = e.target.value;
    setNewUP(userProfileUpdate); 
  };

  const handleClose = () => onClose();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserDetails(newUP);
    onClose();
  };

  const handleDeleteAccount = () => {
    deleteUser(userProfile);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Ваш профиль</DialogTitle>
        <DialogContent>
          <form>
            <div className={classes.imageWrapper}>
              <img src={newUP.imageUrl} alt="profile" className={classes.profileImage} />
              <input type="file" id="imageInput" hidden="hidden" onChange={() => {}} />
              <MyButton title="Обновить аватарку" onClick={() => { }} className={classes.button} placement={"top"}>
                  <EditIcon color="primary" />
              </MyButton>
            </div>
            <TextField
              name="firstName" type="text" label="Имя" className={classes.textField}
              value={newUP.firstName} onChange={handleChange} fullWidth
            />
            <TextField
              name="secondName" type="text" label="Фамилия" className={classes.textField}
              value={newUP.secondName} onChange={handleChange} fullWidth
            />
            <TextField
              name="middleName" type="text" label="Отчество" className={classes.textField}
              value={newUP.middleName} onChange={handleChange} fullWidth
            />
            <TextField
              name="email" type="email" label="Email" className={classes.textField} disabled
              value={newUP.email} onChange={handleChange} fullWidth
            />

            <Button onClick={handleDeleteAccount}>
              Удалить аккаунт
            </Button>
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >
            Отмена
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ProfielUserEdit.propTypes = {
  updateUserDetails: pt.func.isRequired,
  deleteUser: pt.func.isRequired,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  classes: pt.object.isRequired,
  userProfile: pt.object,
};

const mapStateToProps = (state) => ({
  userProfile: state.user.userProfile,
});

export default connect(mapStateToProps, {updateUserDetails, deleteUser})(withStyles(styles)(ProfielUserEdit));
