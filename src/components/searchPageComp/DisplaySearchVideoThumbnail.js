import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateDifference } from '../../utils/dateUtils';
import { convertNumber } from '../../utils/numberUtils';
import { getColorFromInitial } from '../../utils/getColorFromInitial';
function DisplaySearchVideoThumbnail({ id, title, description, view, url, generatedDate, thumbnail,userId,username }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/video/${id}`);
    };

    const initial = username[0];
    const circleColor = getColorFromInitial(initial);

  return (
    <div className="flex flex-col md:flex-row items-start bg-custom-dark rounded shadow-md w-full max-w-6xl py-4 md:p-0">
      <div className="flex-shrink-0 w-full md:w-128" onClick={handleClick}>
        <div className="relative cursor-pointer" style={{ paddingTop: '56.25%' }}>
          <img src={thumbnail} alt="Video thumbnail" className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" />
        </div>
      </div>
      <div className="mt-4 md:mt-0 md:ml-0 flex-1 px-4 ">
        <h2
          className="text-lg font-semibold cursor-pointer hover:underline text-custom-white-thumbnail"
          onClick={handleClick}
        >
          {title}
        </h2>
        <div className="flex gap-2 items-center my-2 text-sm">
          <p className="text-gray-500">{convertNumber(view)} views</p>
          <p className="text-gray-500">{formatDateDifference(generatedDate)} ago</p>
        </div>
        <div className="flex items-center mb-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mr-2"
            style={{ backgroundColor: circleColor }}
          >
            <span className="text-white font-bold text-lg">{initial}</span>
          </div>
          <p className="text-gray-500 text-sm">{username}</p>
        </div>
        <p className="text-gray-500 line-clamp-1 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default DisplaySearchVideoThumbnail;