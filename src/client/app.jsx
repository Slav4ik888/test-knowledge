import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// Redux
import store from './redux/store';
import {logoutUser, getUserData} from './redux/actions/user-actions';
import {userActionType} from './redux/types';
// MUI Stuff
import {ThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utils/theme';
// Components
import Navbar from './components/navbar/navbar';
import AuthRoute from './utils/auth-route';
// Pages
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';


const theme = createMuiTheme(themeFile);
  
const token = localStorage.TKidToken;
if (token && !token.includes(`Bearer undefined`)) {
  // console.log(`token: `, token);
  const decodedToken = jwtDecode(token);
  // console.log(`decodedToken: `, decodedToken);
  if (decodedToken.exp * 1000 < new Date(Date.now())) {
    store.dispatch(logoutUser());
  } else {
    store.dispatch({type: userActionType.SET_AUTHENTICATED});
    axios.defaults.headers.common[`Authorization`] = token;
    store.dispatch(getUserData());
  }
}

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="container">
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              component={Home}
            />
            <AuthRoute
              exact
              path="/signup"
              component={Signup}
            />
            <AuthRoute
              exact
              path="/login"
              component={Login}
            />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;