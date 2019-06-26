import React from 'react';
import RepoList from './RepoList.jsx';

var ReactEntry = ({ repo }) => (
  <div>
    {console.log({ repo })}
    <ul>
      <li>
        <a href={`${repo.url}`}>
          <div key={repo._id}>{repo.name}</div>
        </a>
      </li>
    </ul>
  </div>
);

export default ReactEntry;
