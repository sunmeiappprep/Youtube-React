import React, { useEffect, useState,useRef } from 'react';
import { useGlobalState } from '../../StateContext';
import { addToPlaylist, checkIfVideoInPlaylists, createPlaylist, deleteVideoFromPlaylist, getPlaylistVideo, getUserPlaylist } from '../../utils/playlist';
import './ModalStyles.css';
import { useNavigate } from 'react-router-dom';
export default function Playlist({videoId}) {
  const navigate = useNavigate()
  const containerRef = useRef(null);
  const [playlists, setPlaylists] = useState([]);
  const {user, token, setUser, setToken } = useGlobalState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistChecked, setPlaylistChecked] = useState({});
  const [attempted, setAttempted] = useState(false);
  const openModal = () => {
    if (token === "") {
      setAttempted(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreatePlaylist = async () => {
    if (playlistName.trim() !== '') {
      let playlistInfo = {
        title: playlistName
      };
      try {
        await createPlaylist(playlistInfo);
        console.log('Playlist created:', playlistInfo);
        // Fetch playlists again after creating a new one
        await handleGetUserPlaylist();
      } catch (error) {
        console.error('Error creating playlist:', error);
      }
      setPlaylistName('');
    }
  };


  useEffect(() => {
    if (user) {
      getUserPlaylist(user)
        .then(e => {
          setPlaylists(e);
          console.log(e); 
        })
        .catch(error => {
          console.error('Error fetching user playlists:', error);
        });
    }
  }, [user]);


  useEffect(() => {
    const updatePlaylistChecked = async () => {
      try {
        const response = await checkIfVideoInPlaylists(videoId);
        const updatedPlaylistChecked = {};

        response.forEach(playlist => {
          updatedPlaylistChecked[playlist.id] = true;
        });

        setPlaylistChecked(updatedPlaylistChecked);
        console.log(playlistChecked)
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    updatePlaylistChecked();
  }, [videoId]); 



  const handleGetUserPlaylist = () => {
    getUserPlaylist(user)
      .then(response => {
        setPlaylists(response);
        console.log(response)
      })
      .catch(error => {
        console.error('Error fetching playlist:', error);
      });
  };

  const handleAddToPlaylist = async (playlistId) => {
    let addToPlaylistInfo = {
        playlistTitleId:playlistId,
        videoId:videoId
      }
    try {
        await addToPlaylist(addToPlaylistInfo)
        await handleGetUserPlaylist()
    } catch (error) {
        console.error('Error addToPlaylist or handleGetUserPlaylist', error);
    }
  }

  const handleCheckboxChange = (playlistId) => {
    setPlaylistChecked(prevState => ({
      ...prevState,
      [playlistId]: !prevState[playlistId]
    }));

    handleAddToPlaylist(playlistId);
  };

  const handleLogin = () => {
    navigate('/signin')
}

const handleClickOutside = (event) => {
  if (containerRef.current && !containerRef.current.contains(event.target)) {
    setAttempted(false);
  }
};

useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


return (
  <div ref={containerRef} className="flex items-center space-x-2">
    <button className='h-8 w-16 bg-custom-gray rounded-l-full rounded-r-full' onClick={openModal}>Save</button>
    
    {token === "" && attempted && (
      <button 
        onClick={handleLogin} 
        className="h-8 w-16 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded">
        Login
      </button>
    )}

    {isModalOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <div className='modal-top-wrapper'>
            <h2 className='text-left'>Save video to...</h2>
            <button className="close" onClick={closeModal}>&times;</button>
          </div>
          <div className="scrollable-content">
            <ul className="playlist-list">
              {playlists.map((playlist, index) => (
                <li key={index} className="playlist-item">
                  <input 
                    type="checkbox" 
                    className="custom-checkbox" 
                    onChange={() => handleCheckboxChange(playlist.id)}
                    checked={playlistChecked[playlist.id] || false}
                  />
                  <span className="playlist-title">
                    {playlist.title.length > 20
                      ? playlist.title.slice(0, 20) + '...'
                      : playlist.title}
                  </span>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Create new playlist"
              className="playlist-input"
            />
            <button className="create" onClick={handleCreatePlaylist}>Create</button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};