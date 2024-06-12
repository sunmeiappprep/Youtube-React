import React, { useState, useEffect } from 'react';
import { getPlaylistTitle, getPlaylistVideo } from '../../utils/playlist';
import NavBar from '../navBar/NavBar';
import Sidebar from '../navBar/Sidebar';
import { useGlobalState } from '../../StateContext'; 
import { formatDateDifference } from '../../utils/dateUtils';
import PlaylistThumbnailColumn from '../playlistComp/PlaylistThumbnailColumn';
import { convertNumber } from '../../utils/numberUtils';
import { useParams } from 'react-router-dom';
const PlaylistPage = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [playlistInfo, setPlaylistInfo] = useState({});
  const { showSubMenu } = useGlobalState();

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


  if (videos.length === 0) {
    return <div>Loading...</div>;
  }

  const firstVideo = videos[0];

  return (
    <div className='bg-custom-dark min-h-screen'>
      <div className="relative flex">
        <Sidebar />
        <div className={`flex-grow ${showSubMenu ? 'ml-64' : 'ml-0'}`}>
          <NavBar />
          <div className="p-4">
            <div className="flex">
              <div style={{ flex: '1', marginRight: '0px', paddingRight: '0px', display: 'flex', justifyContent: 'flex-end' }}>
                <div className="w-full max-w-xs rounded-lg overflow-hidden shadow-lg relative"> {/* Adjusted width */}
                  <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-transparent opacity-50 z-0 rounded-lg"></div>
                    <img 
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" 
                      src={`https://i.ytimg.com/vi/${firstVideo.videoUrl.split("=")[1]}/hqdefault.jpg`} 
                      alt="Video thumbnail" 
                    />
                  </div>
                  <div className="py-1"> {/* Added padding for spacing */}
                  <p className="text-white font-bold text-3xl py-2">{playlistInfo.title}</p> {/* Title: Bold, bigger, white */}
                  <p className="text-white font-semibold text-sm">{playlistInfo.createdBy.username}</p> {/* Username: Bold, smaller, white */}
                  <div className="flex text-xs font-medium text-custom-white py-3">
                  <p className="pr-2">{videos.length} videos</p>
                  <p className="pr-2">{totalViews} views</p>
                  <p>{formatDateDifference(playlistInfo.createdOn)}</p>
                </div>
                </div>
                </div>
              </div>
              <div style={{ flex: '2', marginLeft: '0px', paddingLeft: '0px' }}>
                {videos.map((video, index) => (
                  <div key={video.videoId}>
                    <PlaylistThumbnailColumn video={video} index={index} />
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
