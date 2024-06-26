import axios from 'axios';
import api from './axiosInterceptors';
const apiUrl = process.env.REACT_APP_BACKEND_URL;
export const createPlaylist = async (playlistData) => {
    try {
    console.log("Axios",playlistData)
      const response = await api.post(`${apiUrl}/api/playlistTitle/`, playlistData);
      console.log("Axios",response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  export const getUserPlaylist = async (userId) => {
    try{
      const response = await api.get(`${apiUrl}/api/playlistTitle/${userId}`);
      console.log("Axios",response.data)
      return response.data
    }catch (error){
      console.error(error.response ? error.response.data : error.message);
    }
  }

  export const checkIfVideoInPlaylists = async (videoId) => {
    try {
      const response = await api.get(`${apiUrl}/api/playlistVideos/checkVideo`, {
        params: {
          videoId: videoId
        }
      });
      console.log("Axios",response.data);
      return response.data;
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }

    export const addToPlaylist = async (playlistData) => {
        try {
        console.log("Axios",playlistData)
        const response = await api.post(`${apiUrl}/api/playlistVideos/addVideoToPlaylist`, playlistData);
        console.log("Axios",response.data); // Handle the response as needed
        } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        }
    };

    export const getUserFirstVideo = async (userId) => {
      try {
          const response = await axios.get(`${apiUrl}/api/playlistTitle/user/${userId}/firstVideos`);
          console.log("Axios",response);
          return response.data;
      } catch (error) {
          console.error(error.response ? error.response.data : error.message);
      }
  };
  

    export const getPlaylistVideo = async (playlistId) => {
        try {
        const response = await api.get(`${apiUrl}/api/playlistVideos/${playlistId}`);
        console.log("Axios",response.data); 
        return response.data
        } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        }
    };

    export const getPlaylistTitle = async (playlistTitleId) => {
      try {
      const response = await api.get(`${apiUrl}/api/playlistTitle/title/${playlistTitleId}`);
      console.log("Axios",response.data); 
      return response.data
      } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      }
  };


    export const deleteVideoFromPlaylist = async (playlistId,VideoId) => {
        try {
          const response = await api.delete(`${apiUrl}/api/playlistVideos/delete/${playlistId}/${VideoId}`);
          console.log("Axios",response.data); // Handle the response as needed
        } catch (error) {
          console.error(error.response ? error.response.data : error.message);
        }
      };

    export const findPlaylistIdByUserAndTitle = async (title) => {
      try {
          const response = await api.get(`${apiUrl}/api/playlistTitle/findIdByTitle`, {
              params: { title },
          });
          return response.data;
      } catch (error) {
          console.error('Error fetching playlist ID:', error);
          throw error;
      }
  };