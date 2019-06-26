const mongoose = require('mongoose');
// mongoose.promise = require('bluebird');
// if (process.env.MONGO_URL) -> mongoose.connect(process.env.MONGO_URL)
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  owner: String,
  url: { type: String, unique: true },
  name: String,
  stars: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = repos => {
  return Promise.all(
    repos.map(repo => {
      return Repo.findOneAndUpdate(
        { url: repo.html_url },
        {
          owner: repo.owner.login,
          url: repo.html_url,
          name: repo.name,
          stars: repo.stargazers_count
        },
        { upsert: true }
      );
    })
  );
};

let find = () => {
  return Repo.find()
    .sort({ stars: -1 })
    .limit(25)
    .exec();
};

module.exports.save = save;
module.exports.find = find;
