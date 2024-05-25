import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserVideos } from '../../utils/videoUtils';
import { useGlobalState } from '../../StateContext';
import UserVideoGrid from './UserVideoGrid';
function UserVideoUploadInfo() {
    const [videos, setVideos] = useState([]); 
    const {user} = useGlobalState()
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await getUserVideos(user) 
                setVideos(response);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Uploaded Videos</h2>
            {videos.length > 0 ? (
                <UserVideoGrid videos={videos} />
            ) : (
                <p>No videos uploaded yet.</p>
            )}
        </div>
    );
}

export default UserVideoUploadInfo;
