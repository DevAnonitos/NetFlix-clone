import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:8000/api/v1";

const privateClient = axios.create({
    baseURL,
    paramsSerializer: {
        encode: params => queryString.stringify(params),
    },
});

const requestInterceptor = async config => {
    return {
        ...config,
        header: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("actkn")}`,
        }
    }
};

privateClient.interceptors.request.use(requestInterceptor);

privateClient.interceptors.response.use((response) => {
    if(response && response.data) return response.data;
    return response;
}, (err) => {
    throw err.response.data;
});

export default privateClient;
