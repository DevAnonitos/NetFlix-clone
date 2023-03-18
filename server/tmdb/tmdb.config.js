const baseUrl = process.env.TMDB_BASE_URL;
const apiKey = process.env.TMDB_KEY;

const getUrl = (endpoint, params) => {
    const qs = new URLSearchParams(params);

    return `${baseUrl}${endpoint}?api_key=${apiKey}&${qs}`;
};

export default { getUrl };
