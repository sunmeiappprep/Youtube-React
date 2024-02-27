import api from "./axiosInterceptors";
 
export const createComment = async (commentInfo) => {
    try {
    console.log(commentInfo)
      const response = await api.post('http://localhost:8080/api/comment/add', commentInfo);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

export const getComments = async (videoId) => {
    try {
        const response = await api.get(`http://localhost:8080/api/comment/get/video/${videoId}`);
        console.log(response.data)
        return(response.data); 
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
};

export const updateComment = async (commentId,text) => {
    try {
      const response = await api.put(`http://localhost:8080/api/comment/edit/${commentId}`,text);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

export const deleteComment = async (id) => {
    try {
      const response = await api.delete(`http://localhost:8080/api/comment/${id}`);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

