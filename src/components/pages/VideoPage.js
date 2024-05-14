import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { getVideo, getUserVideos, updateVideo, deleteVideo, postVideo } from '../../utils/videoUtils';
import { addLiked, getLiked } from '../../utils/videoReactionUtils';
import { useGlobalState } from '../../StateContext';
import LikedAndDislike from '../videoPageComponent/LikedAndDislike';
import LikeAndDislikeButton from '../videoPageComponent/LikeAndDislikeButton';
import VideoEmbed from '../videoPageComponent/VideoEmbed';
import NavBar from '../navBar/NavBar';
import CommentInput from '../videoPageComponent/CommentInput';
import CommentsDisplay from '../videoPageComponent/CommentsDisplay';
import { getComments } from '../../utils/commentUtils';
import SidebarVideoRec from '../videoPageComponent/SidebarVideoRec';

function VideoPage() {
  const { user, token, setUser, setToken } = useGlobalState();
  const [title, setVideoTitle] = useState('');
  const [url, setVideoURL] = useState('');
  const [description, setVideoDescription] = useState('');
  const [liked, setLiked] = useState([]);
  const videoId = window.location.pathname.split("/")[2];
  const [youtubeCode, setYoutubeCode] = useState('');
  const [comments, setComments] = useState([]);
  const videoRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    getVideo(videoId).then((e) => {
      setVideoTitle(e.title);
      setVideoURL(e.url);
      setVideoDescription(e.description);
      const code = e.url.split("=")[1];
      setYoutubeCode(code);
    });
    getLiked(videoId).then((e) => {
      setLiked(e);
    });
    getComments(videoId).then((e) => setComments(e));
  }, [videoId]);

  useLayoutEffect(() => {
    const updatePosition = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        setPosition((prevPosition) => {
          const newPosition = {
            x: Math.floor(rect.left),
            y: Math.floor(rect.top)
          };
          if (prevPosition.x === 0) {
            console.log("position is initially 0");
            newPosition.x -= 12;
          }
          console.log(newPosition); // Directly log the new position
          return newPosition;
        });
      }
    };

    // Initial calculation
    updatePosition();

    // Add event listener for window resize
    window.addEventListener('resize', updatePosition);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [youtubeCode]);

  const handleUpdateLiked = () => {
    getLiked(videoId).then((e) => {
      setLiked(e);
    });
  };

  const handleUpdateComment = () => {
    getComments(videoId).then((e) => setComments(e));
  };

  if (!youtubeCode) {
    return <div>Loading...</div>;
  }

  return (
    <div className="video-responsive">
      <NavBar />
      <div class="flex justify-center">
      <div class="w-full max-w-13xl
      ">
        <div class="flex">
          <div class="w-3/4">
            <VideoEmbed ref={videoRef} videoId={youtubeCode} />
            <p class="title">{title}</p>
            <LikedAndDislike liked={liked} videoId={videoId} />
            <LikeAndDislikeButton videoId={videoId} handleUpdateLiked={handleUpdateLiked} />
            <CommentInput videoId={videoId} handleUpdateComment={handleUpdateComment} />
            <CommentsDisplay comments={comments} handleUpdateComment={handleUpdateComment} />
          </div>
          <div class="w-1/4">
            <SidebarVideoRec />
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}

export default VideoPage;
