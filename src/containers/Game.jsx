import React from 'react';
import Button from '@material-ui/core/es/Button/Button';
import { green, red } from '@material-ui/core/es/colors';
import { Clear, Done } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

import Layout from '../components/Layout';
import { getImage, HOST, sendResults } from '../apis';
import Loader from '../components/Loader';
import { assetDict } from '../configs';
import './Game.sass';

const IMAGE_IN_ANIMATION = 'fadeIn';
const IMAGE_OUT_ANIMATION = 'fadeOut';
const ROUNDS = 3;

const getAppBarTitle = (assetName) => (
  `Do you see a ${assetName}?`
);

class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: null,
      imageID: null,
      gameRounds: 0,
      assetID: 1,
      results: []
    };
  }

  componentWillMount() {
    this.setAssetId();
    this.getImage();
  }

  setAssetId = () => {
    const assetID = this.props.location.search.replace('?assetID=', '');
    this.setState({ assetID });
    console.log(assetID);
  };

  getImage = async () => {
    const res = await getImage();
    if (res !== null) {
      this.setState({
        imageID: res.id,
        imageURL: HOST + res.url
      }, () => {
        setTimeout(() => {
          const image = document.getElementById('gameImage');
          image.classList.remove(IMAGE_OUT_ANIMATION);
          image.classList.add(IMAGE_IN_ANIMATION);
        }, 0);
      });
    }
  };

  toResults = async () => {
    console.log(this.state.results);
    const body = JSON.stringify(this.state.results);
    console.log(body);
    await sendResults(body);
    const accuracy = 1.0;
    this.props.history.push(`/results?accuracy=${accuracy}`);
  };

  handleAssetInImage = () => {
    if (this.state.gameRounds < ROUNDS) {
      this.addResult(true);
      this.nextRound();
    }
  };

  handleAssetNotInImage = () => {
    if (this.state.gameRounds < ROUNDS) {
      this.addResult();
      this.nextRound();
    }
  };

  nextRound = () => {
    const image = document.getElementById('gameImage');
    image.classList.remove(IMAGE_IN_ANIMATION);
    image.classList.add(IMAGE_OUT_ANIMATION);
    this.setState({ gameRounds: this.state.gameRounds + 1 }, (state) => {
      if (this.state.gameRounds >= ROUNDS) {
        this.toResults();
      } else {
        setTimeout(() => this.getImage(), 500);
      }
    });
  };

  addResult = (isAssetInImage = false) => {
    const newResult = {
      'image_id': this.state.imageID,
      'asset_id': isAssetInImage ? this.state.assetID : null
    };
    this.setState({
      results: [...this.state.results, newResult]
    });
  };

  render() {

    const { imageURL, assetID } = this.state;
    const isImageLoaded = imageURL !== null;
    const appBarTitle = getAppBarTitle(assetDict[assetID]);

    const Image = isImageLoaded ?
      <img id="gameImage" src={imageURL} alt="screenshot from train"
           className={`game__image animated ${IMAGE_IN_ANIMATION}`}/> :
      <Loader/>;

    const Buttons = isImageLoaded ? (
      <div className="game__buttons">
        <Button
          variant="contained"
          style={{ backgroundColor: red['A400'] }}
          className="game__button animated fadeInUp"
          onClick={this.handleAssetNotInImage}
        >
          <Clear/>
        </Button>
        <Button
          variant="contained"
          className="game__button animated fadeInUp"
          style={{ backgroundColor: green['A700'] }}
          onClick={this.handleAssetInImage}
        >
          <Done/>
        </Button>
      </div>
    ) : null;

    return (
      <Layout isAppBarShow={true} appBarTitle={appBarTitle}>
        {Image}
        {Buttons}
      </Layout>
    );

  }

}

export default withRouter(Game);