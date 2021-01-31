import React, {useState, useEffect} from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { clearMessage } from '../../../redux/actions/ui-actions';
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
    // backgroundColor: theme.palette.secondary.light,
    // color: theme.palette.primary.main,
    zIndex: 2000,
  },
}));


const MessageBar = ({ message, clearMessage }) => {

  if (!message.message) return null;
  const classes = useStyles();

  const [isSnack, setIsSnack] = useState(false);
  useEffect(() => {
    if (message.message) {
      setIsSnack(true); 
    }
  }, [message]);

  const handleCloseMessageBar = () => {
    clearMessage();
    setIsSnack(false);
  };

  return (
    <MuiSnackbar open={isSnack} autoHideDuration={message.timeout} onClose={handleCloseMessageBar} >
      <Alert onClose={handleCloseMessageBar} severity={message.type} className={classes.snack}>
        {message.message}
      </Alert>
    </MuiSnackbar>
  );
}

MessageBar.propTypes = {
  message: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.UI.message,
});

const mapActionsToProps = {
  clearMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(MessageBar);
