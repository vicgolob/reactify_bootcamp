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
      return Authorization.getToken().then(gotToken => {
          this.setState({
              token: gotToken
          });
          this.getAlbum();
      });

  }

  getAlbum() {
      // init SpotifyWebApi
      if((this.state.token !== null) &&
        SpotifyWebApi.initApi(this.state.token)
        ) {
          SpotifyWebApi.getAlbum('69Wr9DvWfIJRTi5NUGeVTn')
            .then(data => {
                this.processAlbum(data);
            });
      }
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
          token: this.state.token,
          album : {
              artists, albumTitle, cover, tracks
          }
      });
  }

  showAlbum() {
      if(this.state.album !== null) {
          let displayAlbum = this.state.album;
          let i = 0;
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
          return(<p>No hay Album</p>);
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
