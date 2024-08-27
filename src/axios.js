import axios from "axios";
import store from "./store";
const axiosClient = axios.create({
    baseURL: 'https://api.technovati.com.ng/api'
    // baseURL: 'http://localhost:8081/api'
});
axiosClient.interceptors.request.use(config=>{
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    config.headers.role = store.state.activeRole
    return config;
})
export default axiosClient;