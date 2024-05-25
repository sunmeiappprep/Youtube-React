import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../../StateContext';
import { addToPlaylist, checkIfVideoInPlaylists, createPlaylist, deleteVideoFromPlaylist, getPlaylistVideo, getUserPlaylist } from '../../utils/playlist';

export default function Playlist({videoId}) {
  const [playlists, setPlaylists] = useState([]);
  const {user, token, setUser, setToken } = useGlobalState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistChecked, setPlaylistChecked] = useState({});

  const openModal = () => {
    setIsModalOpen(true);
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

  

  return (
    <div>
      <button className='h-8 w-16 bg-custom-gray rounded-l-full rounded-r-full' onClick={openModal}>Save</button>
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
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7); 
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-top-wrapper {
            display: flex;
            align-items: center;
          }
        .modal {
          background-color: #212121;
          padding-top: 0px; 
          padding-bottom: 20px; 
          padding-left: 20px; 
          border-radius: 10px; 
          width: 300px; /
          max-width: 90%; 
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); 
          text-align: center;
          position: relative;
        }
        .modal h2 {
          margin-top: 0;
          font-family: "Roboto", "Arial", sans-serif;
          font-size: 1.0rem;
          line-height: 1.2rem;
          font-weight: 400;
          color: #F5F3F4; 
        }
        .scrollable-content {
          max-height: 200px; 
          overflow-y: auto; 
          overflow-x: hidden; 
          margin-top: 10px; /
          width: 100%; 
          padding-right: 10px; 
          box-sizing: border-box; 
        }
        .modal ul {
          list-style: none;
          padding: 0;
          margin-bottom: 10px; 
        }
        .modal ul li {
          display: flex;
          align-items: center;
          margin: 5px 0; 
          font-family: "Roboto",
          font-size: .8rem;
          line-height: 1rem;
          font-weight: 400;
          color: #F5F3F4; 
        }
        .custom-checkbox {
          appearance: none;
          background-color: #212121;
          border: 2px solid #ffffff;
          width: 24px;
          height: 24px;
          border-radius: 3px;
          cursor: pointer;
          transition: background-color 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px; 
        }
        .custom-checkbox:checked {
          background-color: #3FA4FF;
        }
        .custom-checkbox:checked::before {
          content: '';
          display: block;
          width: 6px;
          height: 10px;
          border: solid #212121;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
          margin-left: 2px; 
        }
        .modal input.playlist-input {
            margin-bottom: 10px; 
            width: calc(100% - 40px); 
            padding: 10px; 
            font-size: 14px; 
            border: none; 
            border-bottom: 1px solid #ffffff; 
            background-color: #212121; 
            border-radius: 0; 
            box-sizing: border-box; 
          }
          
        .modal button.create {
          margin: 10px 0; 
          padding: 10px 0;
          font-size: 16px; 
          color: #ffffff; 
          background-color: #212121; 
          border: none; 
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s; 
          width: 90%; 
        }
        .modal button.create:hover {
          background-color: #0056b3; 
        }
        .modal button.close {
          margin-left: auto;
          margin-right: 10px;
          top: 5px;
          right: 5px;
          background-color: transparent;
          color: #ffffff; 
          font-size: 36px;
          padding: 0;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};