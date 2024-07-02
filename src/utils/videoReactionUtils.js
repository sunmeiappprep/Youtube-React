import api from './axiosInterceptors';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;
export const addLiked = async (videoData) => {
    try {
    // console.log(videoData)
      const response = await api.post(`${apiUrl}/api/videoReactions/add`, videoData);
      return(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };
  

  export const getLiked = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/api/videoReactions/results/${id}`);
      return(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  