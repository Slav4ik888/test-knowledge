import React, {useState} from 'react';
import pt from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// Readux Stuff
import {connect} from 'react-redux';
import {setUserDetails} from '../../../redux/actions/user-actions';
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
      top: `80%`,
      left: `70%`
    }
  },
  profileImage: {
    width: 150,
    height: 150,
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
  }
};

const ProfielUserEdit = ({classes, open, onClose, userProfile, setUserDetails}) => {
  console.log('classes: ', classes.imageWrapper);

  if (!open) {
    return null;
  }
  const [newUP, setNewUP] = useState(userProfile);

  const handleChange = (e) => {
    console.log(e.target.name, ` `, e.target.value);
    let userProfileUpdate = newUP;
    userProfileUpdate[e.target.name] = e.target.value;
    setNewUP(userProfileUpdate); 
  };

  const handleClose = () => onClose();

  const handleSubmit = () => {
    setUserDetails(newUP);
    onClose();
  };

  // createdAt
  // positions
  // role

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
              name="email" type="email" label="Email" className={classes.textField}
              value={newUP.email} onChange={handleChange} fullWidth
            />
            <div className={classes.imageWrapper}>
              <img src={newUP.imageUrl} alt="profile" className={classes.profileImage} />
              <input type="file" id="imageInput" hidden="hidden" onChange={() => {}} />
              <MyButton title="Обновить аватарку" onClick={() => { }} className={classes.button} placement={"top"}>
                  <EditIcon color="primary" />
              </MyButton>
            </div>

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ProfielUserEdit.propTypes = {
  setUserDetails: pt.func.isRequired,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  classes: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  userProfile: state.user.userProfile,
});

export default connect(mapStateToProps, {setUserDetails})(withStyles(styles)(ProfielUserEdit));
