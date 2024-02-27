import api from './axiosInterceptors';

export const addLiked = async (videoData) => {
    try {
    console.log(videoData)
      const response = await api.post('http://localhost:8080/api/videoReactions/add', videoData);
      return(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  export const getLiked = async (id) => {
    try {
      const response = await api.get(`http://localhost:8080/api/videoReactions/results/${id}`);
      return(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };