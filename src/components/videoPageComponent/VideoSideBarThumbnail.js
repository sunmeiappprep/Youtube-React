import React from 'react';
import { useNavigate } from 'react-router-dom';
function VideoSideBarThumbnail({ videoId, title, uploader, url }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/video/${videoId}`); 
  };

  if(url)

  return (
    <div className="flex justify-end w-full pl-4">
      <div className="flex w-auto max-w-full">
        <div className="flex-none w-2/5"> 
          <img src={`https://i.ytimg.com/vi/${url}/hq720.jpg`} alt={title} className="w-full h-auto" />
        </div>
        <div className="flex flex-col justify-center w-3/5 pl-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">
            Uploaded by {uploader}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoSideBarThumbnail;
