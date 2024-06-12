import axios from 'axios';
import api from './axiosInterceptors';
export const createPlaylist = async (playlistData) => {
    try {
    console.log("Axios",playlistData)
      const response = await api.post('http://localhost:8080/api/playlistTitle/', playlistData);
      console.log("Axios",response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  export const getUserPlaylist = async (userId) => {
    try{
      const response = await api.get(`http://localhost:8080/api/playlistTitle/${userId}`);
      console.log("Axios",response.data)
      return response.data
    }catch (error){
      nsole.error(error.response ? error.response.data : error.message);
    }
  }

  export const checkIfVideoInPlaylists = async (videoId) => {
    try {
      const response = await api.get(`http://localhost:8080/api/playlistVideos/checkVideo`, {
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
        const response = await api.post('http://localhost:8080/api/playlistVideos/addVideoToPlaylist', playlistData);
        console.log("Axios",response.data); // Handle the response as needed
        } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        }
    };

    export const getUserFirstVideo = async (userId) => {
      try {
          const response = await axios.get(`http://localhost:8080/api/playlistTitle/user/${userId}/firstVideos`);
          console.log("Axios",response);
          return response.data;
      } catch (error) {
          console.error(error.response ? error.response.data : error.message);
      }
  };
  

    export const getPlaylistVideo = async (playlistId) => {
        try {
        const response = await api.get(`http://localhost:8080/api/playlistVideos/${playlistId}`);
        console.log("Axios",response.data); 
        return response.data
        } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        }
    };

    export const getPlaylistTitle = async (playlistTitleId) => {
      try {
      const response = await api.get(`http://localhost:8080/api/playlistTitle/title/${playlistTitleId}`);
      console.log("Axios",response.data); 
      return response.data
      } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      }
  };


    export const deleteVideoFromPlaylist = async (playlistId,VideoId) => {
        try {
          const response = await api.delete(`http://localhost:8080/api/playlistVideos/delete/${playlistId}/${VideoId}`);
          console.log("Axios",response.data); // Handle the response as needed
        } catch (error) {
          console.error(error.response ? error.response.data : error.message);
        }
      };

    export const findPlaylistIdByUserAndTitle = async (title) => {
      try {
          const response = await api.get(`http://localhost:8080/api/playlistTitle/findIdByTitle`, {
              params: { title },
          });
          return response.data;
      } catch (error) {
          console.error('Error fetching playlist ID:', error);
          throw error;
      }
  };