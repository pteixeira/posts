var express = require('express');
var request = require('request');
var app = express();
var port = process.env.PORT || 3000;

// This needs to go somewhere else! TODO!
const CLIENT_ID = 'NDW1PPHUaOmLGA';
const CLIENT_SECRET = '6I8uqO06LvDKsCtScyV_Jqb_oL4';
const REDIRECT_URI = 'http://localhost:3000/reddit';
const TOKEN_LINK = 'https://www.reddit.com/api/v1/access_token';
// const TEST_LINK = 'https://oauth.reddit.com/api/v1/me';
const TEST_LINK = 'https://oauth.reddit.com/user/sardinhas/saved';
const USER_AGENT = `web:${CLIENT_ID}:0.1 (by /u/sardinhas)`;

function generateState() {
  // generates a random string of 6 characters so that the requests are unique. WE MUST ASSOCIATE THIS WITH SOMETHING!
  return (Math.random() + 1).toString(36).substr(2,6);
};

var state = '';
var code = '';
var token = '';

app.get('/', function(req, res) {
  // need to save the state so we know we are responding to the right request. unsure about how to go about this though
  // maybe set in sessionStorage? Associate with something? Because we can't keep asking for a fucking token everytime we
  // want to use the goddamn app. Also we may need to refresh the fucking token.
  state = generateState();
  var link = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}` +
    `&response_type=code&state=${state}&redirect_uri=${REDIRECT_URI}&duration=temporary&scope=identity,history`;

  res.statusCode = 302;
  res.setHeader("Location", link);
  res.end();

});

app.get('/reddit', function(req, response) {
  // need to check the url for the querystring and get the token and whatever
  if (req.query.state === state) {
    code = req.query.code;

    // going dangerously into callback hell!
    request({
      url: TOKEN_LINK,
      method: 'POST',
      auth: {
        user: CLIENT_ID,
        pass: CLIENT_SECRET
      },
      headers: {
        'User-Agent': USER_AGENT
      },
      json: true,
      form: {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI
      }
    }, function(err, res) {
      token = res.body.access_token;
      request({
        url: TEST_LINK,
        method: 'GET',
        json: true,
        headers: {
          'User-Agent': USER_AGENT,
          'Authorization': `bearer ${token}`
        },
      }, function(err, res) {
        console.log(res.body)
        response.send(res.body);
        response.end();
      });
    });

  } else {
    console.log("Authentication Failed")
  }

});

app.listen(port);
