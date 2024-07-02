import React, { useState } from 'react';
import { createComment } from '../../utils/commentUtils';
import { useGlobalState } from '../../StateContext';
import { loginUser } from '../../utils/authUtils';
import { useNavigate } from 'react-router-dom';
const CommentInput = ({videoId,handleUpdateComment}) => {
  const [isActive, setIsActive] = useState(false);
  const [comment, setComment] = useState('');
  const { user, token, setUser, setToken } = useGlobalState(); 
  const navigate = useNavigate()

  const handleCancel = () => {
    setComment('');
    setIsActive(false);
  };

  const handlePostComment = () => {
    const commentInfo = {
        videoId:videoId,
        text:comment
    }
    console.log(commentInfo)
    createComment(commentInfo).then(() => handleUpdateComment())
    setComment('');
    setIsActive(false);
  }

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <div className="flex flex-col space-y-2">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onFocus={() => setIsActive(true)}
        placeholder="Write a comment..."
        className="text-white bg-custom-dark p-2 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all"
      />
      {isActive ? (
        user ? (
          <div className="flex space-x-2">
            <button
              onClick={() => handlePostComment()}
              className={`px-4 py-2 bg-custom-gray text-white rounded-full transition-colors ${comment ? 'hover:bg-blue-600' : ''}`}
              disabled={!comment}
            >
              Comment
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-white rounded-full bg-custom-gray hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} className="px-4 py-1 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded">
            Login
          </button>
        )
      ) : null}
    </div>
  );
};

export default CommentInput;