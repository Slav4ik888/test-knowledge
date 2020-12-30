import React, {useState} from 'react';
import pt from 'prop-types';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
// Readux Stuff
import {connect} from 'react-redux';
import {updateCompanyDetails, deleteCompany} from '../../../redux/actions/user-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// Icons
import EditIcon from '@material-ui/icons/Edit';
// Components
import MyButton from '../../buttons/button-with-icon/button-with-icon';
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
  }
}));

const ProfielCompanyEdit = ({ open, onClose, user: { userProfile, companyProfile }, updateCompanyDetails, deleteCompany}) => {

  if (!open) {
    return null;
  }
  // dayjs.extend(relativeTime);
  const classes = useStyles();
  const [isChange, setIsChange] = useState(false);
  const [newCP, setNewCP] = useState(companyProfile);

  const handleChange = (e) => {

    let companyProfileUpdate = Object.assign({}, newCP);
    companyProfileUpdate[e.target.name] = e.target.value;
    companyProfileUpdate.lastChange = new Date().toISOString();
    setNewCP(companyProfileUpdate); 
    setIsChange(true);
  };

  const handleClose = () => onClose();

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    updateCompanyDetails(newCP);
  };

  const handleDeleteCompanyAccount = () => {
    deleteCompany();
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
        <DialogTitle onClose={handleClose}>Профиль компани</DialogTitle>
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
              name="owner" type="text" label="Владелец аккаунта" className={classes.textField}
              disabled={userProfile.email !== companyProfile.owner}
              value={companyProfile.owner} onChange={() => { }} fullWidth
            />
            <TextField
              name="createdAt" type="text" label="Зарегистрирован" className={classes.textField} disabled
              value={dayjs(companyProfile.createdAt).locale(`ru`).format('DD MMMM YYYY')} onChange={() => { }} fullWidth
            />

            {
              userProfile.role === `Владелец` &&
                <DeleteButton type={`companyProfile`} button onDel={handleDeleteCompanyAccount} />
            }

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

ProfielCompanyEdit.propTypes = {
  updateCompanyDetails: pt.func.isRequired,
  deleteCompany: pt.func.isRequired,
  user: pt.object.isRequired,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {updateCompanyDetails, deleteCompany})(ProfielCompanyEdit);
