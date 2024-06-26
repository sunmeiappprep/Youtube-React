
import api from "./axiosInterceptors";
const apiUrl = process.env.REACT_APP_BACKEND_URL;
export function isAuth() {
    const token = localStorage.getItem('token');
    if (token) return true
    return false
}



export const validateToken = async () => {
  try {
    const response = await api.get(`/api/auth/validateToken`);
    return response.data; 
  } catch (error) {
    console.error("Token validation failed:", error.response ? error.response.data : error.message);
    return false;
  }
};
