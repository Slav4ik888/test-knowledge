import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// MUI Stuff
import {ThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utils/theme';
// Components
import Navbar from './components/navbar';
import AuthRoute from './utils/auth-route';
// Pages
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';


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