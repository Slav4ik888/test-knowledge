import React, {useState} from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Readux Stuff
import {connect} from 'react-redux';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
// Icons
import CircularProgress from '@material-ui/core/CircularProgress';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import FolderIcon from '@material-ui/icons/Folder';
// Component


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
  textField: {
    margin: `10px auto 10px auto`,
  },
  editIcon: {
    marginRight: 40,
  },
  input: {
    marginLeft: theme.spacing(1),
    width: `calc(100% - 60px)`,
    flex: 1,
    padding: theme.spacing(1),
  },
  iconButton: {
    padding: 10,
  },
  customError: {
    color: `red`,
    fontSize: `0.8rem`,
    marginTop: 10,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    minWidth: 300,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const PosMain = ({ open, onClose, UI: { loading, errors, messages }, companyProfile: {positions}}) => {

  if (!open) {
    return null;
  }
  const classes = useStyles();

  const handleClose = () => onClose();

  const handleSubmit = (e) => {
    e.preventDefault();
    // addUser(email);
  };
  const handleEditPos = (id) => {
    console.log(`handleEditPos id: `, id);
  };
  const handleDelPos = (id) => {
    console.log(`handleDelPos id: `, id);
  };

  const [newPos, setNewPos] = useState(``);
  const handleChangeAddPos = (e) => {
    console.log('e.target.value: ', e.target.value);
    setNewPos(e.target.value);
  };
  const handleAddPos = () => {
    console.log(`new position: `, newPos);
    setNewPos(``);
  };


  return (
    <>
      <Dialog disableBackdropClick disableEscapeKeyDown className={classes.dialog}
        open={open} onClose={handleClose} fullWidth maxWidth="sm"
      >
        <DialogTitle>Настройки</DialogTitle>
        <DialogContent>
          <List>
            {positions &&
              positions.map((pos) => <ListItem key={pos.id}>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={pos.title}/>

                <ListItemSecondaryAction onClick={() => handleEditPos(pos.id)} className={classes.editIcon}>
                  <IconButton aria-label="Edit">
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                <Divider className={classes.divider} orientation="vertical" />
                <ListItemSecondaryAction onClick={() => handleDelPos(pos.id)}>
                  <IconButton edge="end" aria-label="Delete">
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>

              </ListItem>)
            }
          </List> 

          <Paper component="form" className={classes.formControl}>
            <InputBase
              className={classes.input}
              placeholder="Добавить должность"
              inputProps={{ 'aria-label': 'новая должность' }}
              type="text"
              value={newPos}
              onChange={handleChangeAddPos}
            />
            <IconButton edge="end" aria-label="Add" onClick={handleAddPos}>
              <AddIcon />
            </IconButton>
          </Paper>
          {
            errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )
          }
        </DialogContent>
        <DialogActions className={classes.dialog}>
          <Button onClick={handleClose} >
            Отмена
          </Button>
          <Button onClick={handleSubmit} disabled={loading} variant="contained" color="primary">
            Сохранить
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

PosMain.propTypes = {
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  UI: pt.object.isRequired,
  companyProfile: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  companyProfile: state.user.companyProfile,
});

export default connect(mapStateToProps)(PosMain);
