import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
}));


const CancelSubmitBtn = ({ onCancel, onSubmit, disabled, loading }) => {
  const clases = useStyles();

  return (
    <>
      <Button onClick={onCancel} >
        Отмена
      </Button>
      <Button onClick={onSubmit} disabled={disabled} variant="contained" color="primary">
        Сохранить
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
  disabled: pt.bool.isRequired,
  loading: pt.bool.isRequired,
}

export default CancelSubmitBtn;
