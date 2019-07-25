import React from 'react';
import IssueList from './issueList';

export default ({ repository, onFetchMoreIssues,onStarRepository }) => {
  return (
    <div>
      <p>
        <strong>In Repository:</strong>
        <a href={repository.url}>{repository.name}</a>
      </p>

      <button
        type="button"
        onClick={() =>
          onStarRepository(repository.id, repository.viewerHasStarred)
        }
      >
        {repository.stargazers.totalCount}
        {repository.viewerHasStarred ? ' Unstar' : ' Star'}
      </button>

      <IssueList
        onFetchMoreIssues={onFetchMoreIssues}
        issueList={repository.issues}
      />

    </div>
  );
}



