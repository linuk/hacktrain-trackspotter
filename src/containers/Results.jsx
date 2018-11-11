import React from 'react';

import Button from '@material-ui/core/es/Button/Button';

import Layout from '../components/Layout';
import './Results.sass';
import Link from 'react-router-dom/es/Link';

const ProgressBar = require('progressbar.js');
const STATISTICS_CHART = 'SEMICIRCLE_ID';

export default class Results extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      accuracy: 0
    };
  }

  componentWillMount() {
    this.getAccuracy();
  }

  componentDidMount() {
    setTimeout(() => {
      console.log(this.state.accuracy);
      const circle = new ProgressBar.Circle(`#${STATISTICS_CHART}`, {
        strokeWidth: 4,
        duration: 3000,
        easing: 'easeInOut',
        color: '#e1b73c',
        text: {
          value: `<p style="font-size: 2rem"> ${this.state.accuracy *
          100} %</p>`,
          alignToBottom: false
        }
      });
      circle.animate(this.state.accuracy);
    }, 0);

  }

  getAccuracy = () => {
    const accuracy = this.props.location.search.replace('?accuracy=', '');
    this.setState({ accuracy });
  };

  render() {
    return (
      <Layout padding="1.5rem 2rem" isAppBarShow appBarTitle="STATISTICS"
              marginTop='-15vh'>
        <div className="results__container">
          <div className="results__chart" id={STATISTICS_CHART}/>
          <p className="results__description animated fadeInUp"
             style={{ textAlign: 'center' }}>
            Thank you for using TrackSpotter.<br/>
            Feel free to play it again. <br/>
            Have a great journey.
          </p>
        </div>
        <Link to='/tutorial'>
          <Button
            color="primary"
            variant="contained"
            className="results__button animated fadeInUp delay-500"
          >
            PLAY AGAIN
          </Button>
        </Link>
      </Layout>
    );
  }

}
