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
    handleUpdateComment
}) => {
    return (
        <div className="mt-4 space-y-4 ml-12">
            {replies.map(reply => {
                const createdAtSeed = new Date(reply.createdAt).getTime();
                const randomNumber = getSeededRandomNumber(createdAtSeed);
                const replyReactionWithRandom = commentReactions[reply.id] + randomNumber;

                return (
                    <Comment
                        key={reply.id}
                        comment={reply}
                        commentReactions={replyReactionWithRandom} // this is a number
                        handleCommentReaction={handleCommentReaction}
                        handleToggleOptions={handleToggleOptions}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        activeComment={activeComment}
                        activeCommentIsUser={activeCommentIsUser}
                        handleUpdateComment={handleUpdateComment}
                    />
                );
            })}
        </div>
    );
};

export default CommentReplies;
