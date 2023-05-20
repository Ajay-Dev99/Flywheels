import axios from 'axios'

const axiosInstance = ()=>{
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL
      
    });
    return instance
}

export default axiosInstance;
