import React, { Component } from 'react';

import Authorization from './../helpers/Authorization';
import SpotifyWebApi from './../helpers/SpotifyWebApi';
import List from './List';

import '../css/Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token : null,
            album : null
        };
    }

  componentDidMount() {
      let me = this;
      // get the token and show the new album
      new Authorization().then(response => {
          me.setState({
              token: response
          });
          if (!!me.state.token) {
              me.getAlbum();
          } else {
              new Error("ooops, looks that we are missing the token dude.");
          }
      });
  }

  getAlbum() {
      // init SpotifyWebApi
    let spotifyApi = new SpotifyWebApi(this.state.token);
    spotifyApi.getAlbum('7ihXTrwWuwFTKqpca7D9dr').then(data => {
        this.processAlbum(data);
    });
  }

  processAlbum(albumData) {
      let   artists = albumData.artists[0].name,
            albumTitle = albumData.name,
            cover = albumData.images[1].url,
            tracks = albumData.tracks.items.map(track => {
                return {
                    name : track.name,
                    preview: track.preview_url
                };
            });
      this.setState({
          album : {
              artists, albumTitle, cover, tracks
          }
      });
  }

  showAlbum() {
        if (!!this.state.album) {
            let displayAlbum = this.state.album,
                i = 0;
                return(
                    <List itemsAlbum={displayAlbum} ejemplo={"esto es un ejemplo"}/>
                );
      } else {
          return (<p>No hay Album</p>);
      }
  }

  render() {
    return (
      <div>
          <h2>Home Page</h2>
          {this.showAlbum()}
      </div>
    );
  }
}

export default Home;
