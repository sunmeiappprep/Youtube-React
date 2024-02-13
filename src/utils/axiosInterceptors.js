import axios from 'axios';

// Create an Axios instance
const api = axios.create();

// Set the AUTH token for any request
api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default api;
