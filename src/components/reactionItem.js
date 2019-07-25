import React from 'react';

export default ({ reaction }) => {
  return (
    <li key={reaction.node.id}>{reaction.node.content}</li>
  );
};