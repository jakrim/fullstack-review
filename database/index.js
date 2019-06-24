const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  owner: String,
  description: String,
  bio: String,
  fork: Number,
  html_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = data => {
  let repo = new Repo({
    owner: String,
    description: String,
    fork: Number,
    html_url: String
  });
  repo.save();
};

module.exports.save = save;
