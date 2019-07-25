import React from 'react';
import ReactionItem from './reactionItem';

export default ({ reactions }) => {
  return (
    <ul>
      {reactions.edges.map(reaction => (
        <ReactionItem reaction={reaction}/>  
      ))}
    </ul>
  )
}