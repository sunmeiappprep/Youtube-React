import axios from 'axios';
import api from './axiosInterceptors';

export const loginUser = async (username,password) => {

    const url = 'http://localhost:8080/login'; 
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
      const response = await axios.get(`http://localhost:8080/api/user/${userId}/username`);
      console.log(response);
      return response.data
    } catch (error) {
      console.error(error.response || error.message);
      // Handle error here
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

        const response = await axios.get('http://localhost:8080/api/user/checkJWT', {
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
      const response = await axios.post('http://localhost:8080/register', userData);
      console.log('register successful:', response.data);
      return true
    } catch (error) {
      console.error('register failed:', error.response || error.message);
      return false
    }
  };
   
export const logOut = async () => {
    localStorage.removeItem('token');
};


