import React from 'react';
import pt from 'prop-types';
import {Redirect} from 'react-router-dom';
// Redux stuff
import {connect} from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';  
import Grid from '@material-ui/core/Grid';
// Component
import RulesContainer from '../components/rules/rules-container/rules-container';
import route from '../utils/routes';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: `flex`,
    justifyContent: `center`,
  },
}));


const CreateRule = ({ userProfile }) => {
  if (!userProfile.email) return <Redirect to={route.ROOT} />;

  const classes = useStyles();

  return (
      <Grid container spacing={2} className={classes.root}>
        <Grid item sm={10} xs={12}>
          <RulesContainer />
        </Grid>
      </Grid>
  );
};

CreateRule.propTypes = {
  userProfile: pt.object.isRequired,
}
const mapStateToProps = (state) => ({
  userProfile: state.user.userProfile,
})

export default connect(mapStateToProps)(CreateRule);
// export default CreateRule;
