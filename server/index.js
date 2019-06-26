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
  let { username } = req.body;
  if (!username) {
    res.sendStatus(400);
    return;
  }
  // get repos by id
  getReposByUsername(username, (err, repos) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      save(repos)
        .then(() => {
          res.sendStatus(201);
        })
        .catch(err => {
          res.sendStatus(500);
        });
    }
  });
  // save the github api data

  //res to the client
});

// TODO - your code here!
// This route should take the github username provided
// and get the repo information from the github API, then
// save the repo information in the database
// });

app.get('/repos', function(req, res) {
  // invoke find method to interact with database
  find()
    .then(repos => {
      res.send(repos);
    })
    .catch(err => {
      console.log(err);
    });
});
let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
