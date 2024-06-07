import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserVideos } from '../../utils/videoUtils';
import { useGlobalState } from '../../StateContext';
import UserVideoGrid from './UserVideoGrid';
import { useParams } from 'react-router-dom';
function UserVideoUploadInfo() {
    const { id } = useParams();
    const [videos, setVideos] = useState([]); 

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                if (id) {
                    const response = await getUserVideos(id);
                    setVideos(response);
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchVideos();
    }, [id]);

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