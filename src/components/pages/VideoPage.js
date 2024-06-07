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
import { commentAddLiked, getComments, getCommentsReaction, getVideoCommentsReactions } from '../../utils/commentUtils';
import SidebarVideoRec from '../videoPageComponent/SidebarVideoRec';
import { getUsernameById } from '../../utils/authUtils';
import Playlist from '../videoPageComponent/Playlist';
import Sidebar from '../navBar/Sidebar'; 
import { useParams } from 'react-router-dom';
function VideoPage() {

  const { user, token, setUser, setToken,showSubMenu,setShowSubMenu } = useGlobalState();
  const [title, setVideoTitle] = useState('');
  const [url, setVideoURL] = useState('');
  const [description, setVideoDescription] = useState('');
  const [liked, setLiked] = useState([]);
  const videoId = window.location.pathname.split("/")[2];
  const [youtubeCode, setYoutubeCode] = useState('');
  const [comments, setComments] = useState([]);
  const videoRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [uploaderUserId, setUploaderUserId] = useState("");
  const [uploadUsername, setUploaderUsername] = useState("");
  const [commentsReactionsObject, setCommentReactionsObject] = useState({});

  // const { videoId } = useParams();


  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoData = await getVideo(videoId);
        console.log(videoData);

        // Set the uploader user ID
        setUploaderUserId(videoData.userId);

        // Set the uploader's username
        setUploaderUsername(videoData.username);

        // Set other video details
        setVideoTitle(videoData.videoTitle);
        setVideoURL(videoData.videoUrl);
        setVideoDescription(videoData.videoDescription);
        const code = videoData.videoUrl.split('=')[1];
        setYoutubeCode(code);

        // Set the document title
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
    const getCommentsReactionAndStore = async () => {
      try {
        const commentsReactionsArrayResult = await getVideoCommentsReactions(videoId);
        const commentsReactionsObject = commentsReactionsArrayResult.reduce((acc, reaction) => {
          acc[reaction.commentId] = reaction.diff;
          return acc;
        }, {});
        setCommentReactionsObject(commentsReactionsObject);
        console.log("results", commentsReactionsObject);
      } catch (error) {
        console.error('Error fetching video data or username:', error);
      }
    };
    getCommentsReactionAndStore();
  }, [videoId,comments]);
  
  useEffect(() => {
    setShowSubMenu(false)
  },[])

  const fetchData = async (videoId) => {
    try {
      const likedData = await getLiked(videoId);
      setLiked(likedData);

      const commentsData = await getComments(videoId);
      commentsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log(commentsData);
      setComments(commentsData);
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
    fetchData(videoId);
  };

  const handleVideoClick = (event) => {
    console.log('Click event:', event);
    // Additional logic for handling the click can be added here
  };

  const handleCommentReaction = async (commentId, bool) => {
    let commentLikedInfo = {
        userId: user,
        commentId: commentId,
        liked: bool,
    };

    try {

        await commentAddLiked(commentLikedInfo); // Make sure this is finished
        const response = await getVideoCommentsReactions(commentId);
        const getCommentsReactionAndStore = async () => {
          try {
            const commentsReactionsArrayResult = await getVideoCommentsReactions(videoId);
            const commentsReactionsObject = commentsReactionsArrayResult.reduce((acc, reaction) => {
              acc[reaction.commentId] = reaction.diff;
              return acc;
            }, {});
            setCommentReactionsObject(commentsReactionsObject);
            console.log("results", commentsReactionsObject);
          } catch (error) {
            console.error('Error fetching video data or username:', error);
          }
        };
        getCommentsReactionAndStore();
    } catch (error) {
        console.error('Failed to fetch comment reactions:', error);
    }
};


  if (!youtubeCode) {
    return <div>Loading...</div>;
  }

  return(
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
                  <VideoEmbed ref={videoRef} videoId={youtubeCode} onClick={handleVideoClick} />
                    <p className="title">{title}</p>
                    <div className="grid grid-cols-5 items-center gap-4 pb-2">
                      <p className="col-span-1">{uploadUsername}</p>
                      <div className="col-span-1"></div> {/* Empty div for the 2nd part */}
                      <div className="col-span-1"></div> {/* Empty div for the 3rd part */}
                      <div className="col-span-1 flex justify-center">
                        <div className="w-32 flex justify-center"> {/* Apply common width and center */}
                          <LikeAndDislikeButton videoId={videoId} handleUpdateLiked={handleUpdateLiked} liked={liked} />
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <div className="w-32 flex justify-center"> {/* Apply common width and center */}
                          <Playlist videoId={videoId} />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center">
                      <div className="col-span-1"></div> {/* Empty div for the 1st part */}
                      <div className="col-span-1"></div> {/* Empty div for the 2nd part */}
                      <div className="col-span-1"></div> {/* Empty div for the 3rd part */}
                      <div className="col-span-1 flex justify-center">
                        <div className="w-32 flex justify-center"> {/* Apply common width and center */}
                          <LikedAndDislike liked={liked} videoId={videoId} />
                        </div>
                      </div>
                      <div className="col-span-1"></div> {/* Empty div for the 5th part */}
                    </div>
                    <CommentInput videoId={videoId} handleUpdateComment={handleUpdateComment} />
                    <CommentsDisplay comments={comments} handleUpdateComment={handleUpdateComment} commentsReactionsObject={commentsReactionsObject} handleCommentReaction={handleCommentReaction}/>
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
