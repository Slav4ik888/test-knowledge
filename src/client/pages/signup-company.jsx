import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import route from '../utils/routes';
import pt from 'prop-types';
import icon from '../images/user.png';
// Redux Stuff
import {connect} from 'react-redux';
import {signupCompany} from '../redux/actions/user-actions';
// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


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


class SignupCompany extends Component {
  constructor() {
    super();
    this.state = {
      email: ``,
      password: ``,
      confirmPassword: ``,
      companyName: ``,
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
    this.setState({loading: true});
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      companyName: this.state.companyName,
    };

    this.props.signupCompany(newUserData, this.props.history);
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
              Регистрация
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField id="companyName" name="companyName" type="text" label="Название компании" fullWidth
                helperText={errors.companyName}
                error={errors.companyName ? true : false}
                className={classes.TextField}
                value={this.state.companyName}
                onChange={this.handleChange}
              />
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
              <TextField id="confirmPassword" name="confirmPassword" type="password" label="Повторите пароль" fullWidth
                helperText={errors.password}
                error={errors.password ? true : false}
                className={classes.TextField}
                value={this.state.confirmPassword}
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
                Зарегистрироваться
                {
                  loading && (
                    <CircularProgress size={30} className={classes.progress}/>
                  )
                }
              </Button>
              <br />
              <br />
              <small>Уже есть аккаунт? - <Link to={route.LOGIN}>войдите</Link></small>
            </form>
          </Paper>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

SignupCompany.propTypes = {
  classes: pt.object.isRequired,
  history: pt.object.isRequired,
  user: pt.object.isRequired,
  UI: pt.object.isRequired,
  signupCompany: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
export default connect(mapStateToProps, {signupCompany})(withStyles(styles)(SignupCompany));
