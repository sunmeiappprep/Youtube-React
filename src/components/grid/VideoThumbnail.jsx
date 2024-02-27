import React from 'react';

function VideoThumbnail({ videoId, title, uploader }) {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg">
      {/* Aspect Ratio Wrapper specifically for the iframe */}
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video player"
        ></iframe>
      </div>
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
