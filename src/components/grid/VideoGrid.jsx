import React from 'react';
import VideoThumbnail from './VideoThumbnailPicture'; // Adjust the import path as needed

function VideoGrid({ videos }) { 
    return (
        // Use mx-auto for horizontal centering if needed, and px-4 for padding. Remove the max-w-md if you want it to stretch.
        <div className="mx-auto px-4 py-8 w-full">
            <div className="flex flex-wrap justify-center gap-4">
                {videos.map((video) => (
                    <div key={video.id} className="">
                        <VideoThumbnail
                            videoId={video.id}
                            title={video.title}
                            uploader={video.userId}
                            url = {video.url.split("=")[1]}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VideoGrid;
