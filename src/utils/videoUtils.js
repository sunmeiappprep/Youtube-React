import api from './axiosInterceptors';

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
  
  // Example usage:
  const videoInfo = {
    title: 'My Video Title',
    url: 'http://example.com/myvideo.mp4',
    description: 'An optional video description.'
  };
  
  