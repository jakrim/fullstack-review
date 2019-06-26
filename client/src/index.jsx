import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
    this.search = this.search.bind(this);
    this.getRepos = this.getRepos.bind(this);
  }

  componentDidMount() {
    this.getRepos();
  }

  search(term) {
    console.log(`${term} was searched`);

    axios
      .post('/repos', { username: term })
      .then(() => {
        return this.getRepos();
      })
      .catch(err => {
        console.log(err);
      });
  }

  getRepos() {
    return axios.get('/repos').then(({ data }) => {
      this.setState({
        repos: data
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <Search onSearch={this.search.bind(this)} />
        <RepoList repos={this.state.repos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
