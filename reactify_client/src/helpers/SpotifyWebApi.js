import Authorization from './../helpers/Authorization';
var _baseUri = 'https://api.spotify.com/v1';
class SpotifyWebApi {
    _accessToken;
    constructor(token) {
        this._accessToken = token
    }
    _performRequest(requestData) {
        let headers = new Headers({
            'Authorization' : `Bearer ${this._accessToken}`
        }),
        init = {
            method  : requestData.method || 'GET',
            headers : headers,
            body    : requestData.body || null
        };
        return fetch(requestData.url, init).then(response => {
            if(response.ok) {
                return response.json().then(data => {
                    return data;
                });
            } else {
                return new Error('Response was not OK');
            }}).catch(error => {
                return new Error(
                    `There's problem with your fetch operation:
                    ${error.status} - ${error.statusText}`
                );
            });
    };

    /**
    * Get an album tracks and info given its Spotify ID
    */
    getAlbum(albumId) {
        let requestData = {};
        requestData.url = `${_baseUri}/albums/${albumId}`;
        
        return this._performRequest(requestData);
    };

}
export default SpotifyWebApi;
