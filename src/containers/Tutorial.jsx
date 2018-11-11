import React from 'react';
import Button from '@material-ui/core/es/Button/Button';
import Link from 'react-router-dom/es/Link';
import Typography from '@material-ui/core/es/Typography/Typography';

import Layout from '../components/Layout';
import { assetDict, assetImages } from '../configs';
import './Tutorial.sass';

const assetDescription = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, aut deleniti dolorum fuga laudantium obcaecati.';

export default class Tutorial extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      assetId: 0
    };
  }

  componentWillMount = () => {
    this.changeRandomAssetID();
  };

  changeRandomAssetID = () => {
    const { length } = Object.keys(assetDict);
    const randomAssetID = parseInt((Math.random() * length), 10);
    this.setState({ assetId: randomAssetID });
  };

  render() {

    const { assetId } = this.state;
    const assetTitle = assetDict[assetId];
    const assetImageURL = assetImages[assetId];

    return (
      <Layout padding='1rem 2rem' isAppBarShow
              appBarTitle={assetTitle.toUpperCase()}>
        <div className="tutorial_assetImageContainer animated fadeInDown">
          <img src={assetImageURL} className="tutorial_assetImage"
               alt={assetTitle}/>
        </div>
        <Typography variant="body2" gutterBottom
                    className="animated fadeInDown delay-500"
                    style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          {assetDescription}
        </Typography>
        <Link to={`/game?assetID=${assetId}`}>
          <Button color="primary" variant="contained"
                  className="animated fadeInUp delay-1s">
            START
          </Button>
        </Link>
      </Layout>
    );
  }
}
