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
import SidebarVideoRec from '../videoPageComponent/SidebarVideoRec';
import { getUsernameById } from '../../utils/authUtils';
import Playlist from '../videoPageComponent/Playlist';
import Sidebar from '../navBar/Sidebar'; 
function VideoPage() {
  const { user, token, setUser, setToken, showSubMenu, setShowSubMenu } = useGlobalState();
  const [title, setVideoTitle] = useState('');
  const [url, setVideoURL] = useState('');
  const [description, setVideoDescription] = useState('');
  const [liked, setLiked] = useState([]);
  const videoId = window.location.pathname.split('/')[2];
  const [youtubeCode, setYoutubeCode] = useState('');
  const [uploaderUserId, setUploaderUserId] = useState('');
  const [uploadUsername, setUploaderUsername] = useState('');
  const videoRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoData = await getVideo(videoId);
        console.log(videoData);

        setUploaderUserId(videoData.userId);
        setUploaderUsername(videoData.username);
        setVideoTitle(videoData.videoTitle);
        setVideoURL(videoData.videoUrl);
        const code = videoData.videoUrl.split('=')[1];
        setYoutubeCode(code);
        document.title = videoData.videoTitle;
      } catch (error) {
        console.error('Error fetching video data or username:', error);
      }
    };

    fetchVideoData();

    return () => {
      document.title = 'Youtube';
    };
  }, [videoId]);

  useEffect(() => {
    setShowSubMenu(false);
  }, []);

  const fetchData = async (videoId) => {
    try {
      const likedData = await getLiked(videoId);
      setLiked(likedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(videoId);
  }, [videoId]);

  useLayoutEffect(() => {
    const updatePosition = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        setPosition((prevPosition) => {
          const newPosition = {
            x: Math.floor(rect.left),
            y: Math.floor(rect.top),
          };
          if (prevPosition.x === 0) {
            console.log('position is initially 0');
            newPosition.x -= 12;
          }
          console.log(newPosition); // Directly log the new position
          return newPosition;
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [youtubeCode]);

  const handleUpdateLiked = () => {
    getLiked(videoId).then((e) => {
      setLiked(e);
    });
  };

  if (!youtubeCode) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-custom-dark min-h-screen">
      <div className="relative flex">
        <Sidebar />
        <div className={`flex-grow ${showSubMenu ? 'ml-64' : 'ml-0'}`}>
          <div className="video-responsive">
            <NavBar />
            <div className="flex justify-center">
              <div className="w-full max-w-13xl">
                <div className="flex">
                  <div className="w-3/4">
                    <VideoEmbed ref={videoRef} videoId={youtubeCode} onClick={() => {}} />
                    <p className="title">{title}</p>
                    <div className="grid grid-cols-5 items-center gap-4 pb-2">
                      <p className="col-span-1">{uploadUsername}</p>
                      <div className="col-span-1"></div>
                      <div className="col-span-1"></div>
                      <div className="col-span-1 flex justify-center">
                        <div className="w-32 flex justify-center">
                          <LikeAndDislikeButton videoId={videoId} handleUpdateLiked={handleUpdateLiked} liked={liked} />
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <div className="w-32 flex justify-center">
                          <Playlist videoId={videoId} />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center">
                      <div className="col-span-1"></div>
                      <div className="col-span-1"></div>
                      <div className="col-span-1"></div>
                      <div className="col-span-1 flex justify-center">
                        <div className="w-32 flex justify-center">
                          <LikedAndDislike liked={liked} videoId={videoId} />
                        </div>
                      </div>
                      <div className="col-span-1"></div>
                    </div>
                    <CommentsDisplay videoId={videoId} />
                  </div>
                  <div className="w-1/4">
                    <SidebarVideoRec />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
