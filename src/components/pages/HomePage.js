import React, { useEffect, useState } from 'react'
import NavBar from '../navBar/NavBar'
import VideoThumbnail from '../grid/VideoThumbnail'
import VideoGrid from '../grid/VideoGrid'
import { fetchVideos } from '../../utils/videoUtils'
export default function HomePage() {
  const [videos,setVideos] = useState([])
  const [page,setPage] = useState(1)

  useEffect(() => {
    fetchVideos('123123123',2).then(e => setVideos(e))
  },[])

  if (videos.length === 0) {
    return <div>Loading...</div>; // Show a loading indicator or message
  }
  return (
    <div>
      <NavBar />
      <VideoGrid videos={videos}/>
    </div>
  )
}
