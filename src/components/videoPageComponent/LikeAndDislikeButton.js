import React, { useEffect, useState } from 'react';
import { addLiked } from '../../utils/videoReactionUtils';
import { useGlobalState } from '../../StateContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

export default function LikeAndDislikeButton({ videoId, handleUpdateLiked,liked }) {
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
        <div className="flex items-center h-8 bg-custom-gray rounded-l-full rounded-r-full">
        <button
        onClick={handleLikeButton}
        className="flex items-center px-4 py-2 h-full bg-custom-gray text-white rounded-l-full rounded-r-none hover:bg-custom-hover-gray transition duration-150 ease-in-out">
        <FontAwesomeIcon icon={faThumbsUp} /> {liked[0]}
      </button>
      
      <div className="h-3/5 w-px bg-custom-white m-0"></div>
      
      <button
        onClick={handleDislikeButton}
        className="flex items-center px-4 py-2 h-full bg-custom-gray text-white rounded-l-none rounded-r-full hover:bg-custom-hover-gray transition duration-150 ease-in-out">
        <FontAwesomeIcon icon={faThumbsDown} /> {liked[1]}
      </button>
        
        {token === "" && attempted && (
          <button 
            onClick={handleLogin} 
            className="ml-2 px-4 py-1 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded">
            Login
          </button>
        )}
      </div>
    );
}
