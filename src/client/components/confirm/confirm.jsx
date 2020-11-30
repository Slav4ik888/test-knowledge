import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
}));

const Confirm = ({ open, onOk, onCancel, title }) => {
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
          <Button variant="outlined" onClick={onCancel}>
            Отменить
          </Button>
          <Button variant="outlined" color="secondary" onClick={onOk}>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

Confirm.propTypes = {
  onOk: pt.func.isRequired,
  onCancel: pt.func.isRequired,
  open: pt.bool.isRequired,
  title: pt.string.isRequired,
}

export default Confirm;
