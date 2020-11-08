import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import pt from 'prop-types';
import icon from '../images/user.png';
// Redux Stuff
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/user-actions';
// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


// const styles = (theme) => ({
//   ...theme
// });
const styles = {
  form: {
    textAlign: `center`,
  },
  pageTitle: {
    margin: `10px auto 10px auto`,
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


class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: ``,
      password: ``,
      confirmPassword: ``,
      nickname: ``,
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   fetch(`/api/signup`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8'
  //     },
  //     body: JSON.stringify({
  //       email: "korzan.va@mail.ru",
  //       password: "qazwsx12",
  //       confirmPassword: "qazwsx12",
  //       nickname: "Vyaccheslav"
  //     }),
  //   })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //     console.log(err);
  //   })
  // }
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
      nickname: this.state.nickname,
    };

    this.props.signupUser(newUserData, this.props.history);
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
          <img src={icon} alt="icon user" width="40" height="40" className={classes.image} />
          <Typography variant="h3" className={classes.pageTitle}>
            Регистрация
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email" name="email" type="email" label="Email" fullWidth
              className={classes.TextField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField id="password" name="password" type="password" label="Password" fullWidth
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.TextField}
              value={this.state.password}
              onChange={this.handleChange}
            />
            <TextField id="confirmPassword" name="confirmPassword" type="password" label="ConfirmPassword" fullWidth
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.TextField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
            <TextField id="nickname" name="nickname" type="text" label="Nickname" fullWidth
              helperText={errors.nickname}
              error={errors.nickname ? true : false}
              className={classes.TextField}
              value={this.state.nickname}
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
            <small>Уже есть аккаунт? - <Link to="/login">войдите</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Signup.propTypes = {
  classes: pt.object.isRequired,
  history: pt.object.isRequired,
  user: pt.object.isRequired,
  UI: pt.object.isRequired,
  signupUser: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
export default connect(mapStateToProps, {signupUser})(withStyles(styles)(Signup));
