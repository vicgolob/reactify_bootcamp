/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');

var app = express();
var client_id = process.env.reactify_client_id;// Your client id
var client_secret = process.env.reactify_client_secret;// Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

app.get('/', function(req, res) {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var access_token = body.access_token;
      console.log('\nHere\'s your access token:: ' + access_token + '\n');
      // we pass the token to the browser to make requests from there
      res.redirect('http://localhost:3000/?' +
        querystring.stringify({
          access_token: access_token
        }));
      } else {
      res.redirect('http://localhost:3000/?' +
        querystring.stringify({
          error: 'invalid_token'
        }));
      }
  });
});

console.log('Listening on 8888');
app.listen(8888);

console.log('\n!! Check your system environment variables');
console.log('\nMake sure you have set \'reactify_client_id\' and \'reactify_client_secret\'');
if(client_id == undefined || client_secret == undefined) {
    console.log('>> Oops your credentials are not properly set');
} else {
    console.log('>> You\'re set to go. Type into your browser \'http://localhost:8888\'');
}