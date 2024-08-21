import React, { useState, useEffect } from 'react';
import { getPlaylistTitle, getPlaylistVideo } from '../../utils/playlist';
import NavBar from '../navBar/NavBar';
import Sidebar from '../navBar/Sidebar';
import { useGlobalState } from '../../StateContext'; 
import { formatDateDifference } from '../../utils/dateUtils';
import PlaylistThumbnailColumn from '../playlistComp/PlaylistThumbnailColumn';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const PlaylistPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [playlistInfo, setPlaylistInfo] = useState({});
  const { showSubMenu,setShowSubMenu } = useGlobalState();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getPlaylistVideo(id);
        const response2 = await getPlaylistTitle(id);
        setPlaylistInfo(response2);
        setVideos(response);
        const viewsReducer = response.reduce((acc, video) => acc + video.videoViews, 0);
        setTotalViews(viewsReducer);
      } catch (error) {
        console.error('Error fetching videos', error);
      }
    };

    fetchVideos();
  }, [id]);

  useEffect(()=>{
    console.log(videos)
  },[videos])

  useEffect(() => {
    if (window.innerWidth < 900) {
      setShowSubMenu(false);
    } else {
      setShowSubMenu(true);
    }
  }, [setShowSubMenu]);

  if (videos.length === 0) {
    return (
      <div className='bg-custom-dark min-h-screen'>
        <div className="relative flex">
          <Sidebar />
          <div className={`flex-grow ${showSubMenu ? 'ml-64' : 'ml-0'}`}>
            <NavBar />
            <div className="flex-grow flex items-center justify-center">
              <p className="text-gray-500 text-xl">This playlist is currently empty. Add some videos to get started.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const handleClick = () => {
    navigate(`/playlist/${id}/video/${videos[0].videoId}`);
    };
    
  const firstVideo = videos[0];

  return (
    <div className="bg-custom-dark min-h-screen">
      <div className="relative flex">
        <Sidebar />
        <div className={`flex-grow ${showSubMenu ? 'ml-64' : 'ml-0'}`}>
          <NavBar />
          <div className="p-4 flex justify-center">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center lg:items-start lg:space-x-4">
              <div className="w-full lg:w-1/3 mb-4 lg:mb-0 rounded-lg cursor-pointer p-4 hover:bg-custom-gray">
                <div className="w-full max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg relative">
                  <div className="relative w-full pt-[56.25%]">
                    <div className="absolute z-0 rounded-lg"></div>
                    <img
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-lg "
                      src={`https://i.ytimg.com/vi/${firstVideo.videoUrl.split("=")[1]}/hqdefault.jpg`}
                      alt="Video thumbnail"
                      onClick={handleClick}
                    />
                  </div>
                  <div className="py-1">
                    <p className="text-white font-bold text-3xl py-2 text-center">{playlistInfo.title}</p>
                    <p className="text-white font-semibold text-sm text-center">{playlistInfo.createdBy.username}</p>
                    <div className="flex justify-center text-xs font-medium text-custom-white py-3">
                      <p className="pr-2">{videos.length} videos</p>
                      <p className="pr-2">{totalViews} views</p>
                      <p>{formatDateDifference(playlistInfo.createdOn)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-2/3 px-1">
                {videos.map((video, index) => (
                  <div key={video.videoId} className="mb-4">
                    <PlaylistThumbnailColumn video={video} index={index} playlistId={id} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;