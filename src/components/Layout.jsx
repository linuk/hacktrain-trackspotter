import React from 'react';
import './Layout.sass';
import Grid from '@material-ui/core/es/Grid/Grid';
import AppBar from './AppBar';

export default ({ children, padding = '0', isAppBarShow = false, appBarTitle = '' }) => (
  <Grid container className="layout animated fadeIn">
    {isAppBarShow && <AppBar title={appBarTitle}/>}
    <Grid item xs={12} className="flexCenterCenter" style={{ padding }}>
      {children}
    </Grid>
  </Grid>
)