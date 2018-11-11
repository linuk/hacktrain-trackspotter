import React from 'react';
import Button from '@material-ui/core/es/Button/Button';
import Link from 'react-router-dom/es/Link';
import Typography from '@material-ui/core/es/Typography/Typography';

import logo from '../assets/logo.png';
import Layout from '../components/Layout';
import './Onboarding.sass';

const title = 'TrackSpotter';

export default () => (
  <Layout padding='1rem' marginTop='-15vh'>
    <img src={logo} alt="Track Spotter main logo"
         className="logo animated fadeInDown"/>
    <Typography
      component="h1"
      variant="h1"
      gutterBottom
      style={{ fontSize: '2.5rem', margin: '1.5rem' }}
      className="animated fadeInUp delay-500"
    >
      {title}
    </Typography>
    <Link to='/tutorial'>
      <Button
        color="primary"
        variant="contained"
        className="animated fadeInUp delay-1s"
      >
        START
      </Button>
    </Link>
  </Layout>
);

