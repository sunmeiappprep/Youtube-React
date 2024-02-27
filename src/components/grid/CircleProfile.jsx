import React from 'react';
import Avatar from 'react-avatar';

function CircleProfile({ name }) {
  return (
    <Avatar name={name} round={true} size="50" />
  );
}

export default CircleProfile;
