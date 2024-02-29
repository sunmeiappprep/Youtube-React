import React, { useState } from 'react';
import { deleteComment, updateComment } from '../../utils/commentUtils';
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
        console.log(comment.user.id,user)

    };


    const handleEdit = () => {
        const newComment = {
            text:"testing"
        }
        updateComment(activeComment,newComment).then(() => handleUpdateComment())
    }
    const handleDelete = () => {
        deleteComment(activeComment).then(() => handleUpdateComment())
    }

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
