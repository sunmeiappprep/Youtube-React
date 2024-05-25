import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../../StateContext';
import { getUserFirstVideo } from '../../utils/playlist';
import PlaylistThumbnail from './PlaylistThumbnail';

function PlaylistTitleAndVideoInfo() {
    const { user } = useGlobalState();
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    console.log(user)
                    const data = await getUserFirstVideo(user);
                    setPlaylist(data);
                    console.log(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [user]); 
    if (!user) return null;


    return (
        <div className="mx-auto px-4 py-8 w-full">
            <div className="text-lg font-bold mb-4">Created Playlist</div>
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {playlist.map((item, index) => (
                    <div key={index}>
                        <PlaylistThumbnail 
                            playlistId ={item.playlistTitle.id}
                            url={item.video.url.split("=")[1]} 
                            title={item.playlistTitle.title} 
                            count={item.videoCount}
                            createdOn={item.playlistTitle.createdOn}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlaylistTitleAndVideoInfo;
