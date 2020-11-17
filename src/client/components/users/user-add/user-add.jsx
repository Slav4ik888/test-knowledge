import React, {useState} from 'react';
import pt from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
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
// Icons
import CircularProgress from '@material-ui/core/CircularProgress';
// Component


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
  customError: {
    color: `red`,
    fontSize: `0.8rem`,
    marginTop: 10,
  },
  progress: {
    position: `absolute`,
    color: `#147070`,
  },
};

const UserAdd = ({ classes, open, onClose, UI: {errors, loading }, addUser}) => {

  if (!open) {
    return null;
  }
  
  const [email, setEmail] = useState(``);

  const handleChange = (e) => setEmail(e.target.value); 
  const handleClose = () => onClose();

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(email);
  };


  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Добавление пользователя</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="email" type="email" label="Email" className={classes.textField}
              placeholder="Введите email нового пользователя"
              helperText={errors.email}
              error={errors.email ? true : false}
              value={email} onChange={handleChange} fullWidth
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
        <DialogActions>
          <Button onClick={handleClose} >
            Отмена
          </Button>
          <Button onClick={handleSubmit} disabled={loading} variant="contained" color="primary">
            Пригласить
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
  // loading: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  classes: pt.object.isRequired,
  UI: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  // loading: state.user.loading,
});

export default connect(mapStateToProps, {addUser})(withStyles(styles)(UserAdd));
