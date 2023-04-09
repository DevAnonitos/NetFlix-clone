import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:8000/api/v1";

const publicClient = axios.create({
    baseURL,
    paramsSerializer: {
        encode: params => queryString.stringify(params),
    },
});

publicClient.interceptors.request(async config => {
    return {
        ...config,
        header: {
            'Content-Type': 'application/json',
        }
    }
});

publicClient.interceptors.response.use((response) => {
    if(response && response.data) return response.data;
    return response;
}, (err) => {
    throw err.response.data;
});

export default publicClient;
