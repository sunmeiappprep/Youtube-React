import React from 'react';
import CommentOptions from './CommentOptions'; // Import CommentOptions
import ReplyButton from './ReplyButton';

const Comment = ({
    comment,
    commentReactions,
    handleCommentReaction,
    handleToggleOptions,
    handleEdit,
    handleDelete,
    activeComment,
    activeCommentIsUser,
    handleUpdateComment
}) => {
    console.log(comment)
    return (
        <div key={comment.id} className={`bg-black shadow rounded-lg p-6 relative ml-6`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
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
            <div className="text-white flex items-center mt-4">
                <p>{comment.text}</p>
                <p className="ml-4">{commentReactions}</p>
            </div>
            <div className="mt-4 flex space-x-4">
                <button onClick={() => handleCommentReaction(comment.id, true)} className="text-sm bg-green-500 text-white px-2 py-1 rounded">Good</button>
                <button onClick={() => handleCommentReaction(comment.id, false)} className="text-sm bg-red-500 text-white px-2 py-1 rounded">Bad</button>
            </div>
            <div><ReplyButton commentUser={comment.user.username} parentCommentId={comment.id} handleUpdateComment={handleUpdateComment}/></div>
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
    );
};

export default Comment;
