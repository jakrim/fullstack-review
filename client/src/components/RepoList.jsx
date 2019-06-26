import React from 'react';
import ReactEntry from './RepoEntry.jsx';

const RepoList = ({ repos }) => (
  <div>
    {/* {console.log('this is repos', repos)} */}
    <div>
      <h4> Repo List Component </h4>
      There are {repos.length} repos.
    </div>
    <div>
      {repos.map(repo => {
        return <ReactEntry repo={repo} />;
      })}
    </div>
  </div>
);

export default RepoList;
