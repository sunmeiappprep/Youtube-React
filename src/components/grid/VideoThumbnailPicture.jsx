import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateDifference } from '../../utils/dateUtils';
import { convertNumber } from '../../utils/numberUtils';
import { getColorFromInitial } from '../../utils/getColorFromInitial';
import useNavigateWithMiddleClick from '../hooks/useNavigateWithMiddleClick';
function VideoThumbnail({ videoId, title, uploader, url, generatedDate, view, userId }) {
  const handleClickToVideo = useNavigateWithMiddleClick(`/video/${videoId}`);
  const handleClickToUser = useNavigateWithMiddleClick(`/user/${userId}`);


  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };


  const initial = getInitial(uploader);
  const circleColor = getColorFromInitial(initial); 

  return (
    <div className="max-w-xs mx-auto rounded overflow-hidden shadow-lg relative">
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-transparent opacity-50 z-0"></div>
        <img
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg cursor-pointer"
          src={`https://i.ytimg.com/vi/${url}/hqdefault.jpg`}
          alt="Video thumbnail"
          onMouseDown={handleClickToVideo}
        />
      </div>
      <div className="pr-2 py-2 relative z-10 flex items-start">
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
            className="font-medium text-custom-white-thumbnail text-l mb-1 line-clamp-2 cursor-pointer font-roboto"
            onMouseDown={handleClickToVideo}
          >
            {title}
          </div>
          {uploader && (
            <p
              className="text-sm text-custom-gray-thumbnail mb-1 cursor-pointer font-roboto"
              onMouseDown={handleClickToUser}
            >
              {uploader}
            </p>
          )}
          <div
            className="flex text-custom-gray-thumbnail text-sm cursor-pointer font-roboto"
            onMouseDown={handleClickToVideo}
          >
            <div className="pr-1">{convertNumber(view)} views</div>
            <div className='pr-1'>•</div>
            <div>{formatDateDifference(generatedDate)} ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoThumbnail;
