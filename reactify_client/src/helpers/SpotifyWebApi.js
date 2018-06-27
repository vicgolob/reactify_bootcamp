import Authorization from './Authorization';

let _baseUri = 'https://api.spotify.com/v1',
instance = null;

class SpotifyWebApi {
    _accessToken;
    constructor(token = null, expiration = null) {
        this.authorization = new Authorization();

        if (!instance) {
            this._accessToken = token;
            instance = this;

            setInterval(() => {
                this.authorization.getToken().then(accessObject => {
                    // refresh token
                    this._accessToken = accessObject.access_token;
                });
            }, expiration*1000);
        }
        return instance;
    }

    _performRequest(requestData) {
        let headers = new Headers({
            'Authorization' : `Bearer ${this._accessToken}`,
            'content-type' : 'application/json'
        }),
        init = {
            method  : requestData.method || 'GET',
            headers : headers,
            body    : requestData.body || null
        };
        requestData.url = (requestData.params !== undefined)
            ? `${requestData.url}/?${this._formatQueryParams(requestData.params)}`
            : requestData.url;

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

        _formatQueryParams(params) {
            return Object.keys(params).map(key => key + '=' + params[key]).join('&');
        }

        /**
        * Get an album tracks and info given its Spotify ID
        */
        getAlbum(albumId) {
            let requestData = {};
            requestData.url = `${_baseUri}/albums/${albumId}`;

            return this._performRequest(requestData);
        };

        /**
        * Returns 6 artists matching search criteria
        */
        searchArtists(searchCriteria) {
            let requestData = {};
            requestData.url = `${_baseUri}/search`;
            requestData.params = {
                q : searchCriteria,
                type : 'artist',
                limit : 6
            }

            return this._performRequest(requestData);
        };

        /**
        * Get information for artist id
        */
        getArtist(artistId) {
            let requestData = {};
            requestData.url = `${_baseUri}/artists/${artistId}`;

            return this._performRequest(requestData);
        };

        /**
        * Get albums for artist id - 20 albums at max
        * @See issue: spotify web-api duplicate albums
        * https://github.com/spotify/web-api/issues/587
        */
        getArtistAlbums(artistId) {
            let requestData = {};
            requestData.url = `${_baseUri}/artists/${artistId}/albums`;
            requestData.params = {
                limit : 20
            }

            return this._performRequest(requestData);
        };

    }

export default SpotifyWebApi;
