
class Authorization {
    getToken() {
        return fetch('http://localhost:8888/').then(response => {
            return response.json();
        }).catch(e => {alert(`${e} - Server is not running`)});
    }
}

export default Authorization;
