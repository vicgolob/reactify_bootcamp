import React, { Component } from 'react';

import Authorization from './../helpers/Authorization';
import SpotifyWebApi from './../helpers/SpotifyWebApi';

import '../css/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        token : null,
        album : null
    };

    this.processAlbum = this.processAlbum.bind(this);
    this.showAlbum = this.showAlbum.bind(this);
  }

  componentDidMount() {
      var self = this;
      // get the token and show the new album
      new Authorization().then(response => {
          self.setState({
              token: response
          });
          if (!!self.state.token) {
              self.getAlbum();
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
                    preview: track.external_urls.spotify
                };
            });
      this.setState({
          album : {
              artists, albumTitle, cover, tracks
          }
      });
      debugger;
  }

  showAlbum() {
        if (!!this.state.album) {
            let displayAlbum = this.state.album,
                i = 0;
                return(
                    <div className="album-container">
                      <div className="album-info">
                          <h2>{displayAlbum.albumTitle}</h2>
                          <h3>{displayAlbum.artists}</h3>
                          <img src={displayAlbum.cover} alt="" />
                      </div>
                      <ul className="album-tracks">
                          {displayAlbum.tracks.map(track => {
                              return (
                                <li key={++i}>
                                    <span>{track.name}</span>
                                    <span>
                                        <audio controls>
                                          <source src={track.preview} type="audio/mpeg" />
                                        </audio>
                                    </span>
                                </li>
                            )
                          })}
                      </ul>
                    </div>
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
