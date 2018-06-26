import React, { Component } from 'react';

import Authorization from './../helpers/Authorization';
import SpotifyWebApi from './../helpers/SpotifyWebApi';

import Header from './Header';
import SearchBar from './SearchBar';
import Favorite from './Favorite';

import '../index.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token : null,
            album : null
        };
        let spotifyApi = null;
    }

    componentDidMount() {
        // get the token and show the new album
        new Authorization().then(token => {
            // init SpotifyWebApi
            this.spotifyApi = new SpotifyWebApi(token);
        });
    }

    render() {
        return (
            <div className="page-container">
                <div className="page-content">
                    <Header positionTo='center' />
                    <h3>Welcome to</h3>
                    <h1>Reactify</h1>
                    <p>Search your favourite songs over Spotify, just enter an artist's name in the following search box and enjoy!</p>
                    <SearchBar />
                    <Favorite />
                </div>
            </div>
        );
    }
}

export default Home;
