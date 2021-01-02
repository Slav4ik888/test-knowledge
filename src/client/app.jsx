import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import route from './utils/routes';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// Redux
import store from './redux/store';
import { logoutUser, getUserAndCompanyData } from './redux/actions/user-actions';
import { getAllEmployeesData, getAllPositions, getAllDocuments } from './redux/actions/data-actions';
import { userActionType } from './redux/types';
// MUI Stuff
// import { ThemeProvider } from '@material-ui/core/styles';
// import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// import themeFile from './utils/theme';
// Pages
import Home from './pages/home';
import SignupCompany from './pages/signup-company';
import Login from './pages/login';
import CreateRule from './pages/create-rule';
// Components
import Navbar from './components/navbar/navbar';
import AuthRoute from './utils/auth-route';
import PrivateRoute from './utils/private-route';
import Snackbar from './components/dialogs/snackbar/snackbar';


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
    store.dispatch(getAllEmployeesData());// Загружаем данные обо всех пользователях
    store.dispatch(getAllPositions());// Загружаем данные обо всех positions
    store.dispatch(getAllDocuments());// Загружаем данные обо всех documents
  }
};

// const theme = createMuiTheme(themeFile);


const App = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path={route.HOME} component={Home} />
          
          <PrivateRoute exact path={route.CREATE_RULE} render={() => <CreateRule />} />

          <AuthRoute exact path={route.SIGNUP_COMPANY} component={SignupCompany} />
          <AuthRoute exact path={route.LOGIN} component={Login} />
          <Route exact path={route.ROOT} />

          <Route
            render={() => (
              <>
                <h1>
                  404.
                  <br />
                  <small>Page not found</small>
                </h1>
                <Redirect to={route.ROOT} />
              </>
            )}
          />
        </Switch>
      </div>
      <Snackbar />
    </Router>
  );
};

export default App;
