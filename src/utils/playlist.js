import api from './axiosInterceptors';
export const createPlaylist = async (playlistData) => {
    try {
    console.log(playlistData)
      const response = await api.post('http://localhost:8080/api/playlistTitle/', playlistData);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };


    export const addToPlaylist = async (playlistData) => {
        try {
        console.log(playlistData)
        const response = await api.post('http://localhost:8080/api/playlistVideos/addVideoToPlaylist', playlistData);
        console.log(response.data); // Handle the response as needed
        } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        }
    };

    export const getPlaylistVideo = async (playlistId) => {
        try {
        console.log(playlistId)
        const response = await api.get(`http://localhost:8080/api/playlistVideos/${playlistId}`);
        console.log(response.data); // Handle the response as needed
        } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        }
    };

    export const deleteVideoFromPlaylist = async (playlistId,VideoId) => {
        try {
          const response = await api.delete(`http://localhost:8080/api/playlistVideos/delete/${playlistId}/${VideoId}`);
          console.log(response.data); // Handle the response as needed
        } catch (error) {
          console.error(error.response ? error.response.data : error.message);
        }
      };