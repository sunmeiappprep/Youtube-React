import React from 'react';
import VideoThumbnail from '../grid/VideoThumbnailPicture';
function UserVideoGrid({ videos }) { 
    return (
        <div className="mx-auto px-4 py-8 w-full">
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {videos.map((video) => (
                    <div key={video.id}>
                        <VideoThumbnail
                            videoId={video.id}
                            title={video.title}
                            uploader={video.userId}
                            generatedDate={video.generatedDate}
                            view={video.view}
                            url={video.url.split("=")[1]}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserVideoGrid;
