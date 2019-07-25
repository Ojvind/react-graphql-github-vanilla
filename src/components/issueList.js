import React from 'react';
import IssueItem from './issueItem';

export default ({ issueList, onFetchMoreIssues }) => {
  return (
    <div>
      <ul>
        {issueList.edges.map(issue => (
          <IssueItem issue={issue}/>          
        ))}
      </ul>

      <hr />

      {
        issueList.pageInfo.hasNextPage && (
          <button onClick={onFetchMoreIssues}>More</button>
        )
      }
    </div>
  );
}
