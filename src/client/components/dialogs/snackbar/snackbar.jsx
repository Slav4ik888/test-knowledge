import React, {useState, useEffect} from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import MuiSnackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  snack: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.main,
  },
}));


const Snackbar = ({ errors }) => {

  const classes = useStyles();

  const [isSnack, setIsSnack] = useState(false);
  useEffect(() => {
    if (errors.general) {
      setIsSnack(true); 
    }
  }, [errors.general]);

  const handleCloseSnackBar = () => setIsSnack(false); 

  return (
    <MuiSnackbar open={isSnack} autoHideDuration={6000} onClose={handleCloseSnackBar} >
      <Alert onClose={handleCloseSnackBar} severity="warning" className={classes.snack}>
        {errors.general}
      </Alert>
    </MuiSnackbar>
  );
}

Snackbar.propTypes = {
  errors: pt.object.isRequired,
};

export default Snackbar;
