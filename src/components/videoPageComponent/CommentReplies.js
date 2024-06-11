import React from 'react';
import Comment from './Comment';
import { getSeededRandomNumber } from '../../utils/numberUtils';


const CommentReplies = ({ replies, commentReactions,
    handleCommentReaction,
    handleToggleOptions,
    handleEdit,
    handleDelete,
    activeComment,
    activeCommentIsUser,
    handleUpdateComment,
    activeCommentId, // Accept activeCommentId
    setActiveCommentId // Accept setActiveCommentId
}) => {
    return (
        <div className="mt-4 space-y-4 ml-12">
            {replies.map(reply => {
                const createdAtSeed = new Date(reply.createdAt).getTime();
                const randomNumber = getSeededRandomNumber(createdAtSeed);
                const replyReactionWithRandom = commentReactions[reply.id] + randomNumber;
                const makeSureNotNegative = Math.max(replyReactionWithRandom,0)
                return (
                    <Comment
                        key={reply.id}
                        comment={reply}
                        commentReactions={makeSureNotNegative} // this is a number
                        handleCommentReaction={handleCommentReaction}
                        handleUpdateComment={handleUpdateComment}
                        activeCommentId={activeCommentId} 
                        setActiveCommentId={setActiveCommentId}
                        handleDelete={handleDelete}
                    />
                );
            })}
        </div>
    );
};

export default CommentReplies;
