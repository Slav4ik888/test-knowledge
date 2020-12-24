import React from 'react';
import ReactDOM from 'react-dom';
// Redux
import {Provider} from 'react-redux';
import store from './redux/store';
// MUI Stuff
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utils/theme';

// Components
import App from './App';

const theme = createMuiTheme(themeFile);


ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  , document.getElementById('root'));
