import React from 'react';
import asd from "../../assets/images/asd.jpg"
import Avatar from 'react-avatar';
import CircleProfile from './CircleProfile';
import { useNavigate } from 'react-router-dom';
function VideoThumbnail({ videoId, title, uploader,url }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/video/${videoId}`); // Adjust the route as needed
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={`https://i.ytimg.com/vi/${url}/hqdefault.jpg`} alt="Video thumbnail"   onClick={handleClick} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          Uploaded by {uploader}
        </p>
      </div>
    </div>
  );
}

export default VideoThumbnail;
