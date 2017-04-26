var express = require('express');
var request = require('request');
var cookieParser = require('cookie-parser');
const { CLIENT_ID, CLIENT_SECRET } = require('./keys');
const REDIRECT_URI = "http://localhost:3000/instagram/callback";

var app = express();
app.use(cookieParser());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/instagram/auth', function (req, res) {
  const url = `https://api.instagram.com/oauth/authorize/?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  res.redirect(url);
});

app.get('/instagram/callback', function (req, res) {
  const formData = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
    code: req.query.code
  };
  const url = 'https://api.instagram.com/oauth/access_token/';
  request.post({ url, formData }, function (err, resp, body) {
    if (err) return res.send(500, err);

    res.send(body);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
