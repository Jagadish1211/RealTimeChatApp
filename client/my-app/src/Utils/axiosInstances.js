
import axios from "axios";

// this will be used for making api calls without authentication token
export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/app",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    withCredentials: false,
});

// this will be used for making api calls with authentication tokens
// this must have the access token attached as custom header
const privateAxiosInstance = axios.create({
    baseURL: "http://localhost:5000/app",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
    },
    withCredentials: true,
});

privateAxiosInstance.interceptors.request.use(function (config) {
    return config
}, function (error) { }
)

privateAxiosInstance.interceptors.response.use(function (response) {
    return response }
    , function (error) {
        console.log(error.response.status,'this is');
        const errorConfig = error.config;
        if (error.response.status === 403 && !errorConfig.sent) {
            console.log("Access token expired");
            errorConfig.sent = true;  
            // get new access token
            privateAxiosInstance.get('/refresh').then(res => {
                if (res.status === 200) {
                    console.log("Access token refreshed");
                    // update access token
                    localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
                    errorConfig.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
                    return privateAxiosInstance(errorConfig);
                }
            })
        }

    }
)



export default privateAxiosInstance;