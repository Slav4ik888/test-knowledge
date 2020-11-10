import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import route from '../utils/routes';
import pt from 'prop-types';
import icon from '../images/user.png';
// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux Stuff
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/user-actions';


// const styles = (theme) => ({
//   ...theme
// });

const styles = {
  paper: {
    padding: 20,
    marginTop: 20
  },
  form: {
    textAlign: `center`,
  },
  pageTitle: {
    margin: `10px auto 20px auto`,
  },
  image: {
    margin: `20px auto 20px auto`,
  },
  textField: {
    margin: `10px auto 10px auto`,
  },
  button: {
    marginTop: 30,
    position: `relative`,
  },
  customError: {
    color: `red`,
    fontSize: `0.8rem`,
    marginTop: 10,
  },
  progress: {
    position: `absolute`,
    color: `#147070`,
  },
};


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: ``,
      password: ``,
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.UI.errors !== state.errors) {
      return {
        errors: props.UI.errors,
      };
    }
    return null;
  }

  handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const {classes, UI: {loading}} = this.props;
    const {errors} = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Paper className={classes.paper}>
            <img src={icon} alt="icon user" width="40" height="40" className={classes.image} />
            <Typography variant="h5" className={classes.pageTitle}>
              Войти в аккаунт
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="email" name="email" type="email" label="Введите email" fullWidth
                className={classes.TextField}
                helperText={errors.email}
                error={errors.email ? true : false}
                value={this.state.email}
                onChange={this.handleChange}
              />
              <TextField id="password" name="password" type="password" label="Введите пароль" fullWidth
                helperText={errors.password}
                error={errors.password ? true : false}
                className={classes.TextField}
                value={this.state.password}
                onChange={this.handleChange}
              />
              {
                errors.general && (
                  <Typography variant="body2" className={classes.customError}>
                    {errors.general}
                  </Typography>
                )
              }
              <Button type="submit" variant="contained" color="primary"
                className={classes.button}
                disabled={loading}
              >
                Войти
                {
                  loading && (
                    <CircularProgress size={30} className={classes.progress}/>
                  )
                }
              </Button>
              <br />
              <br />
              <small>Нет аккаунта? - <Link to={route.SIGNUP_COMPANY}>зарегистрируйтесь</Link></small>
            </form>
          </Paper>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: pt.object.isRequired,
  loginUser: pt.func.isRequired,
  user: pt.object.isRequired,
  UI: pt.object.isRequired,
  history: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
const mapActionsToProps = {
  loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));
