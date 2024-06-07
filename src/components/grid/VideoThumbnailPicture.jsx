import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateDifference } from '../../utils/dateUtils';
import { convertNumber } from '../../utils/numberUtils';

function VideoThumbnail({ videoId, title, uploader, url, generatedDate, view, userId }) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const getRandomColor = () => {
    const colors = ['#FF5722', '#3F51B5', '#4CAF50', '#FFC107', '#009688'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const initial = getInitial(uploader);
  const circleColor = getRandomColor();

  return (
    <div className="max-w-xs mx-auto rounded overflow-hidden shadow-lg relative">
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-transparent opacity-50 z-0"></div>
        <img
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg cursor-pointer"
          src={`https://i.ytimg.com/vi/${url}/hqdefault.jpg`}
          alt="Video thumbnail"
          onClick={() => handleClick(`/video/${videoId}`)}
        />
      </div>
      <div className="px-2 py-2 relative z-10 flex items-start">
        {uploader && (
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-2"
            style={{ backgroundColor: circleColor }}
          >
            <span className="text-white font-bold text-lg">{initial}</span>
          </div>
        )}
        <div>
          <div
            className="font-bold text-xl mb-1 line-clamp-2 cursor-pointer"
            style={{ fontFamily: 'Roboto', fontWeight: 500 }}
            onClick={() => handleClick(`/video/${videoId}`)}
          >
            {title}
          </div>
          {uploader && (
            <p
              className="text-gray-500 text-sm mb-1 cursor-pointer"
              style={{ fontFamily: 'Roboto', fontWeight: 400 }}
              onClick={() => handleClick(`/user/${userId}`)}
            >
              {uploader}
            </p>
          )}
          <div
            className="flex text-gray-500 text-sm cursor-pointer"
            style={{ fontFamily: 'Roboto', fontWeight: 400 }}
            onClick={() => handleClick(`/video/${videoId}`)}
          >
            <div className="pr-1">{convertNumber(view)} Views</div>
            <div className='pr-1'>•</div>
            <div>{formatDateDifference(generatedDate)} ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoThumbnail;
