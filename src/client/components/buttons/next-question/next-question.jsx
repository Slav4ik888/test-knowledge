import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// Components


const useStyles = makeStyles((theme) => ({
  container: {
    display: `flex`,
    justifyContent: `flex-end`,
    padding: theme.spacing(2, 0, 2, 0),
  },
  button: {
    marginRight: theme.spacing(2),
  }
}));

const NextQuestion = ({ onCallback, text, next }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          endIcon={next && <NavigateNextIcon />}
          onClick={onCallback} className={classes.button}
        >
          {text}
        </Button>
      </div>
    </>
  )
};

NextQuestion.propTypes = {
  onCallback: pt.func.isRequired,
  text: pt.string.isRequired,
}

export default NextQuestion;
