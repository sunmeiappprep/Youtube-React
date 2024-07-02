import React, { useEffect, useState } from 'react';
import NavBar from '../navBar/NavBar';
import VideoGrid from '../grid/VideoGrid';
import Sidebar from '../navBar/Sidebar'; 
import { useGlobalState } from '../../StateContext'; 
import { getSubscribedVideos } from '../../utils/videoUtils';

export default function Subscriptions() {
    const { user, showSubMenu,isAuthenticated,setShowSubMenu } = useGlobalState();
    const [videos, setVideos] = useState([]);

    useEffect(() =>{
        setShowSubMenu(true)
    },[])

    useEffect(() => {
        const fetchSubscribedVideos = async () => {
            try {
                const data = await getSubscribedVideos(user);
                const transformedData = data.map(video => ({
                    videoId: video.id,
                    videoTitle: video.title,
                    username: video.username, 
                    videoGeneratedDate: video.generatedDate,
                    videoViews: video.view,
                    videoUrl: video.url
                }));
                setVideos(transformedData);
            } catch (error) {
                console.error('Failed to fetch subscribed videos:', error);
            }
        };

        if (user && isAuthenticated) {
            fetchSubscribedVideos();
        }
    }, [user,isAuthenticated]);

    return (
        <div className="relative flex min-h-screen bg-custom-dark">
          <Sidebar />
          <div className={`flex-grow ${showSubMenu ? 'ml-64' : 'ml-0'} min-h-screen`}>
            <NavBar />
            <div className="p-4">
              <VideoGrid videos={videos} />
            </div>
          </div>
        </div>
      );
}
