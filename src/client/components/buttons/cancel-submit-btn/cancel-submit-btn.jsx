import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  onCancel: {
    marginRight: theme.spacing(2),
  },
}));


const CancelSubmitBtn = ({ onCancel, onSubmit, submitText, disabled, loading }) => {
  const classes = useStyles();

  return (
    <>
      <Button onClick={onCancel} className={classes.onCancel}>
        Отмена
      </Button>
      <Button onClick={onSubmit} disabled={disabled} variant="contained" color="primary">
        {
          submitText ? submitText : `Сохранить`
        }
        {
          loading && (
            <CircularProgress size={30} className={classes.progress} />
          )
        }
      </Button>
    </>
  )
};

CancelSubmitBtn.propTypes = {
  onCancel: pt.func.isRequired,
  onSubmit: pt.func.isRequired,
  submitText: pt.string,
  disabled: pt.bool.isRequired,
  loading: pt.bool.isRequired,
}

export default CancelSubmitBtn;
