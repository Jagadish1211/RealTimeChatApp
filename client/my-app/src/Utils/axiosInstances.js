
import { AxiosConfig } from "./axiosConfig";

// this will be used for making api calls without authentication token
export const AxiosInstance = (customHeaders ={}) => {
    const newInstance = new AxiosConfig(
        {
            baseURL : "http://localhost:5000/app",
            customHeaders : customHeaders,
            withCredentials : false
        }
    )
    const AxiosInstance = newInstance.createAxiosInstance()
    return  AxiosInstance
}

// this will be used for making api calls with authentication tokens
// this must have the access token attached as custom header
export const privateAxiosInstance = () => {
    const accessToken = JSON.parse(localStorage.get("accessToken"));
    const newInstance = new AxiosConfig(
        {
            baseURL : "http://localhost:5000/app",
            customHeaders : { 'Authorization' : `Bearer ${accessToken}` },
            withCredentials : true
        }
    )

    const privateAxiosInstance = newInstance.createAxiosInstance();
    privateAxiosInstance.interceptors.response.use(function(res) {
        // if there is a 403 error, then use the refresh token to fetch a new access token
        if(res.status === 403) {
            // call the refresh token api
        }

    })
    return  privateAxiosInstance
}

