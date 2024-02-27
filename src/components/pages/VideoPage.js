import React, { useState, useEffect } from 'react';
import { postVideo, getUserVideos, updateVideo, deleteVideo, getVideo } from '../../utils/videoUtils';
import { addLiked, getLiked } from '../../utils/videoReactionUtils';
import { useGlobalState } from '../../StateContext';
import LikedAndDislike from '../videoPageComponent/LikedAndDislike';
import LikeAndDislikeButton from '../videoPageComponent/LikeAndDislikeButton';
import VideoEmbed from '../videoPageComponent/VideoEmbed';
import NavBar from '../navBar/NavBar';
import CommentInput from '../videoPageComponent/CommentInput';
import CommentsDisplay from '../videoPageComponent/CommentsDisplay';
import { getComments } from '../../utils/commentUtils';

function VideoPage() {
  const { user, token, setUser, setToken } = useGlobalState(); 
  const [title, setVideoTitle] = useState('');
  const [url, setVideoURL] = useState('');
  const [description, setVideoDescription] = useState('');
  const [liked,setLiked] = useState([])
  const videoId = window.location.pathname.split("/")[2];
  const [comments, setComments] = useState([]);




  useEffect(() => {
   
    
    getVideo(videoId).then((e) => {
      setVideoTitle(e.title); 
      setVideoURL(e.url);
      setVideoDescription(e.description);
    });
    getLiked(videoId).then((e) => {
      setLiked(e)
    })
    getComments(videoId).then((e) => setComments(e)) 

  }, []); 

  const handleUpdateLiked = () => { 
    getLiked(videoId).then((e) => {
      setLiked(e);
    });
  }

  const handleUpdateComment = () => { 
    getComments(videoId).then((e) => setComments(e)) 
  }

  
  

  console.log(title, url, description,liked)
  const youtubeCode = url.split("=")[1]
  return (
    <div className="video-responsive">
      <NavBar/>
      <VideoEmbed videoId={youtubeCode}/>
      <LikedAndDislike liked={liked} videoId={videoId}/>
      <LikeAndDislikeButton videoId={videoId} handleUpdateLiked={handleUpdateLiked}/>
      <CommentInput videoId={videoId} handleUpdateComment = {handleUpdateComment}/>
      <CommentsDisplay comments={comments} handleUpdateComment={handleUpdateComment}/>
     </div>
  );
}

export default VideoPage;
