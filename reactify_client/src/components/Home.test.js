import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

describe('Testing home component', function() {
    let component;

    beforeEach(function() {
        const div = document.createElement('div');
        component = ReactDOM.render(<Home />, div);
    });

    it('Should execute showAlbum and return List Component ', () => {
        //Given
        component.setState({
            album: {
                albumTitle: 'MockTitle',
                tracks: []
            }
        });
        //When
        let result = component.showAlbum();

        //Then
        expect(result.props.itemsAlbum).toBe(component.state.album);
    });

    it('Should execute showAlbum and return empty data ', () => {
        //Given

        //When
        let result = component.showAlbum();

        //Then
        expect(result.props.children).toBe('No hay Albums');
    });
});
