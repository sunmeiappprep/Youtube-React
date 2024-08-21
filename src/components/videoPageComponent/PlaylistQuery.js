import React,{useEffect, useState} from 'react'
import { getPlaylistVideo } from '../../utils/playlist'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function PlaylistQuery({playlistId}) {
    const { videoId } = useParams()
    const [playlistVideo,setPlaylistVideo] = useState()
    const navigate = useNavigate();

    const handleClick = (video) => {
      navigate(`/playlist/${playlistId}/video/${video.videoId}`);
      };

    useEffect(() => {
        getPlaylistVideo(playlistId).then((response) => setPlaylistVideo(response))
    }, [playlistId])

    useEffect(() => {
      console.log(playlistVideo);
      console.log(videoId)
  }, [playlistVideo]);
    
    console.log(playlistId)
    if (!playlistVideo || playlistVideo.length === 0) return <p>No videos available</p>; 
    return (
      <div className="py-4">
      <div className="max-w-md mx-auto rounded-lg shadow-lg bg-custom-dark">
        <div className="overflow-y-auto max-h-[50vh] py-4">
          {playlistVideo.map((video, index) => {
            const url = video.videoUrl.split("=")[1];
            const isActiveVideo = video.videoId == videoId; 
            return (
              <div 
                key={index} 
                onClick={() => handleClick(video)} 
                className={`flex justify-start w-full mb-5 cursor-pointer hover:bg-custom-gray rounded-lg ${isActiveVideo ? 'bg-gray-500' : ''}`}
                style={isActiveVideo ? { backgroundColor: 'gray' } : {}}
              >
                <div className="flex w-auto max-w-full p-2">
                  <div className="flex items-center justify-center px-4" style={{ width: '20px' }}>
                    <div className="text-custom-white">{index + 1}</div>
                  </div>
                  <div className="flex-none" style={{ width: '160px', height: '90px' }}>
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      <img 
                        src={`https://i.ytimg.com/vi/${url}/hqdefault.jpg`} 
                        alt={video.videoTitle} 
                        className="absolute top-0 left-0 w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-start w-3/5 pl-2" style={{ height: '90px' }}>
                    <div className="font-bold text-sm mb-2 break-words line-clamp-2">{video.videoTitle}</div> 
                    <p className="text-gray-500 text-xs">
                      {video.username}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    
      );
      

      
      
}
    
    export default PlaylistQuery;