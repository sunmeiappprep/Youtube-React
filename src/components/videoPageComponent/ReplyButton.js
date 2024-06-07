import React, { useState } from 'react';
import { createComment } from '../../utils/commentUtils';

const ReplyButton = ({ commentUser,parentCommentId,handleUpdateComment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleCancel = () => {
    setIsReplying(false);
    setReplyText('');
  };

  const onSubmit = () => {
    let currentLocation = window.location.href;
    let parts = currentLocation.split('/');
    let lastPart = parts[parts.length - 1];
    console.log(lastPart);
    const commentInfo = {
      videoId:lastPart,
      text:replyText,
      parentId:parentCommentId

  }
    createComment(commentInfo).then(() => handleUpdateComment())
    handleCancel();

  };

  const handleOnClickReply = () =>{
    setIsReplying(true)
    setReplyText(`@${commentUser} `)
  }
  return (
    <div>
      <button onClick={handleOnClickReply}>Reply</button>
      {isReplying && (
        <div>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
          />
          <div>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={onSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplyButton;
