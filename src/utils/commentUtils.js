import api from "./axiosInterceptors";
import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;
export const createComment = async (commentInfo) => {
    try {
    // console.log(commentInfo)
      const response = await api.post(`${apiUrl}/api/comment/add`, commentInfo);
      // console.log(response.data); // Handle the response as needed
    } catch (error) {
      // console.error(error.response ? error.response.data : error.message);
    }
  };

export const seedComment = async (commentInfo) => {
  try {
  // console.log(commentInfo)
    const response = await axios.post(`${apiUrl}/api/comment/seed`, commentInfo);
    // console.log(response.data); // Handle the response as needed
  } catch (error) {
    // console.error(error.response ? error.response.data : error.message);
  }
};

export const getComments = async (videoId) => {
    try {
        const response = await axios.get(`${apiUrl}/api/comment/get/video/${videoId}`);
        // console.log(response.data)
        return(response.data); 
    } catch (error) {
        // console.error(error.response ? error.response.data : error.message);
    }
};

export const commentAddLiked = async (commentData) => {
  try {
    const response = await api.post(`${apiUrl}/api/commentReactions/add`, commentData);
    return(response.data); // Handle the response as needed
  } catch (error) {
    // console.error(error.response ? error.response.data : error.message);
  }
};

export const getCommentsReaction = async (commentId) => {
  try {
      const response = await axios.get(`${apiUrl}/api/commentReactions/results/${commentId}`);
      // console.log(response.data)
      return(response.data); 
  } catch (error) {
      // console.error(error.response ? error.response.data : error.message);
  }
};

export const updateComment = async (commentId,text) => {
    try {
      const response = await api.put(`${apiUrl}/api/comment/edit/${commentId}`,text);
      // console.log(response.data); 
      return response.data
    } catch (error) {
      // console.error(error.response ? error.response.data : error.message);
    }
  };

export const deleteComment = async (id) => {
    try {
      const response = await api.delete(`${apiUrl}/api/comment/${id}`);
      // console.log(response.data);
      return response.data
    } catch (error) {
      // console.error(error.response ? error.response.data : error.message);
    }
  };

  export const deleteAllComments = async () => {
    try {
      const response = await api.delete(`${apiUrl}/api/comment/deleteAll`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.error(error.response ? error.response.data : error.message);
    }
  };

  export const getVideoCommentsReactions = async (videoId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/comment/videos/${videoId}/comments/reactions`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.error(error.response ? error.response.data : error.message);
    }
  };