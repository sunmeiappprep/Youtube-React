import React, { useState, useEffect, useRef } from 'react';
import { createComment } from '../../utils/commentUtils';

const ReplyButton = ({ commentUser, parentCommentId, handleUpdateComment, setIsReplying,circleColor,initial }) => {
  const [replyText, setReplyText] = useState(`@${commentUser} `);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  const handleCancel = () => {
    setIsReplying(false);
    setReplyText(``);
  };

  const onSubmit = () => {
    const currentLocation = window.location.href;
    const parts = currentLocation.split('/');
    const lastPart = parts[parts.length - 1];
    
    const commentInfo = {
      videoId: lastPart,
      text: replyText,
      parentId: parentCommentId
    };
    
    createComment(commentInfo).then(() => {
      handleUpdateComment();
      handleCancel();
    });
  };
  const isReplyTextNotEmpty = replyText.length > 0;

  return (
    <div>
      <div className="flex items-center space-x-2 mb-2">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: circleColor }}
        >
          <span className="text-white font-bold text-sm">{initial}</span>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="bg-black text-white placeholder-gray-500 p-2 w-full border-b border-gray-700 focus:border-b-2 focus:border-gray-500 outline-none"
        />
      </div>
      <div className="flex justify-end space-x-2">
      <button
        onClick={handleCancel}
        className="text-lg bg-transparent text-white font-bold px-6 py-2 rounded-full"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        disabled={!isReplyTextNotEmpty}
        className={`text-lg px-6 py-2 rounded-full ${
          isReplyTextNotEmpty
            ? 'bg-blue-500 text-black'
            : 'bg-gray-700 text-gray-400'
        }`}
      >
        Reply
      </button>
    </div>     
    </div>
  );
};

export default ReplyButton;
