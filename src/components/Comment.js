import React from 'react';

const Comment = ({ item }) => {
  const { id, email, body } = item;
  return (
    <div>
      <h5>Id: {id}</h5>
      <h6>{email}</h6>
      <p>{body}</p>
    </div>
  );
};

export default Comment;