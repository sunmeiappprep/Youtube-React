import React, { useEffect, useState } from 'react';
import { commentAddLiked, deleteComment, getCommentsReaction, updateComment } from '../../utils/commentUtils';
import { useGlobalState } from '../../StateContext';
const CommentOptions = ({ handleEdit, handleDelete }) => (



    <div className="absolute right-10 bg-white shadow-lg rounded-md py-1">
        <button
            onClick={handleEdit}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
        >
            Edit
        </button>
        <button
            onClick={handleDelete}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
        >
            Delete
        </button>
    </div>
);


const CommentsDisplay = ({ comments,handleUpdateComment }) => {
    const [activeComment, setActiveComment] = useState(null);
    const [activeCommentIsUser, setActiveCommentIsUser] = useState(false);
    const [commentReactions, setCommentReactions] = useState({});
    const { user, token, setUser, setToken } = useGlobalState(); // Access the context methods
    const handleToggleOptions = (comment) => {
        if (activeComment === comment.id) {
            setActiveComment(null);
        } else {
            setActiveComment(comment.id);
        }

        if (comment.user.id == user) {
            setActiveCommentIsUser(true);
        } else {
            setActiveCommentIsUser(false);
        }
        
    };

    

    useEffect(() => {
        const fetchCommentReactions = async () => {
            const newCommentReactions = {};
    
            for (const comment of comments) {
                try {
                    const response = await getCommentsReaction(comment.id);
                    console.log(response);
                    newCommentReactions[comment.id] = response; 
                } catch (error) {
                    console.log("Error fetching reactions for comment:", comment.id, error);
                    newCommentReactions[comment.id] = null; 
                }
            }
    
            setCommentReactions(prevReactions => ({...prevReactions, ...newCommentReactions}));
        };
    
        if (comments.length > 0) {
            fetchCommentReactions();
        }
    }, [comments]); 



    // <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getCommentsReaction(38)}>getcomment38reaction</button>
    // <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => commentAddLiked(commentLikedInfo2)}>commentLikedInfofalse</button>
    // <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => commentAddLiked(commentLikedInfo)}>commentLikedInfo</button
    const handleEdit = () => {
        const newComment = {
            text:"testing"
        }
        updateComment(activeComment,newComment).then(() => handleUpdateComment())
    }
    const handleDelete = () => {
        deleteComment(activeComment).then(() => handleUpdateComment())
    }


    const handleCommentReaction = async (commentId, bool) => {
        console.log(commentId, bool); 
        let commentLikedInfo = {
            userId: user,
            commentId: commentId,
            liked: bool,
        };
    
        try {
            await commentAddLiked(commentLikedInfo);  // forgot to make sure this is finish
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
        console.log("Comment Reactions Updated", commentReactions);
        // Perform any action that depends on the updated state here
    }, [commentReactions]);
    
    
    return (
        <div className="space-y-4 mt-6">
            {comments.map((comment) => (
                <div key={comment.id} className="bg-black shadow rounded-lg p-16 relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 ">
                            <div className="flex-shrink-0">
                                <span className="block bg-gray-200 rounded-full w-10 h-10"></span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{comment.user.username}</p>
                                <p className="text-sm text-white">{new Date(comment.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                        <button onClick={() => handleToggleOptions(comment)} className="focus:outline-none">
                            <svg className="w-6 h-6 text-gray-600 hover:text-gray-800" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                    </div>
                    <div className="text-white flex items-centerr">
                        <p>{comment.text}</p>
                        <p>{commentReactions[comment.id]}</p>
                    </div>
                    <div>
                    <button onClick={() => handleCommentReaction(comment.id,true)}>Good</button>
                    <button onClick={() => handleCommentReaction(comment.id,false)}>Bad</button>
                    </div>
                     {/* problem here */}
                    {activeComment === comment.id ? (
                        activeCommentIsUser ? (
                          <CommentOptions handleEdit={handleEdit} handleDelete={handleDelete} />
                        ) : (
                          <button className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none">
                            No permission
                          </button>
                        )
                      ) : null}
                </div>
            ))}
        </div>
    );
};

export default CommentsDisplay;
