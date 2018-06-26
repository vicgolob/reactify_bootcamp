import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Header from './Header';
import SearchBar from './SearchBar';
import Breadcrumb from './Breadcrumb';
import PlayController from './PlayController';

import FavoriteIconBorder from 'react-icons/lib/md/favorite-border';
import FavoriteIcon from 'react-icons/lib/md/favorite';

import './../css/Songs.css';

class Songs extends Component {
    constructor() {
        super();
        this.state = {
            favorites : {}
        };
    }

    addFavorite(track, album, e) {
        if (sessionStorage.getItem('favorites') == null) {
            sessionStorage.setItem('favorites', JSON.stringify({}));
        }
        if (JSON.parse(sessionStorage.getItem('favorites'))[track.id] === undefined) {
            let favorites = JSON.parse(sessionStorage.getItem('favorites'));
            favorites[track.id] = {
                id : track.id,
                name : track.name,
                artist : album.artist,
                title : album.title,
                cover : album.cover,
                preview : track.preview
            };
            sessionStorage.setItem('favorites', JSON.stringify(favorites));

            let favsState = this.state.favorites;
            favsState[track.id] = true;
            this.setState({
                favorites : favsState
            });
        }
    }

    render() {
        // If no album was selected, redirect to Home page
        if (!this.props.location.state) {
            return <Redirect
                to={{
                    pathname: '/'
                }}
            />;
        }

        let album = (!!this.props.location.state.selectedAlbum)
        ? this.props.location.state.selectedAlbum
        : null;
        let navList = [
            {name: 'Home'},
            {name: 'Artists'},
            {name: album.artist},
            {name: album.title, actual: true}
        ];

        return (
            <div className="page-container">
                <div className="page-content">
                    <Header positionTo='left' />
                    <SearchBar defaultText="Search for another artist" inHeader={true} />
                    <Breadcrumb list={navList} />
                    <div className="songs-container">
                        <div className="album-info">
                            <h1>{album.title}</h1>
                            <h3>{album.artist}</h3>
                            <img src={album.cover} alt="" />
                        </div>
                        <ul className="album-tracks">
                            {album.tracks.map(track => {
                                return (
                                    <li key={track.id}>
                                        <span><p>{track.name}</p></span>
                                        <PlayController
                                            options={{
                                                id: track.id,
                                                preview: track.preview
                                            }}
                                        />

                                        <span>
                                            {
                                                (!!this.state.favorites[track.id]) ||
                                                (!!JSON.parse(sessionStorage.getItem('favorites')) && JSON.parse(sessionStorage.getItem('favorites'))[track.id])
                                                ? <FavoriteIcon size={30} fill="#FF5A5F" />
                                                : <FavoriteIconBorder size={30} onClick={this.addFavorite.bind(this, track, album)}/>
                                            }
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Songs;
