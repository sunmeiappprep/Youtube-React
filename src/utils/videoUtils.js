import api from './axiosInterceptors';
import axios from 'axios';
// Assuming api is an Axios instance configured to include JWT in headers
const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const postVideo = async (videoData) => {
    try {
    // console.log(videoData)
      const response = await api.post(`${apiUrl}/api/video/`, videoData);
      // console.log(response.data); // Handle the response as needed
      return response.data
    } catch (error) {
      // console.error(error.response ? error.response.data : error.message);
    }
  };

  export const seedVideo = async (videoData) => {
    try {
    // console.log(videoData)
      const response = await axios.post(`${apiUrl}/api/video/seed`, videoData);
      // console.log(response.data); // Handle the response as needed
      return response.data
    } catch (error) {
      // console.error(error.response ? error.response.data : error.message);
    }
  };


  export const getUserVideos = async (user) => {
    try {
      const response = await api.get(`${apiUrl}/api/user/video/${user}`);
      // console.log(response.data); // Handle the response as needed
      return response.data
    } catch (error) {
      // console.error(error.response ? error.response.data : error.message);
    }
  };

  export const fetchVideos = async (seed, page) => {
    try {
        const response = await axios.get(`${apiUrl}/api/video/videos?seed=${seed}&page=${page}`);
        // Handle the response - add the videos to your state, etc.
        return (response.data)
    } catch (error) {
        // console.error("Failed to fetch videos:", error);
        // Handle errors, perhaps notify the user
    }
}

  export const updateVideo = async (id,newVideo) => {
    try {
      const response = await api.put(`${apiUrl}/api/video/${id}`,newVideo);
      // console.log(response.data); // Handle the response as needed
    } catch (error) {
      // console.error(error.response ? error.response.data : error.message);
    }
  };

  export const deleteVideo = async (id) => {
    try {
      const response = await api.delete(`${apiUrl}/api/video/${id}`);
      // console.log(response.data); // Handle the response as needed
    } catch (error) {
      // console.error(error.response ? error.response.data : error.message);
    }
  };
  export const getVideo = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/api/video/${id}`);
      return(response.data); // Handle the response as needed
    } catch (error) {
      // console.error(error.response ? error.response.data : error.message);
    }
  };

  export const getSearchVideo = async (searchTerm) => {
    try {
      const response = await axios.get(`${apiUrl}/api/search/${searchTerm}`);
      // console.log(response.data); // Handle the response as needed
      return(response.data); // Handle the response as needed
    } catch (error) {
      // console.error(error.response ? error.response.data : error.message);
    }
  };


export const getSubscribedVideos = async (subscriberId) => {
  try {
    const response = await api.get(`${apiUrl}/api/video/subscribed`, {
      params: { subscriberId: subscriberId }
    });
    // console.log("Axios", response.data);
    return response.data; // Handle the response as needed
  } catch (error) {
    // console.error(error.response ? error.response.data : error.message);
  }
};

  
  
  // Example usage:
  const videoInfo = {
    title: 'My Video Title',
    url: 'http://example.com/myvideo.mp4',
    description: 'An optional video description.'
  };
  
