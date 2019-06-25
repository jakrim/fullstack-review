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

let save = (body, callback) => {
  const repos = JSON.parse(body);
  for (var i = 0; i < repos.length; i++) {
    let reposObj = {};
    reposObj.github_name = repos[i].owner.login;
    reposObj.repo_name = repos[i].name;
    reposObj.description = repos[i].description;
    reposObj.forks = repos[i].forks;

    let repo = new Repo(reposObj);

    // console.log('+THIS IS REPOO', repo);

    repo.save((err, repo) => {
      if (err) {
        callback(err);
      } else {
        console.log('repo saved');
      }
    });
  }
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
