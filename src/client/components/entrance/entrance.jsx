import React from 'react';
import pt from 'prop-types';
import {Link} from 'react-router-dom';
import route from '../../utils/routes';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
// Icons
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
  buttons: {
    "textAlign": `center`,
    '& a': {
      margin: `20px 10px`
    }
  }
};

const Entrance = ({classes}) => {
  return (
    <div className={classes.buttons}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={route.LOGIN}
        endIcon={<AccountCircle />}
      >
        Войти
      </Button>
    </div>
  );
}

Entrance.propTypes = {
  classes: pt.object.isRequired,
}
export default withStyles(styles)(Entrance);
