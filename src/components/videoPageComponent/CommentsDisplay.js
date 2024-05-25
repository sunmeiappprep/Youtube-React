import React, { useEffect, useState } from 'react';
import { commentAddLiked, deleteComment, getCommentsReaction, updateComment } from '../../utils/commentUtils';
import { useGlobalState } from '../../StateContext';
import Comment from './Comment'; // Import Comment component
import CommentReplies from './CommentReplies';

const CommentsDisplay = ({ comments, handleUpdateComment }) => {
    const [activeComment, setActiveComment] = useState(null);
    const [activeCommentIsUser, setActiveCommentIsUser] = useState(false);
    const [commentReactions, setCommentReactions] = useState({});
    const [replies, setReplies] = useState({});
    const { user } = useGlobalState(); // Access the context methods

    const handleToggleOptions = (comment) => {
        if (activeComment === comment.id) {
            setActiveComment(null);
        } else {
            setActiveComment(comment.id);
        }

        setActiveCommentIsUser(comment.user.id === user);
    };

    useEffect(() => {
        const fetchReactions = async (comment) => {
            const newCommentReactions = {};

            const fetchReactionsRecursive = async (comment) => {
                try {
                    const response = await getCommentsReaction(comment.id);
                    newCommentReactions[comment.id] = response;
                } catch (error) {
                    console.log("Error fetching reactions for comment:", comment.id, error);
                    newCommentReactions[comment.id] = null;
                }

                if (comment.replies && comment.replies.length > 0) {
                    for (const reply of comment.replies) {
                        await fetchReactionsRecursive(reply);
                    }
                }
            };

            await fetchReactionsRecursive(comment);
            return newCommentReactions;
        };

        const fetchCommentReactions = async () => {
            const combinedReactions = {};

            for (const comment of comments) {
                const newCommentReactions = await fetchReactions(comment);
                Object.assign(combinedReactions, newCommentReactions);
            }

            setCommentReactions(prevReactions => ({ ...prevReactions, ...combinedReactions }));
        };

        if (comments.length > 0) {
            fetchCommentReactions();
        }
    }, [comments, getCommentsReaction, setCommentReactions]);
    const handleEdit = () => {
        const newComment = {
            text: "testing"
        };
        updateComment(activeComment, newComment).then(() => handleUpdateComment());
    };

    const handleDelete = () => {
        deleteComment(activeComment).then(() => handleUpdateComment());
    };

    const handleCommentReaction = async (commentId, bool) => {
        let commentLikedInfo = {
            userId: user,
            commentId: commentId,
            liked: bool,
        };

        try {
            await commentAddLiked(commentLikedInfo); // Make sure this is finished
            const response = await getCommentsReaction(commentId);
            setCommentReactions(prevReactions => ({
                ...prevReactions,
                [commentId]: response
            }));
        } catch (error) {
            console.error('Failed to fetch comment reactions:', error);
        }
    };
    
    useEffect(() => {
        const allReplies = {};

        const collectReplies = (comment) => {
            const replies = [];
            if (comment.replies && comment.replies.length > 0) {
                comment.replies.forEach(reply => {
                    replies.push(reply);
                    replies.push(...collectReplies(reply));
                });
            }
            return replies;
        };

        comments.forEach(comment => {
            allReplies[comment.id] = collectReplies(comment);
        });
        console.log(allReplies)
        setReplies(allReplies)
    }, [comments]);

    

    return (
        <div className="space-y-4 mt-6">
            {comments.map((comment) => (
                <div key={comment.id}>
                    <Comment
                        comment={comment}
                        commentReactions={commentReactions}
                        handleCommentReaction={handleCommentReaction}
                        handleToggleOptions={handleToggleOptions}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        activeComment={activeComment}
                        activeCommentIsUser={activeCommentIsUser}
                        isReply={false} // Ensure top-level comments are not considered replies
                    />
                    {replies[comment.id] && <CommentReplies replies={replies[comment.id]}
                     commentReactions={commentReactions}
                     handleCommentReaction={handleCommentReaction}
                     handleToggleOptions={handleToggleOptions}
                     handleEdit={handleEdit}
                     handleDelete={handleDelete}
                     activeComment={activeComment}
                     activeCommentIsUser={activeCommentIsUser}
                     />}
                </div>
            ))}
        </div>
    );
};

export default CommentsDisplay;
