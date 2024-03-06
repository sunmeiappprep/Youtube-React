import React from 'react';
import { faker } from '@faker-js/faker';

function FakeComments() {
  const generateFakeComments = () => {
    let comments = [];
    for (let i = 0; i < 10; i++) {
      comments.push({
        id: i,
        username: faker.image.avatar(),
        comment: faker.lorem.sentences(),
        
      });
    }
    return comments;
  };

  const fakeComments = generateFakeComments();

  return (
    <div>
      <h2>Fake Comments</h2>
      {fakeComments.map(comment => (
        <div key={comment.id}>
          <img src={comment.username}></img>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default FakeComments;
