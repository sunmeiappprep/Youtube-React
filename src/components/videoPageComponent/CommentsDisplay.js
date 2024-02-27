import React, { useState, useEffect } from 'react';

const CommentsDisplay = ({comments}) => {


  return (
    <div className="space-y-4 mt-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex-shrink-0">
              <span className="block bg-gray-200 rounded-full w-10 h-10"></span> {/* Placeholder for user avatar */}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{comment.user.username}</p>
              <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="text-gray-700">
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsDisplay;
