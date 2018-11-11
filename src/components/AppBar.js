import React from 'react';
import Typography from '@material-ui/core/es/Typography';
import Toolbar from '@material-ui/core/es/Toolbar';
import AppBar from '@material-ui/core/es/AppBar';

import './AppBar.sass';
import logo from '../assets/logo.png';
import { withRouter } from 'react-router-dom';

const Nav = (props) => {

  const backToHome = () => {
    props.history.push('/');
  };

  return (
    <AppBar position="static" color="primary" className='appBar'>
      <Toolbar style={{ justifyContent: 'center' }}>
        <img src={logo} alt="main home" className='appBar__logo'
             onClick={backToHome}/>
        <Typography variant="h6" color="inherit">
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Nav);