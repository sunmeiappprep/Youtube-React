import React, { useEffect, useState } from 'react'
import { fetchVideos } from '../../utils/videoUtils'
import VideoSideBarThumbnail from './VideoSideBarThumbnail'

export default function SidebarVideoRec() {
    const [videosSide,setVideoSide] = useState([])

    useEffect(() =>{
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        fetchVideos(currentTimeInSeconds,1).then((e) => setVideoSide(e))
    },[])
    console.log(videosSide)
    if (videosSide)
  return (
    <div>
    {videosSide.map((video) => (
        <div key={video.id} className="">
            <VideoSideBarThumbnail
                videoId={video.videoId}
                title={video.videoTitle}
                uploader={video.username}
                url = {video.videoUrl.split("=")[1]}
                generatedDate={video.videoGeneratedDate}
                view={video.videoViews}
            />
        </div>
    ))}
    </div>
  )
}
