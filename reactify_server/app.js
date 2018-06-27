/**
* This is an example of a basic node.js script that performs
* the Client Credentials oAuth2 flow to authenticate against
* the Spotify Accounts.
*
* For more information, read
* https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
*/
var express = require('express'); // Express web server framework
var app = express();
var request = require('request'); // "Request" library
var querystring = require('querystring');


var client_id = '88a2d1fcdae14802ab0ddb8253dca01c';//process.env.reactify_client_id;// Your client id
var client_secret = '76ce706a3e7e4e40aaebfd1c0afb0b18';//process.env.reactify_client_secret;// Your client secret

var cors = require('cors');
var corsOptions = {
    origin: '*',
    allowedHeaders : 'Origin, X-Requested-With, Content-Type, Accept',
    methods: 'GET'
}
// Middleware to apply before any request
app.use(cors(corsOptions));

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
            let expiration = body.expires_in,
                access_token = body.access_token;
            console.log('\nHere\'s your access token:: ' + access_token + '\n');
            // we pass the token to the browser to make requests from there
            res.send({access_token, expiration});
        } else {
            res.send('invalid_token');
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
    console.log('>> You\'re set to go. Now you can run Reactify Client');
}
