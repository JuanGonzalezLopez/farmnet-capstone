import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

//made components
import App from './App';

//mui components
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//redux store
import store from './store/Store'

const theme = createMuiTheme({
  palette: {
    primary: { main: "#4d8550" },
    secondary: { main: "#c7c7c7" },
  }
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
