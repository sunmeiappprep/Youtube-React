import React from 'react'
import { addLiked } from '../../utils/videoReactionUtils'
export default function LikeAndDislikeButton({videoId,handleUpdateLiked}) {
    const handleLikeButton =() => {
        let likedInfo = {
            videoId: videoId,
            liked: true,
        }
        addLiked(likedInfo);
        handleUpdateLiked()
         
    }

    const handleDislikeButton =() => {
        let likedInfo = {
            videoId: videoId,
            liked: false,
        }
        addLiked(likedInfo);
        handleUpdateLiked()
    }
  return (
    <div>
        <button onClick={handleLikeButton}>Liked</button>
        <button onClick={handleDislikeButton}>Disliked</button>
    </div>
  )
}
