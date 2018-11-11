import React from 'react';
import Button from '@material-ui/core/es/Button/Button';
import { green, red } from '@material-ui/core/es/colors';
import { Clear, Done } from '@material-ui/icons';

import Layout from '../components/Layout';
import { getImage, HOST } from '../apis';
import './Game.sass';
import Loader from '../components/Loader';
import { assetDict } from '../configs';

const IMAGE_IN_ANIMATION = 'fadeIn';
const IMAGE_OUT_ANIMATION = 'fadeOut';
const ROUNDS = 10;

export default class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: null,
      imageID: null,
      gameRounds: 0,
      assetID: 1
    };
  }

  componentWillMount() {
    this.setAssetId();
    this.getImage();
  }

  setAssetId = () => {
    const assetID = this.props.location.search.replace('?assetID=', '');
    this.setState({ assetID });
  };

  getImage = async () => {
    const res = await getImage();
    if (res !== null) {
      this.setState({
        imageID: res.id,
        imageURL: HOST + res.url,
      }, () => {
        setTimeout(() => {
          const image = document.getElementById('gameImage');
          image.classList.remove(IMAGE_OUT_ANIMATION);
          image.classList.add(IMAGE_IN_ANIMATION);
        }, 0);
      });
    }
  };

  nextImage = () => {
    if (this.state.gameRounds < ROUNDS) {
      const image = document.getElementById('gameImage');
      image.classList.remove(IMAGE_IN_ANIMATION);
      image.classList.add(IMAGE_OUT_ANIMATION);
      setTimeout(() => this.getImage(), 500);
    } else {
      console.log('game over');
    }
  };


  render() {

    const { imageURL, assetID } = this.state;
    const isImageLoaded = imageURL !== null;
    const appBarTitle = assetDict[assetID];

    const Image = isImageLoaded ?
      <img id="gameImage" src={imageURL} alt="screenshot from train"
           className={`game__image animated ${IMAGE_IN_ANIMATION}`}/> :
      <Loader/>;

    const Buttons = isImageLoaded ? (
      <div className="game__buttons">
        <Button
          variant="contained"
          style={{ backgroundColor: red['A400'] }}
          className="game__button animated fadeInUp "
          onClick={this.nextImage}
        >
          <Clear/>
        </Button>
        <Button
          variant="contained"
          className="game__button animated fadeInUp delay-500"
          style={{ backgroundColor: green['A700'] }}
          onClick={this.nextImage}
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