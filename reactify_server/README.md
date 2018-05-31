# Reactify Server

Server application that gets the access token to start using React API with client credentials authentication flow.

### Installation

Reactify Server requires [Node.js] to run.

Install the dependencies and start the server.

```sh
$ cd reactify-server
$ npm install
$ node app.js
```

* Last step will create a Node process to get Spotify's access token. Go to http://localhost:8888/ and if OK, you'll get redirected to http://localhost:3000/.
* Important note: set the following environment vars in your system: **reactify_client_id** & **reactify_client_secret**.
