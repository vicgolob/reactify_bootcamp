import React, { Component } from 'react';

import PlayController from './PlayController';

import './../css/Favorite.css';

class Favorite extends Component {

    render() {
        let favorites = [];
        if (!!sessionStorage.getItem('favorites')) {
            favorites = Object.values(
                JSON.parse(
                    sessionStorage.getItem('favorites')
                )
            );
        }

        return (
            <React.Fragment>
                <h3>Favorite songs</h3>
                <table>
                    <tbody>
                        {favorites.map(song => {
                            return (
                                <tr key={song.id}>
                                    <td>
                                        <img src={song.cover} alt="" />
                                    </td>
                                    <td>
                                        <p><b>{song.name}</b></p>
                                        <p>Artist: {song.artist}</p>
                                        <p>Album: {song.title}</p>
                                        <PlayController
                                            options={{
                                                id: song.id,
                                                preview: song.preview,
                                                size: 20
                                            }}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}
export default Favorite;
