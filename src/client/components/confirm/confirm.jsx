import React, { useState } from 'react';
import pt from 'prop-types';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';


const Confirm = ({ open, onOk, onCancel, title }) => {
  
  return (
    <>
      <Dialog
        open={open}
        onClose={onCancel}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {title}
        </DialogTitle>

        <DialogActions>
          <Button color="primary" onClick={onCancel}>
            Отменить
          </Button>
          <Button color="secondary" onClick={onOk}>
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
