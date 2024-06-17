import React, { useState,useEffect,useRef } from 'react';
import CommentOptions from './CommentOptions'; // Import CommentOptions
import ReplyButton from './ReplyButton';
import { formatDateDifference } from '../../utils/dateUtils';
import { getColorFromInitial } from '../../utils/getColorFromInitial';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { useGlobalState } from '../../StateContext';

const Comment = ({
    comment, commentReactions, handleCommentReaction, handleUpdateComment, activeCommentId,
    setActiveCommentId,handleDelete
}) => {
    const { userUsername } = useGlobalState();
    const [isReplying, setIsReplying] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);
    const textareaRef = useRef(null);
    useEffect(() => {
        if (activeCommentId !== comment.id) {
            setShowOptions(false);
            setIsEditing(false);
        }
    }, [activeCommentId]);

    const handleReplyClick = () => {
        setIsReplying(true);
    };

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(
                textareaRef.current.value.length,
                textareaRef.current.value.length
            );
        }
    }, [isEditing]);

    const handleButtonClick = () => {
        setActiveCommentId(comment.id);
        setShowOptions((prevShowOptions) => !prevShowOptions);
        console.log('Active Comment ID:', comment.id);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setShowOptions(false);
    };

    const handleEditSubmit = async () => {
        await handleUpdateComment(comment.id, editedText);
        setIsEditing(false);
    };

    const handleEditChange = (e) => {
        setEditedText(e.target.value);
    };

    const initial = comment.user.username[0];
    const circleColor = getColorFromInitial(initial);

    return (
        <div key={comment.id} className="bg-custom-dark shadow rounded-lg p-1 relative ml-6  flex items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: circleColor }}>
                <span className="text-white font-bold text-lg">{initial}</span>
            </div>
            <div className="flex-1 min-w-0 ml-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 min-w-0 flex flex-row">
                            <p className="text-sm font-medium text-white truncate pr-2">{comment.user.username}</p>
                            <p className="text-sm text-custom-white">{formatDateDifference(comment.createdAt)} ago</p>
                        </div>
                    </div>
                    <div className="relative">
                        <button className="focus:outline-none" onClick={handleButtonClick}>
                            <svg className="w-6 h-6 text-gray-600 hover:text-gray-800" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                        {showOptions && (
                            <CommentOptions
                                handleEdit={handleEditClick}
                                handleDelete={() => handleDelete(comment.id)}
                                userUsername={userUsername}
                                commentUser={comment.user.username}
                            />
                        )}
                    </div>
                </div>
                {isEditing ? (
                    <div className="bg-black p-4 rounded">
                        <textarea
                            ref={textareaRef}
                            className="w-full p-2 rounded bg-black text-white"
                            value={editedText}
                            onChange={handleEditChange}
                        />
                        <button
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                            onClick={handleEditSubmit}
                        >
                            Save
                        </button>
                        <button
                            className="mt-2 ml-2 px-4 py-2 bg-gray-600 text-white rounded"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="text-white flex items-center">
                            <p>{comment.text}</p>
                        </div>
                        <div className="mt-2 flex space-x-4 items-center">
                            <button
                                onClick={() => handleCommentReaction(comment.id, true)}
                                className="text-lg text-white px-2 py-1 rounded flex items-center justify-center hover:bg-gray-400 hover:rounded-full"
                            >
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </button>
                            <p className="text-white">{commentReactions}</p>
                            <button
                                onClick={() => handleCommentReaction(comment.id, false)}
                                className="text-lg text-white px-2 py-1 rounded flex items-center justify-center hover:bg-gray-400 hover:rounded-full"
                            >
                                <FontAwesomeIcon icon={faThumbsDown} />
                            </button>
                            <button onClick={handleReplyClick}>Reply</button>
                        </div>
                    </>
                )}
                {isReplying && (
                    <ReplyButton
                        commentUser={comment.user.username}
                        parentCommentId={comment.id}
                        handleUpdateComment={handleUpdateComment}
                        setIsReplying={setIsReplying}
                        initial={initial}
                        circleColor={circleColor}
                    />
                )}
            </div>
        </div>
    );
};

export default Comment;