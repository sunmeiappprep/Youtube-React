import React from 'react';
import { formatDateDifference } from '../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { convertNumber } from '../../utils/numberUtils';
const PlaylistThumbnailColumn = ({ video,index }) => {
  const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/video/${video.videoId}`);
      };
  
      return (
        <div onClick={handleClick} className="flex justify-start w-full mb-5">
          <div className="flex w-auto max-w-full p-2">
            <div className="flex items-center justify-center px-4" style={{ width: '20px' }}>
              <div className='text-custom-white'>{index+1}</div>
            </div>
            <div className="flex-none" style={{ width: '160px', height: '90px' }}>
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <img 
                  src={`https://i.ytimg.com/vi/${video.videoUrl.split("=")[1]}/hqdefault.jpg`} 
                  alt={video.videoTitle} 
                  className="absolute top-0 left-0 w-full h-full object-cover" 
                />
              </div>
            </div>
            <div className="flex flex-col justify-start w-3/5 pl-2" style={{ height: '90px' }}>
              <div className="font-bold text-sm mb-2 break-words line-clamp-2">{video.videoTitle}</div> 
              <p className="text-gray-500 text-xs">
                {video.username}•{convertNumber(video.videoViews)} Views• {formatDateDifference(video.videoGeneratedDate)}
              </p>
            </div>
          </div>
        </div>
      );
    };
    
    export default PlaylistThumbnailColumn;