import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
// Components
import { typeConfirm } from '../../../types';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
  button: {
    marginRight: theme.spacing(2),
  }
}));

const Confirm = ({ open, typeOk, onOk, onCancel, title }) => {
  const classes = useStyles();
  
  return (
    <>
      <Dialog
        open={open}
        onClose={onCancel}
        className={classes.dialog}
        maxWidth="xs"
      >
        <DialogTitle className={classes.dialog}>
          {title}
        </DialogTitle>

        <DialogActions className={classes.dialog}>
          <Button variant="outlined" onClick={onCancel} className={classes.button}>
            Отменить
          </Button>
          <Button variant="outlined" color="secondary" onClick={onOk}>
            {typeOk}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

Confirm.propTypes = {
  typeOk: pt.oneOf([typeConfirm.DEL, typeConfirm.SAVE, typeConfirm.WITHOUT_SAVE]).isRequired,
  onOk: pt.func.isRequired,
  onCancel: pt.func.isRequired,
  open: pt.bool.isRequired,
  title: pt.string.isRequired,
}

export default Confirm;
