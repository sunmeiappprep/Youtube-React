import React from 'react';
import { addLiked } from '../../utils/videoReactionUtils';

export default function LikeAndDislikeButton({ videoId, handleUpdateLiked }) {
    const handleLikeButton = () => {
        let likedInfo = {
            videoId: videoId,
            liked: true,
        };
        addLiked(likedInfo).then(() => handleUpdateLiked());
    };

    const handleDislikeButton = () => {
        let likedInfo = {
            videoId: videoId,
            liked: false,
        };
        addLiked(likedInfo).then(() => handleUpdateLiked());
    };

    return (
        <div className="flex space-x-2">
            <button 
                onClick={handleLikeButton}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
            >
                Like
            </button>
            <button 
                onClick={handleDislikeButton}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-150 ease-in-out"
            >
                Dislike
            </button>
        </div>
    );
}
