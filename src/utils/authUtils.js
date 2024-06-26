import axios from 'axios';
import api from './axiosInterceptors';
const apiUrl = process.env.REACT_APP_BACKEND_URL;
export const loginUser = async (username,password) => {

    const url = `${apiUrl}/user/login`; 
    const userData = {
      username: username,
      password: password
    };

    try {
      const response = await axios.post(url, userData);
      console.log('Login successful:', response.data.user);
      localStorage.setItem('token', response.data.jwtToken);
      console.log(localStorage.getItem('token'));
      return response.data
    } catch (error) {
      console.error('Login failed:', error.response || error.message);
    }
  };


  export const getUsernameById = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/user/${userId}/username`);
      console.log(response);
      return response.data
    } catch (error) {
      console.error('SignIn failed:', error.response || error.message);
      return { success: false, error: error.response ? error.response.data : error.message };
    }
  };

  
  export const checkJWT = async () => {
    try {
        //find token from storage
        const token = localStorage.getItem('token'); 
        if (!token) {
            console.log('No token found');
            return false;
        }

        const response = await axios.get(`${apiUrl}/api/user/checkJWT`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(response.data); //true or false
        return response.data
    } catch (error) {
        return false
    }
};
  
  

export const registerUser = async (username,password) => {
    const userData = {
      username: username,
      password: password
    };

    try {
      const response = await axios.post(`${apiUrl}/user/register`, userData);
      console.log(`Register successful:`, response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Register failed:', error.response || error.message);
      return { success: false, error: error.response ? error.response.data : error.message };
    }
  };
   
export const logOut = async () => {
    localStorage.removeItem('token');
};


