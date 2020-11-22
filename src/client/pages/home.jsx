import React, {Component} from 'react';
import pt from 'prop-types';
// Redux stuff
// import {connect} from 'react-redux';
// import {getScreams} from '../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';  
import Grid from '@material-ui/core/Grid';
// Component
import RulesContainer from '../components/rules/rules-container/rules-container';
// import Profile from '../components/profile';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: `flex`,
    justifyContent: `center`,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const Home = () => {
  const classes = useStyles();

  return (
      <Grid container spacing={2} className={classes.root}>
        <Grid item sm={8} xs={12}>
          <RulesContainer />
        </Grid>
      </Grid>
  );
};

Home.propTypes = {
  // getScreams: pt.func.isRequired,
  // data: pt.object.isRequired,
}
// const mapStateToProps = (state) => ({
//   data: state.data,
// })

// export default connect(mapStateToProps, {getScreams})(Home);
export default Home;
