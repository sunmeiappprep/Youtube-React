import React from 'react';

const CommentOptions = ({ handleEdit, handleDelete, userUsername, commentUser }) => (
    <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md py-1 z-10">
        {userUsername === commentUser ? (
            <>
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
            </>
        ) : (
            <div className="block px-4 py-2 text-sm text-gray-700 w-full text-left">
                No permission
            </div>
        )}
    </div>
);

export default CommentOptions;
