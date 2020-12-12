import React, {useState} from 'react';
import pt from 'prop-types';
// Readux Stuff
import {connect} from 'react-redux';
import {addUser} from '../../../redux/actions/user-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// Icons

// Components
import CancelSubmitBtn from '../../buttons/cancel-submit-btn/cancel-submit-btn';
import DialogTitle from '../../dialogs/dialog-title/dialog-title';


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
  customError: {
    color: `red`,
    fontSize: `0.8rem`,
    marginTop: 10,
  },
}));


const EmployeeAdd = ({ open, onClose, UI: { errors, loading }, addUser}) => {

  if (!open) {
    return null;
  }
  const classes = useStyles();
  const [isChange, setIsChange] = useState(false);

  const [newUP, setNewUP] = useState({
    email: ``,
    firstName: ``,
    secondName: ``,
    middleName: ``,
  });

  const handleChange = (e) => {
    let userProfile = Object.assign({}, newUP);
    userProfile[e.target.name] = e.target.value;
    setIsChange(true);
    setNewUP(userProfile); 
  };

  const handleClose = () => onClose();

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(newUP);
    setNewUP({
      email: ``,
      firstName: ``,
      secondName: ``,
      middleName: ``,
    });
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
        <DialogTitle onClose={handleClose}>Добавление пользователя</DialogTitle>
        <DialogContent>
          <form>
            <TextField autoComplete="off"
              name="email" type="email" label="Email" className={classes.textField}
              placeholder="Введите email нового пользователя"
              helperText={errors.email}
              error={errors.email ? true : false}
              value={newUP.email} onChange={handleChange} fullWidth
            />
            <TextField autoComplete="off"
              name="firstName" type="text" label="Имя" className={classes.textField}
              placeholder="Введите имя"
              value={newUP.firstName} onChange={handleChange} fullWidth
            />
            <TextField autoComplete="off"
              name="secondName" type="text" label="Фамилия" className={classes.textField}
              placeholder="Введите фамилию"
              value={newUP.secondName} onChange={handleChange} fullWidth
            />
            <TextField autoComplete="off"
              name="middleName" type="text" label="Отчество" className={classes.textField}
              placeholder="Введите отчество"
              value={newUP.middleName} onChange={handleChange} fullWidth
            />
          </form>
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
            submitText={`Пригласить`}
            disabled={loading || !isChange}
            loading={loading}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

EmployeeAdd.propTypes = {
  addUser: pt.func.isRequired,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  UI: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  // loading: state.user.loading,
});

export default connect(mapStateToProps, {addUser})(EmployeeAdd);
