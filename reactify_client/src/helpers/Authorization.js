/**
* Get an album tracks and info given its Spotify ID
*/
function getToken() {
    return fetch('http://localhost:8888/').then(response => {
        return response.text();
    }).catch(e => {alert(`${e} - Server is not running`)});
};

const Authorization = {
    getToken : getToken
}
export default Authorization;
