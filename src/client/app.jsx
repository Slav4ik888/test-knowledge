import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import route from './utils/routes';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// Redux
import store from './redux/store';
import { logoutUser, getUserAndCompanyData } from './redux/actions/user-actions';
import { getAllUsersData, getPositions } from './redux/actions/data-actions';
import { userActionType } from './redux/types';
// MUI Stuff
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utils/theme';
// Components
import Navbar from './components/navbar/navbar';
import AuthRoute from './utils/auth-route';
// Pages
import Home from './pages/home';
import SignupCompany from './pages/signup-company';
import Login from './pages/login';


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
    store.dispatch(getUserAndCompanyData());
    store.dispatch(getAllUsersData());// Загружаем данные обо всех пользователях
    store.dispatch(getPositions());// Загружаем данные обо всех positions
    
  }
};

const theme = createMuiTheme(themeFile);


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="container">
          <Navbar />
          <Switch>
            <Route
              exact
              path={route.HOME}
              component={Home}
            />
            <AuthRoute
              exact
              path={route.SIGNUP_COMPANY}
              component={SignupCompany}
            />
            <AuthRoute
              exact
              path={route.LOGIN}
              component={Login}
            />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
