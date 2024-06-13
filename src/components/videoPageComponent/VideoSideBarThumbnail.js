import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateDifference } from '../../utils/dateUtils';
import { convertNumber } from '../../utils/numberUtils';
function VideoSideBarThumbnail({ generatedDate, view, videoId, title, uploader, url }) {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log('Attempting to navigate to:', `/video/${videoId}`);
        console.log('Navigate function:', navigate);
        window.location.href = `/video/${videoId}`;
    };


    if (url)

    return (
        <div onClick={handleClick} className="flex justify-start w-full">
            <div className="flex w-auto max-w-full p-2">
                <div className="flex-none" style={{ width: '160px', height: '90px' }}>
                    <div className="relative w-full h-full overflow-hidden rounded-lg ">
                        <img 
                            src={`https://i.ytimg.com/vi/${url}/hqdefault.jpg`} 
                            alt={title} 
                            className="absolute top-0 left-0 w-full h-full object-cover" 
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-start w-3/5 pl-2 "style={{height: '90px' }}>
                    <div className="font-bold text-sm mb-2 break-words truncate-multiline text-custom-white-thumbnail">{title}</div> 
                    <p className="text-custom-gray-thumbnail text-xs">
                        Uploaded by {uploader}
                    </p>
                    <div className='flex text-custom-gray-thumbnail text-xs '>
                        <div className='pr-4'>
                            {convertNumber(view)} Views
                        </div>
                        <div>
                            {formatDateDifference(generatedDate)} ago
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    
    
    
    

};

export default VideoSideBarThumbnail;
