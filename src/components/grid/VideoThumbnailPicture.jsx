import React from 'react';
import asd from "../../assets/images/asd.jpg"
import Avatar from 'react-avatar';
import CircleProfile from './CircleProfile';
import { useNavigate } from 'react-router-dom';
import { formatDateDifference } from '../../utils/dateUtils';
import { convertNumber } from '../../utils/numberUtils';
function VideoThumbnail({ videoId, title, uploader, url, generatedDate, view }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/video/${videoId}`);
  };


    return (
        <div className="max-w-xs mx-auto rounded overflow-hidden shadow-lg relative">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-transparent opacity-50 z-0"></div>
                <img 
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" 
                    src={`https://i.ytimg.com/vi/${url}/hqdefault.jpg`} 
                    alt="Video thumbnail" 
                    onClick={handleClick} 
                />
            </div>
            <div className="px-4 py-2 relative z-10">
                <div className="font-bold text-xl mb-2 line-clamp-2">{title}</div>
                {uploader && (
                  <p className="text-gray-500 text-base">Uploaded by {uploader}</p>
                )}
                <div className="flex text-gray-500">
                    <div className="pr-4">{convertNumber(view)} Views</div>
                    <div>{formatDateDifference(generatedDate)} ago</div>
                </div>
            </div>
        </div>
    );
}

export default VideoThumbnail;
