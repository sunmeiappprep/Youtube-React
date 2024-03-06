import React from 'react';
import { useNavigate } from 'react-router-dom';


function VideoSideBarThumbnail({ generatedDate, view, videoId, title, uploader, url }) {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log('Attempting to navigate to:', `/video/${videoId}`);
        console.log('Navigate function:', navigate);
        window.location.href = `/video/${videoId}`;
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

    if (url)

        return (
            <div onClick={handleClick} className="flex justify-end w-full pl-4">
                <div className="flex w-auto max-w-full">
                    <div className="flex-none w-2/5">
                        <img src={`https://i.ytimg.com/vi/${url}/hqdefault.jpg`} alt={title} className="w-full h-auto" />
                    </div>
                    <div className="flex flex-col justify-center w-3/5 pl-4">
                        <div className="font-bold text-sm mb-2 break-words">{title}</div> 
                        <p className="text-gray-500 text-xs md:text-base">
                            Uploaded by {uploader}
                        </p>
                        <div className='flex text-gray-500 text-xs md:text-base'>
                            <div className='pr-4'>
                                {view} Views
                            </div>
                            <div>
                                {formatDateDifference(generatedDate)} ago
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )

};

export default VideoSideBarThumbnail;
