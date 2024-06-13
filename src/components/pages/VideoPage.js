import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { getVideo, getUserVideos, updateVideo, deleteVideo, postVideo } from '../../utils/videoUtils';
import { getLiked } from '../../utils/videoReactionUtils';
import { useGlobalState } from '../../StateContext';
import LikeAndDislikeButton from '../videoPageComponent/LikeAndDislikeButton';
import VideoEmbed from '../videoPageComponent/VideoEmbed';
import NavBar from '../navBar/NavBar';
import CommentsDisplay from '../videoPageComponent/CommentsDisplay';
import SidebarVideoRec from '../videoPageComponent/SidebarVideoRec';
import Playlist from '../videoPageComponent/Playlist';
import Sidebar from '../navBar/Sidebar'; 
import { findPlaylistIdByUserAndTitle } from '../../utils/playlist';
import { getColorFromInitial } from '../../utils/getColorFromInitial';
import { convertNumber } from '../../utils/numberUtils';
import { formatDateDifference } from '../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

function VideoPage() {
  const { user, token, setUser, setToken, showSubMenu, setShowSubMenu } = useGlobalState();
  const [title, setVideoTitle] = useState('');
  const [url, setVideoURL] = useState('');
  const [description, setVideoDescription] = useState('');
  const [views, setVideoViews] = useState('');
  const [videoGeneratedDate, setVideoGeneratedDate] = useState('');
  const [liked, setLiked] = useState([]);
  const videoId = window.location.pathname.split('/')[2];
  const [youtubeCode, setYoutubeCode] = useState('');
  const [uploaderUserId, setUploaderUserId] = useState('');
  const [uploadUsername, setUploaderUsername] = useState('');
  const videoRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [watchLaterPlaylistId,setWatchLaterPlaylistId] = useState(0)
  const [likedVideoPlaylistId,setLikedVideoPlaylistId] = useState(0)
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const navigate = useNavigate()


  const handleMoreClick = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };


  useEffect(() => {
    const fetchPlaylistIds = async () => {
      try {
        const watchLaterId = await findPlaylistIdByUserAndTitle("Watch Later");
        const likedVideoId = await findPlaylistIdByUserAndTitle("Liked Video");

        setWatchLaterPlaylistId(watchLaterId);
        setLikedVideoPlaylistId(likedVideoId);
        console.log(watchLaterId,likedVideoId)
      } catch (error) {
        console.error("Error fetching playlist IDs:", error);
      }
    };

    fetchPlaylistIds();
  }, []);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoData = await getVideo(videoId);
        console.log(videoData);

        setUploaderUserId(videoData.userId);
        setUploaderUsername(videoData.username);
        setVideoTitle(videoData.videoTitle);
        setVideoURL(videoData.videoUrl);
        setVideoDescription(videoData.videoDescription);
        setVideoViews(videoData.videoViews);
        setVideoGeneratedDate(videoData.videoGeneratedDate)
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

  const handleDelete = () => {
    deleteVideo(videoId).then(() => navigate('/git '))
  }

  if (!youtubeCode) {
    return <div>Loading...</div>;
  }
  
  const initial = uploadUsername[0];
  const circleColor = getColorFromInitial(initial); 
  return (
    <div className="bg-custom-dark min-h-screen">
      <div className="relative flex">
        <Sidebar />
        <div className={`flex-grow ${showSubMenu ? 'ml-64' : 'ml-0'}`}>
          <div className="video-responsive">
            <NavBar />
            <div className="flex justify-center">
              <div className="w-full max-w-10.5xl">
                <div className="flex">
                  <div className="w-3/4">
                    <VideoEmbed ref={videoRef} videoId={youtubeCode} onClick={() => {}} />
                    <p className="title truncate">{title}</p>
                    <div className="flex items-center mt-4">
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-2"
                        style={{ backgroundColor: circleColor }}
                      >
                        <span className="text-white font-bold text-lg">{initial}</span>
                      </div>
                      <div className="flex flex-col">
                        <p>{uploadUsername}</p>
                        <p className="text-gray-500 text-sm">4.82K subscribers</p>
                      </div>
                      <button
                        className="ml-4 bg-red-600 text-white px-4 py-1 rounded"
                        onClick={() => { /* subscribe logic here */ }}
                      >
                        Subscribe
                      </button>
                      <div className="flex-grow flex justify-end items-center mr-8">
                        <div>
                          <button onClick={handleDelete} className='h-8 w-36 bg-custom-gray rounded-l-full rounded-r-full mr-2'>
                          Delete Video 
                          </button>
                        </div>
                        <div className="flex justify-center mr-4">
                          <LikeAndDislikeButton
                            videoId={videoId}
                            handleUpdateLiked={handleUpdateLiked}
                            liked={liked}
                            likedVideoPlaylistId={likedVideoPlaylistId}
                          />
                        </div>
   
                        <div className="flex justify-center">
                          <Playlist videoId={videoId} />
                        </div>
                      </div>
                    </div>
                    <hr className="border-gray-500 my-4" />
                    <div className="bg-custom-gray-desc p-4 rounded-lg text-white mt-4 cursor-pointer"
                    onClick={handleMoreClick}>
                    <div className="flex gap-2 font-bold">
                      <p>{convertNumber(views)} views</p>
                      <p>{formatDateDifference(videoGeneratedDate)} ago</p>
                    </div>
                    <div className="mt-2">
                      <p className={isDescriptionExpanded ? '' : 'line-clamp-2'}>
                        {description}
                      </p>
                      {!isDescriptionExpanded && (
                        <span className="text-blue-500 cursor-pointer" onClick={handleMoreClick}>
                          ... more
                        </span>
                      )}
                      {isDescriptionExpanded && (
                        <span className="text-blue-500 cursor-pointer" onClick={handleMoreClick}>
                          Show less
                        </span>
                      )}
                    </div>
                  </div>
                    <CommentsDisplay videoId={videoId} />
                  </div>
                  <div className="w-1/4 ml-2">
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
