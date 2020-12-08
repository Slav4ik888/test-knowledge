import React, {useState} from 'react';
import pt from 'prop-types';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
// Readux Stuff
import {connect} from 'react-redux';
import {updateUserDetails, deleteUser} from '../../../redux/actions/user-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// Icons
import EditIcon from '@material-ui/icons/Edit';
// Component
import MyButton from '../../buttons/button-icon/button-icon';
import CancelSubmitBtn from '../../buttons/cancel-submit-btn/cancel-submit-btn';
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import DeleteButton from '../../buttons/delete-button/delete-button';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
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
}));

const ProfielUserEdit = ({ open, onClose, userProfile, updateUserDetails, deleteUser}) => {

  if (!open) {
    return null;
  }
  const classes = useStyles();
  const [isChange, setIsChange] = useState(false);
  const [newUP, setNewUP] = useState(userProfile);

  const handleChange = (e) => {

    let userProfileUpdate = Object.assign({}, newUP);
    userProfileUpdate[e.target.name] = e.target.value;
    setNewUP(userProfileUpdate); 
    setIsChange(true);
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
        className={classes.dialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle onClose={handleClose}>Ваш профиль</DialogTitle>
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
              name="createdAt" type="text" label="Зарегистрирован" className={classes.textField} disabled
              value={dayjs(userProfile.createdAt).locale(`ru`).format('DD MMMM YYYY')} onChange={() => { }} fullWidth
            />
            <TextField autoComplete="off"
              name="firstName" type="text" label="Имя" className={classes.textField}
              value={newUP.firstName} onChange={handleChange} fullWidth autoComplete="off"
            />
            <TextField autoComplete="off"
              name="secondName" type="text" label="Фамилия" className={classes.textField}
              value={newUP.secondName} onChange={handleChange} fullWidth autoComplete="off"
            />
            <TextField autoComplete="off"
              name="middleName" type="text" label="Отчество" className={classes.textField}
              value={newUP.middleName} onChange={handleChange} fullWidth autoComplete="off"
            />
            <TextField
              name="email" type="email" label="Email" className={classes.textField} disabled
              value={newUP.email} onChange={handleChange} fullWidth
            />

            <DeleteButton type={`userProfile`} button onDel={handleDeleteAccount} />
            
          </form>
          
        </DialogContent>
        <DialogActions className={classes.dialog}>
          <CancelSubmitBtn
            onCancel={handleClose}
            onSubmit={handleSubmit}
            disabled={!isChange}
            loading={false}
          />
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
  userProfile: pt.object,
};

const mapStateToProps = (state) => ({
  userProfile: state.user.userProfile,
});

export default connect(mapStateToProps, {updateUserDetails, deleteUser})(ProfielUserEdit);
