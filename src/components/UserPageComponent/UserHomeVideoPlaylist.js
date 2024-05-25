import React, { useState } from 'react';
import PlaylistTitleAndVideoInfo from '../playlistComp/PlaylistTitleAndVideoInfo';
import UserVideoUploadInfo from './UserVideoUploadInfo';

function UserHomeVideoPlaylist() {
    const [selected, setSelected] = useState("Home");

    const handleClick = (item) => {
        setSelected(item);
    };

    const buttonStyle = (item) => ({
        color: selected === item ? '#F1F1F1' : '#AAAAAA',
        borderBottom: selected === item ? '2px solid #F1F1F1' : 'none',
        paddingBottom: '4px'
    });

    return (
        <div>
            <div className="flex justify-center space-x-4 p-4 border-b">
                <button
                    onClick={() => handleClick("Home")}
                    style={buttonStyle("Home")}
                    className="text-lg font-semibold"
                >
                    Home
                </button>
                <button
                    onClick={() => handleClick("Video")}
                    style={buttonStyle("Video")}
                    className="text-lg font-semibold"
                >
                    Video
                </button>
                <button
                    onClick={() => handleClick("Playlist")}
                    style={buttonStyle("Playlist")}
                    className="text-lg font-semibold"
                >
                    Playlist
                </button>
            </div>
            <div className="p-4">
                {selected === "Home" && <div>Subscribers</div>}
                {selected === "Playlist" && <PlaylistTitleAndVideoInfo />}
                {selected === "Video" && <UserVideoUploadInfo />}
            </div>
        </div>
    );
}

export default UserHomeVideoPlaylist;
