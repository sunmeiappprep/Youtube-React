import React, { useEffect, useState } from 'react';
import { commentAddLiked, deleteComment, getCommentsReaction, getVideoCommentsReactions, updateComment } from '../../utils/commentUtils';
import { useGlobalState } from '../../StateContext';
import Comment from './Comment'; // Import Comment component
import CommentReplies from './CommentReplies';
import { getSeededRandomNumber } from '../../utils/numberUtils';

const CommentsDisplay = ({ comments, handleUpdateComment,commentsReactionsObject,handleCommentReaction }) => {
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
    
    

    // useEffect(() => {
    //     const fetchReactions = async (comment) => {
    //         const newCommentReactions = {};

    //         const fetchReactionsRecursive = async (comment) => {
    //             try {
    //                 const response = await getCommentsReaction(comment.id);
    //                 newCommentReactions[comment.id] = response;
    //             } catch (error) {
    //                 console.log("Error fetching reactions for comment:", comment.id, error);
    //                 newCommentReactions[comment.id] = null;
    //             }

    //             if (comment.replies && comment.replies.length > 0) {
    //                 for (const reply of comment.replies) {
    //                     await fetchReactionsRecursive(reply);
    //                 }
    //             }
    //         };

    //         await fetchReactionsRecursive(comment);
    //         return newCommentReactions;
    //     };

    //     const fetchCommentReactions = async () => {
    //         const combinedReactions = {};

    //         for (const comment of comments) {
    //             const newCommentReactions = await fetchReactions(comment);
    //             Object.assign(combinedReactions, newCommentReactions);
    //         }

    //         setCommentReactions(prevReactions => ({ ...prevReactions, ...combinedReactions }));
    //     };

    //     if (comments.length > 0) {
    //         fetchCommentReactions();
    //     }
    // }, [comments, getCommentsReaction, setCommentReactions]);
    const handleEdit = () => {
        const newComment = {
            text: "testing"
        };
        updateComment(activeComment, newComment).then(() => handleUUpdateComment());
    };

    const handleDelete = () => {
        deleteComment(activeComment).then(() => handleUpdateComment());
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
          {comments.map((comment) => {
            const createdAtSeed = new Date(comment.createdAt).getTime();
            const randomNumber = getSeededRandomNumber(createdAtSeed);
            const commentReactionWithRandom = commentsReactionsObject[comment.id] + randomNumber;
      
            return (
              <div key={comment.id}>
                <Comment
                  handleUpdateComment={handleUpdateComment}
                  comment={comment}
                  commentReactions={commentReactionWithRandom}
                  handleCommentReaction={handleCommentReaction}
                  handleToggleOptions={handleToggleOptions}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  activeComment={activeComment}
                  activeCommentIsUser={activeCommentIsUser}
                />
                {replies[comment.id] && (
                  <CommentReplies
                    replies={replies[comment.id]}
                    handleUpdateComment={handleUpdateComment}
                    commentReactions={commentsReactionsObject}
                    handleCommentReaction={handleCommentReaction}
                    handleToggleOptions={handleToggleOptions}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    activeComment={activeComment}
                    activeCommentIsUser={activeCommentIsUser}
                  />
                )}
              </div>
            );
          })}
        </div>
      );
};

export default CommentsDisplay;
