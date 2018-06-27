import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import SpotifyWebApi from './../helpers/SpotifyWebApi';

import Header from './Header';
import Breadcrumb from './Breadcrumb';
import SearchBar from './SearchBar';

import './../css/Albums.css';
import MusicalNote from 'react-icons/lib/io/ios-musical-note';

class Albums extends Component {
    constructor() {
        super();
        this.selectedAlbum = null;
        this.state = {redirect : false};
    }

    selectAlbum(idAlbum, e) {
        new SpotifyWebApi().getAlbum(idAlbum)
            .then(response => {
                this.processResultsAlbum(response);
            });
    }

    processResultsAlbum(albumData) {
        let   artist = albumData.artists[0].name,
        title = albumData.name,
        cover = albumData.images[1].url,
        tracks = albumData.tracks.items.map(track => {
            return {
                id : track.id,
                name : track.name,
                preview: track.preview_url
            };
        });
        this.selectedAlbum = {
            artist, title, cover, tracks
        }
        this.setState({
            redirect : true
        });
    }

    render() {
        let selectedArtist = (!!this.props.location.state)
            ? this.props.location.state.selectedArtist
            : null,
        albums = (!!this.props.location.state)
            ? this.props.location.state.albums
            : [];
        // If artist is not set then, redirect to Home page
        if (selectedArtist == null) {
            return <Redirect
                to={{
                    pathname: '/'
                }}
            />;
        }

        selectedArtist.cover = !!selectedArtist.cover
            ? <img src={selectedArtist.cover} alt="" />
            : <MusicalNote></MusicalNote>;

        let navList = [
            {name: 'Home'},
            {name: 'Artists'},
            {name: selectedArtist.name, actual: true}
        ];

        if(this.state.redirect) {
            return <Redirect
                to={{
                    pathname: '/songs',
                    state: {selectedAlbum: this.selectedAlbum}
                }}
            />;
        }
        return (
            <div className="page-container">
                <div className="page-content">
                    <Header positionTo='left' />
                    <SearchBar defaultText="Search for another artist" inHeader={true} />
                    <div className="albums-header">
                        {selectedArtist.cover}
                        <span>
                            <h1>{selectedArtist.name}</h1>
                            <p>
                                {selectedArtist.genres.map(genre => {
                                    return `${genre} / `
                                })}
                            </p>
                        </span>
                        <Breadcrumb list={navList} />
                    </div>
                    <div className="albums-container">
                        {albums.map(album => {
                            album.cover = !!album.cover
                                ? <img className="album-cover" src={album.cover} alt=""/>
                                : <MusicalNote size={230}></MusicalNote>;
                            return (
                                <div className="album-container" key={album.id} onClick={this.selectAlbum.bind(this, album.id)}>
                                    {album.cover}
                                    <span>
                                        <p>{album.name}</p>
                                        <p>{album.releaseDate}</p>
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Albums;
