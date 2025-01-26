import axios from 'axios'

// const BASE_URL = process.env.BASE_URL
const apiClient = axios.create({
    baseURL: 'https://final-hackathon-backend-nu.vercel.app/',
    timeout:5000,
    headers:{
        "Content-Type": "application/json"
    }
})

apiClient.interceptors.response.use((res)=>{
    return res;
}, (error)=>{
    return Promise.reject(error)
})

export default apiClient