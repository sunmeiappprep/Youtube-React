import React from 'react';
import Comment from './Comment';
const CommentReplies = ({ replies,commentReactions,
    handleCommentReaction,
    handleToggleOptions,
    handleEdit,
    handleDelete,
    activeComment,
    activeCommentIsUser,
}) => {
    console.log(replies)
    return (
        <div className="mt-4 space-y-4 ml-6">
            {replies.map(reply => (
                <Comment
                    key={reply.id}
                    comment={reply}
                    commentReactions={commentReactions}
                    handleCommentReaction={handleCommentReaction}
                    handleToggleOptions={handleToggleOptions}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    activeComment={activeComment}
                    activeCommentIsUser={activeCommentIsUser}
                />
            ))}
        </div>
    );
};

export default CommentReplies;