import React from 'react';
import Typography from '@material-ui/core/es/Typography';
import Toolbar from '@material-ui/core/es/Toolbar';
import AppBar from '@material-ui/core/es/AppBar';

import './AppBar.sass'

export default ({ title }) => (
  <AppBar position="static" color="primary" className='appBar'>
    <Toolbar style={{justifyContent: 'center'}}>
      <Typography variant="h6" color="inherit">
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
)