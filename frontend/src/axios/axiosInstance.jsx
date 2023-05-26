import axios from 'axios'


const userInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL

});

userInstance.interceptors.request.use((request)=>{
    const token = localStorage.getItem("jwt")
    request.headers.Authorization = `Bearer ${token}`
    return request;  
})


const adminInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/admin`
})

adminInstance.interceptors.request.use((request)=>{
    const token = localStorage.getItem("adminJwt")
    request.headers.Authorization =  `Bearer ${token}`
    return request;
})

export { userInstance, adminInstance };
