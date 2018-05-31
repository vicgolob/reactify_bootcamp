import ErrorHandler from './ErrorHandler'

var _baseUri = 'https://api.spotify.com/v1',
    _accessToken = null;

function initApi(token) {
    _accessToken = token;
    return true;
};

function _performRequest(requestData) {
    let headers = new Headers({
        'Authorization' : `Bearer ${_accessToken}`
    }),
        init = {
            method : requestData.method || 'GET',
            headers : headers
        };
    return fetch(requestData.url, init)
        .then(response => {
            if(response.ok) {
                return response.json().then(data => {
                    return data;
                });
            } else {
                return new Error('Response was not OK');
            }
        }).catch(error => {
            return new Error(
                `There's problem with your fetch operation:
                ${error.status} - ${error.statusText}`
            );
        });
};

/**
* Get an album tracks and info given its Spotify ID
*/
function getAlbum(albumId) {
    var requestData = {
        url: `${_baseUri}/albums/${albumId}`
    };
    return _performRequest(requestData);
};

const SpotifyWebApi = {
    initApi : initApi,
    getAlbum : getAlbum
}
export default SpotifyWebApi;
