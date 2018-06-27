import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import SpotifyWebApi from './../helpers/SpotifyWebApi';

import '../css/Searchbar.css';
import FaSearch from 'react-icons/lib/fa/search';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {redirect : false};
        this.list = [];
        this.searchFor = '';
    }
    getInput(e) {
        if (e.charCode === 13) {
            // Perform Artists search and then redirect to Artists Component
            let searchCriteria = e.target.value;
            new SpotifyWebApi().searchArtists(searchCriteria)
            .then(response => {
                this.processResults(response.artists, searchCriteria);
            });
        }
    };

    processResults(results, searchCriteria) {
        this.searchFor = searchCriteria;
        this.list = results.items.map(result => {
            return {
                id : result.id,
                name : result.name,
                cover : (result.images.length)
                    ? result.images[1].url
                    : null
            };
        });

        this.setState({
            redirect: true
        })
    }

    render() {
        let placeholder = (this.props.defaultText === undefined)
            ? 'Type the name of your favourite artist'
            : this.props.defaultText;
        if(this.state.redirect) {
            return <Redirect
                to={{
                    pathname: '/artists',
                    state: { artistsList: this.list, searchFor: this.searchFor}
                }}
            />;
        }
        return (
            <div className={`searchbar ${this.props.inHeader ? 'in-header' : ''}`}>
                <FaSearch />
                <input type="text"
                    placeholder={placeholder}
                    maxLength="30"
                    size={this.props.inHeader ? '30' : '110'}
                    onKeyPress={this.getInput.bind(this)}>
                </input>
            </div>
        )
    }
}
export default SearchBar;
