import React, { useEffect, useState,useRef  } from 'react';
import { commentAddLiked, deleteComment, getCommentsReaction, getComments, getVideoCommentsReactions, updateComment } from '../../utils/commentUtils';
import { useGlobalState } from '../../StateContext';
import Comment from './Comment'; // Import Comment component
import CommentReplies from './CommentReplies';
import { getSeededRandomNumber } from '../../utils/numberUtils';
import CommentInput from '../videoPageComponent/CommentInput';;

const CommentsDisplay = ({ videoId, }) => {
  const { user } = useGlobalState();
  const [comments, setComments] = useState([]);
  const [commentsReactionsObject, setCommentReactionsObject] = useState({});
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [replies, setReplies] = useState({});
  const containerRef = useRef(null);

  const fetchComments = async () => {
    try {
      const commentsData = await getComments(videoId);
      commentsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchCommentsReactions = async () => {
    try {
      const commentsReactionsArray = await getVideoCommentsReactions(videoId);
      const reactionsObject = commentsReactionsArray.reduce((acc, reaction) => {
        acc[reaction.commentId] = reaction.diff;
        return acc;
      }, {});
      setCommentReactionsObject(reactionsObject);
    } catch (error) {
      console.error('Error fetching comments reactions:', error);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchCommentsReactions();
  }, [videoId]);

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
    setReplies(allReplies);
  }, [comments]);

  const handleToggleOptions = (commentId) => {
    setActiveCommentId((prevId) => (prevId === commentId ? null : commentId));
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setActiveCommentId(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCommentReaction = async (commentId, bool) => {
    const commentLikedInfo = {
      userId: user,
      commentId,
      liked: bool,
    };

    try {
      await commentAddLiked(commentLikedInfo);
      const commentsReactionsArray = await getVideoCommentsReactions(videoId);
      const reactionsObject = commentsReactionsArray.reduce((acc, reaction) => {
        acc[reaction.commentId] = reaction.diff;
        return acc;
      }, {});
      setCommentReactionsObject(reactionsObject);
    } catch (error) {
      console.error('Failed to update comment reaction:', error);
    }
  };

const handleUpdateComment = async (commentId, newText) => {
    try {
        await updateComment(commentId, { text: newText });
        await fetchComments();
        await fetchCommentsReactions();
    } catch (error) {
        console.error('Failed to update comment:', error);
    }
};

  const handleEdit = async (commentId, newText) => {
    try {
      const newComment = { text: newText };
      await updateComment(commentId, newComment);
      handleUpdateComment();
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      handleUpdateComment();
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  if (commentsReactionsObject === undefined) {
    return <div>Loading...</div>;
  }

  console.log(commentsReactionsObject)
  return (
    <div ref={containerRef}>
      <CommentInput videoId={videoId} handleUpdateComment={handleUpdateComment} />
      <p className='text-xl'>{Object.keys(commentsReactionsObject).length} Comments</p>
      <div className="space-y-4 mt-6">
        {comments.map((comment) => {
          const createdAtSeed = new Date(comment.createdAt).getTime();
          const randomNumber = getSeededRandomNumber(createdAtSeed);
          const reactionValue = commentsReactionsObject[comment.id] || 0;//Not sure why there is NaN on first render
          const commentReactionWithRandom = isNaN(reactionValue + randomNumber) ? 0 : reactionValue + randomNumber;//Not sure why there is NaN on first render
          const makeSureNotNegative = Math.max(commentReactionWithRandom, 0);
          return (
            <div key={comment.id}>
              <Comment
                handleUpdateComment={handleUpdateComment}
                comment={comment}
                commentReactions={makeSureNotNegative}
                handleCommentReaction={handleCommentReaction}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                isOpen={activeCommentId === comment.id}
                onToggleOptions={() => handleToggleOptions(comment.id)}
                activeCommentId={activeCommentId} 
                setActiveCommentId={setActiveCommentId}
                
              />
              {replies[comment.id] && (
                <CommentReplies
                  replies={replies[comment.id]}
                  handleUpdateComment={handleUpdateComment}
                  commentReactions={commentsReactionsObject}
                  handleCommentReaction={handleCommentReaction}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  activeCommentId={activeCommentId} 
                  setActiveCommentId={setActiveCommentId}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentsDisplay;
