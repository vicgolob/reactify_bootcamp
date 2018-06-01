
class Authorization {
    constructor() {
        return fetch('http://localhost:8888/').then(response => {
            return response.text();
        }).catch(e => {alert(`${e} - Server is not running`)});
    }
}

export default Authorization;
