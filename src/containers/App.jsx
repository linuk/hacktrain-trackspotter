import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/es/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import 'animate.css';

import Onboarding from './Onboarding';
import Tutorial from './Tutorial';
import Game from './Game';
import './App.sass';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f3d430',
    },
    secondary: {
      main: '#ed1683',
    },
  },
});

export default class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div className='router__wrapper'>
            <Route exact path='/' component={Onboarding}/>
            <Route path='/tutorial' component={Tutorial}/>
            <Route path='/game' component={Game}/>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}
