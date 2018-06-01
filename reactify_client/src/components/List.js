import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let displayAlbum = this.props.itemsAlbum,
            i = 0;
            console.log(this.props.ejemplo);
        return (
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
        )
    }
}
export default List;
