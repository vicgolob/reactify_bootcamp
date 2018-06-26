import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import SpotifyWebApi from './../helpers/SpotifyWebApi';

import Header from './Header';
import SearchBar from './SearchBar';
import Breadcrumb from './Breadcrumb';

import MusicalNote from 'react-icons/lib/io/ios-musical-note';

import '../index.css'
import '../css/Artists.css'

class Artists extends Component {
    constructor() {
        super();
        this.state = {redirect : false};
        this.selectedArtist = null;
        this.selectedArtistAlbums = null;
    }

    selectArtist(idArtist, e) {
        new SpotifyWebApi().getArtist(idArtist)
        .then(response => {
            this.processResultsArtist(response);
            new SpotifyWebApi().getArtistAlbums(idArtist)
            .then(response => {
                this.processResultsAlbums(response.items);
            });
        });
    }

    processResultsArtist(dataArtist) {
        this.selectedArtist = {
            name :   dataArtist.name,
            genres : dataArtist.genres.slice(0, 3),
            cover :  (dataArtist.images.length)
                ? dataArtist.images[2].url
                : null
        }
    }

    processResultsAlbums(dataAlbums) {
        this.selectedArtistAlbums = dataAlbums.map(album => {
            return {
                id : album.id,
                name : album.name,
                releaseDate : album.release_date,
                cover : (album.images.length)
                    ? album.images[1].url
                    : null
            }
        });

        this.setState({
            redirect: true
        })
    }

    render() {
        let searchFor = (!!this.props.location.state)
            ? this.props.location.state.searchFor
            : 'Not yet defined',
        artistsList = (!!this.props.location.state)
            ? this.props.location.state.artistsList
            : [],
        navList = [
            {name: 'Home'},
            {name: 'Artists', actual: true}
        ];

        if(this.state.redirect) {
            return <Redirect
                to={{
                    pathname: '/albums',
                    state: { selectedArtist: this.selectedArtist, albums : this.selectedArtistAlbums}
                }}
            />;
        }
        return (
            <div className="page-container">
                <div className="page-content">
                    <Header positionTo='center'></Header>
                    <h1>Artists</h1>
                    <h3>You are currently searching: &ensp;
                        <span style={{color: '#ff5a5fcc', fontSize: '18px'}}>{searchFor.toUpperCase()}</span>
                    </h3>
                    <SearchBar defaultText="Search for your favorite artist here"/>
                    <Breadcrumb list={navList}></Breadcrumb>
                    <div className="artists-container">
                        {artistsList.map(artist => {
                            artist.cover = !!artist.cover
                                ? <img className="artist-cover" src={artist.cover} alt=""/>
                                : <MusicalNote size={230}></MusicalNote>;
                            return (
                                <div className="artist-container" key={artist.id} onClick={this.selectArtist.bind(this, artist.id)}>
                                    {artist.cover}
                                    <p>{artist.name}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
export default Artists;
