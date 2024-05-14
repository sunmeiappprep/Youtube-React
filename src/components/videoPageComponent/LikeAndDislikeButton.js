import React, { useEffect, useState } from 'react';
import { addLiked } from '../../utils/videoReactionUtils';
import { useGlobalState } from '../../StateContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

export default function LikeAndDislikeButton({ videoId, handleUpdateLiked }) {
    const { user, token, setUser, setToken } = useGlobalState();
    const [attempted, setAttempted] = useState(false);
    const navigate = useNavigate()
    const handleLikeButton = () => {
        if (!user) {
            setAttempted(true);
            return;
        }
        let likedInfo = {
            videoId: videoId,
            liked: true,
        };
        addLiked(likedInfo).then(() => handleUpdateLiked());

    };


    const handleDislikeButton = () => {
        if (!user) {
            setAttempted(true);
            return;
        }

        let likedInfo = {
            videoId: videoId,
            liked: false,
        };
        addLiked(likedInfo).then(() => handleUpdateLiked());
    };

    const handleLogin = () => {
        navigate('/login')
    }



    return (
        <div className="flex space-x-2">
        <button
            onClick={handleLikeButton}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out">
            <FontAwesomeIcon icon={faThumbsUp} /> Like
        </button>
        <button
            onClick={handleDislikeButton}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-150 ease-in-out">
            <FontAwesomeIcon icon={faThumbsDown} /> Dislike
        </button>
            {!user && attempted &&
                <button onClick={handleLogin} className="px-4 py-1 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded">
                    Login
                </button>}

        </div>
    );
}
