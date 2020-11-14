import React, {useState} from 'react';
import pt from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// Readux Stuff
import {connect} from 'react-redux';
import {setCompanyDetails} from '../../../redux/actions/user-actions';
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
  }
};

const ProfielCompanyEdit = ({classes, open, onClose, companyProfile, setCompanyDetails}) => {

  if (!open) {
    return null;
  }
  const [newCP, setNewCP] = useState(companyProfile);

  const handleChange = (e) => {

    let companyProfileUpdate = Object.assign({}, newCP);
    companyProfileUpdate[e.target.name] = e.target.value;
    setNewCP(companyProfileUpdate); 
  };

  const handleClose = () => onClose();

  const handleSubmit = () => {
    onClose();
    setCompanyDetails(newCP);
  };


  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Профиль компани</DialogTitle>
        <DialogContent>
          <form>
            <div className={classes.imageWrapper}>
              <img src={newCP.imageUrl} alt="Логотип компании" className={classes.profileImage} />
              <input type="file" id="imageInput" hidden="hidden" onChange={() => {}} />
              <MyButton title="Обновить логотип" onClick={() => {}} className={classes.button} placement={"top"}>
                  <EditIcon color="primary" />
              </MyButton>
            </div>
            
            <TextField
              name="companyName" type="text" label="Название компании" className={classes.textField}
              value={newCP.companyName} onChange={handleChange} fullWidth
            />
            <TextField
              name="owner" type="text" label="Владелец аккаунта" className={classes.textField} disabled
              value={newCP.owner} onChange={() => { }} fullWidth
            />
            <TextField
              name="createdAt" type="text" label="Дата регистраци" className={classes.textField} disabled
              value={newCP.createdAt} onChange={() => { }} fullWidth
            />

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

ProfielCompanyEdit.propTypes = {
  setCompanyDetails: pt.func.isRequired,
  companyProfile: pt.object,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  classes: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  companyProfile: state.user.companyProfile,
});

export default connect(mapStateToProps, {setCompanyDetails})(withStyles(styles)(ProfielCompanyEdit));
