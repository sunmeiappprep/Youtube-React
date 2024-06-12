import React from 'react';
import { useNavigate } from 'react-router-dom';

function DisplaySearchVideoThumbnail({ id, title, description, view, url, generatedDate, thumbnail }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/video/${id}`);
    };

    return (
        <div className="flex items-center bg-white rounded shadow-md w-full max-w-5xl">
            <div className="flex-shrink-0 w-96" onClick={handleClick}> 
                <div className="relative cursor-pointer" style={{ paddingTop: '56.25%' }}>
                    <img src={thumbnail} alt="Video thumbnail" className="absolute top-0 left-0 w-full h-full object-cover rounded" />
                </div>
            </div>
            <div className="ml-4 flex-1">
                <p className="text-sm text-gray-500">ID: {id}</p>
                <h2 className="text-lg font-semibold cursor-pointer hover:underline" onClick={handleClick}>{title}</h2>
                <p className="text-gray-600">{description}</p>
                <p className="text-gray-500">Views: {view}</p>
                <p className="text-blue-500">
                    URL: <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">{url}</a>
                </p>
                <p className="text-gray-500">Generated Date: {new Date(generatedDate).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

export default DisplaySearchVideoThumbnail;
