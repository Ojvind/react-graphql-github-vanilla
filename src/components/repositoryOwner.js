import React from 'react';
import Repository from './repository';

export default ({ repositoryOwner, errors, onFetchMoreIssues, onStarRepository }) => {
  if (errors) {
    return (
      <p>
        <strong>Something went wrong:</strong>
        {errors.map(error => error.message).join(' ')}
      </p>
    );
  }

  return (
    <div>
      <p>
        <strong>Issues from repositoryOwner:</strong>
        <a href={repositoryOwner.url}>{repositoryOwner.name}</a>
      </p>
      <Repository
        repository={repositoryOwner.repository}
        onFetchMoreIssues={onFetchMoreIssues}
        onStarRepository={onStarRepository}
      />
    </div>
  );
};