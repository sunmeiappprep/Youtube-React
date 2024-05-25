import React from 'react';

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

export default CommentOptions;
