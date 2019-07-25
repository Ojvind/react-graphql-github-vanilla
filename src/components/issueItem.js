import React from 'react';
import ReactionList from './reactionList';

export default ({issue}) => {
  return (
    <li key={issue.node.id}>
      <a href={issue.node.url}>{issue.node.title}</a>
      <ReactionList reactions={issue.node.reactions}/>
    </li>
  )
}  