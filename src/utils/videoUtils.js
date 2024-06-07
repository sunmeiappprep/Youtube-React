import api from './axiosInterceptors';
import axios from 'axios';
// Assuming api is an Axios instance configured to include JWT in headers
export const postVideo = async (videoData) => {
    try {
    console.log(videoData)
      const response = await api.post('http://localhost:8080/api/video/', videoData);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  export const getUserVideos = async (user) => {
    try {
      const response = await api.get(`http://localhost:8080/api/user/video/${user}`);
      console.log(response.data); // Handle the response as needed
      return response.data
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  export const fetchVideos = async (seed, page) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/video/videos?seed=${seed}&page=${page}`);
        // Handle the response - add the videos to your state, etc.
        return (response.data)
    } catch (error) {
        console.error("Failed to fetch videos:", error);
        // Handle errors, perhaps notify the user
    }
}

  export const updateVideo = async (id,newVideo) => {
    try {
      const response = await api.put(`http://localhost:8080/api/video/${id}`,newVideo);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  export const deleteVideo = async (id) => {
    try {
      const response = await api.delete(`http://localhost:8080/api/video/${id}`);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };
  export const getVideo = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/video/${id}`);
      return(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  export const getSearchVideo = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/search/${searchTerm}`);
      console.log(response.data); // Handle the response as needed
      return(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };


export const getSubscribedVideos = async (subscriberId) => {
  try {
    const response = await api.get('http://localhost:8080/api/video/subscribed', {
      params: { subscriberId: subscriberId }
    });
    console.log("Axios", response.data);
    return response.data; // Handle the response as needed
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

  
  
  // Example usage:
  const videoInfo = {
    title: 'My Video Title',
    url: 'http://example.com/myvideo.mp4',
    description: 'An optional video description.'
  };
  
