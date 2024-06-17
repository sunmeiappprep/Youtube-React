import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlay } from '@fortawesome/free-solid-svg-icons';
import { formatDateDifference } from '../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';
function PlaylistThumbnail({ url, title, createdOn, count,playlistId }) {

    const navigate = useNavigate();

    const handleViewPlaylist = () => {
      navigate(`/playlist/${playlistId}`);
    };

    const truncateTitle = (title) => {
        if (title.length > 12) {
            return title.substring(0, 12) + '...';
        }
        return title;
    };

    return (
        <div className="max-w-xs mx-auto rounded overflow-hidden shadow-lg relative cursor-pointer" onClick={handleViewPlaylist}>
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-transparent opacity-50 z-0"></div>
                <img 
                    className="absolute top-0 left-0 w-full h-full object-cover" 
                    style={{ objectFit: 'cover' }} // Ensure the image covers the container
                    src={`https://i.ytimg.com/vi/${url}/hqdefault.jpg`} 
                    alt="Video thumbnail" 
                />
                <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-50 py-1 px-2 rounded-md text-xs text-white flex items-center z-10">
                    <FontAwesomeIcon icon={faBars} className="mr-1" />
                    <FontAwesomeIcon icon={faPlay} className="mr-1" />
                    {count} videos
                </div>
            </div>
            <div className="py-2 relative z-10 text-left">
                <div className="font-bold text-xl mb-2 truncate" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {title}
                </div>
                <div className="text-gray-500 mb-2 w-full text-left">Updated {formatDateDifference(createdOn)}</div>
                <a href="#" className="text-blue-500 hover:underline" onClick={handleViewPlaylist}>View Full Playlist</a>
            </div>
        </div>
    );
}

export default PlaylistThumbnail;
