import React, { useState, useEffect } from 'react';
import { postVideo, getUserVideos, updateVideo, deleteVideo, getVideo } from '../../utils/videoUtils';
import { addLiked, getLiked } from '../../utils/videoReactionUtils';
import { useGlobalState } from '../../StateContext';
import LikedAndDislike from '../videoPageComponent/LikedAndDislike';
import LikeAndDislikeButton from '../videoPageComponent/LikeAndDislikeButton';
function VideoPage() {
  const { user, token, setUser, setToken } = useGlobalState(); // Access the context methods
  const [title, setVideoTitle] = useState('');
  const [url, setVideoURL] = useState('');
  const [description, setVideoDescription] = useState('');
  const [liked,setLiked] = useState([])
  const videoId = window.location.pathname.split("/")[2];
  useEffect(() => {
    // Assuming `window.location.pathname.split("/")[2]` correctly retrieves your video ID
    
    getVideo(videoId).then((e) => {
      setVideoTitle(e.title); // Assuming the response object has a title property
      setVideoURL(e.url); // Assuming the response object has a url property
      setVideoDescription(e.description);
    });
    getLiked(videoId).then((e) => {
      setLiked(e)
    })
  }, []); // Empty dependency array means this runs once after the component mounts

  const handleUpdateLiked = () => { 
    getLiked(videoId).then((e) => {
      setLiked(e)
    })
  }

  console.log(title, url, description,liked)
  const code = url.split("=")[1]
  return (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${code}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
      <LikedAndDislike liked={liked} videoId={videoId}/>
      <LikeAndDislikeButton videoId={videoId} handleUpdateLiked={handleUpdateLiked}/>
    </div>
  );
}

export default VideoPage;
