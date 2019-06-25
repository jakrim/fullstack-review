const mongoose = require('mongoose');
// mongoose.promise = require('bluebird');
// if (process.env.MONGO_URL) -> mongoose.connect(process.env.MONGO_URL)
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  github_name: String,
  repo_name: String,
  description: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = repos => {
  // const repoNames = {};

  // array of github objects
  // loop through each item
  // populate an object

  for (var i = 0; i < repos.length; i++) {
    var reposObj = {};

    obj.github_name = repos[i].owner.login;
    obj.repo_name = repos[i].name;
    obj.description = repos[i].description;
    obj.forks = repo[i].forks;
  }
  // repos.forEach(repo => {
  //   repoNames.push(repo.owner.login, repo.name, repo.description, repo.forks);
  // });

  // Repo.create({ repos });

  let repo = new Repo(reposObj);
};

let find = callback => {
  Repo.find({}, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(data);
    }
  });
};

module.exports.save = save;
module.exports.find = find;
