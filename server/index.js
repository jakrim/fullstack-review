const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const { getReposByUsername } = require('../helpers/github.js');
const { save, find } = require('../database/index.js');
const axios = require('axios');

let app = express();

app.use(morgan('dev'));
app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function(req, res) {
  // req -> // find the username from the req
  const username = req.body.username;
  getReposByUsername(username, (err, data) => {
    if (err) {
      console.log('THIS IS ERROR IN INDEX.JS', err);
    } else {
      save(data, (err, repo) => {
        if (err) {
          console.log(err);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

// TODO - your code here!
// This route should take the github username provided
// and get the repo information from the github API, then
// save the repo information in the database
// });

app.get('/repos', function(req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  find((err, data) => {
    if (err) res.send(err);
    else {
      res.send(data);
    }
  });
  // axios.get('/repos').then(res.send());
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
