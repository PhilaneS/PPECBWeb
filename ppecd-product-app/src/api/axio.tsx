import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7260/api",// process.env.REACT_APP_API_URL,
   // withCredentials: true,
});


export default api;