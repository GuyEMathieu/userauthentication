import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme'

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <App />
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

