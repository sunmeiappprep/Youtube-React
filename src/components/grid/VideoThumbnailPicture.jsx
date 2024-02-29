import React from 'react';
import asd from "../../assets/images/asd.jpg"
import Avatar from 'react-avatar';
import CircleProfile from './CircleProfile';
import { useNavigate } from 'react-router-dom';
function VideoThumbnail({ videoId, title, uploader, url, generatedDate, view }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/video/${videoId}`); // Adjust the route as needed
  };

  const formatDateDifference = (generatedDate) => {
    const date1 = new Date(generatedDate);
    const date2 = new Date(); 
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''}`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30); 
      return `${months} month${months > 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={`https://i.ytimg.com/vi/${url}/hqdefault.jpg`} alt="Video thumbnail" onClick={handleClick} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-500 text-base">
          Uploaded by {uploader}
        </p>
        <div className='flex text-gray-500 '>
          <div className='pr-4'>
            {view} Views
          </div>
          <div>
            {formatDateDifference(generatedDate)} ago
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoThumbnail;
