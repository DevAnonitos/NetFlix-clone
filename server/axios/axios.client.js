import axios from "axios";

const get = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log("Request failed with status code 400:", error.response.data);
        } else {
            console.log("An error occurred:", error.message);
        }
    }
};

export default { get };
