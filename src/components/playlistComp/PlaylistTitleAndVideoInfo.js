import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../../StateContext';
import { getUserFirstVideo } from '../../utils/playlist';
import PlaylistThumbnail from './PlaylistThumbnail';
import { useParams } from 'react-router-dom';
function PlaylistTitleAndVideoInfo() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const data = await getUserFirstVideo(id);
                    setPlaylist(data);
                    // console.log(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]); 

    if (!id) return null;

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