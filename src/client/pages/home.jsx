import React, {Component} from 'react';
import pt from 'prop-types';
// Redux stuff
// import {connect} from 'react-redux';
// import {getScreams} from '../redux/actions/data-actions';
// MUI Stuff
import Grid from '@material-ui/core/Grid';
// Component
// import Scream from '../components/scream';
// import Profile from '../components/profile';


class Home extends Component {
  // componentDidMount() {
  //   this.props.getScreams();
  // }

  render() {
    // const {screams, loading} = this.props.data;
    // console.log('screams: ', screams);
    
    // let recentScreamsMarkup = !loading ? (
    //   screams.map((scream) => (
    //     <Scream key={scream.screamId} scream={scream} />
    //   ))
    // ) : <p>Loading...</p>;
    return (
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          Меню...
        </Grid>
        <Grid item sm={8} xs={12}>
          Блок для работы
        </Grid>
      </Grid>
    );
  }
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
