import axios from "axios";



// create a class which will be used to create axios instances
export class AxiosConfig {
    constructor(baseURL, customHeaders, withCredentials = false) {
        this.baseURL = baseURL;
        this.customHeaders = customHeaders;
        this.withCredentials = withCredentials;
    }

    // create a new axios instance
    createAxiosInstance =  axios.create({
            baseURL: this.baseURL,
            headers: {
                "Content-type": "application/json",
                ...this.customHeaders,
            },
            withCredentials: this.withCredentials,
        });
}
