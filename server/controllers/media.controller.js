import tmdbApi from "../tmdb/tmdb.api.js";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";

const getList = async (req, res) => {
    try {
        const { page } = req.query;
        const { mediaType, mediaCategory } = req.params;

        const response = await tmdbApi.mediaList({
            mediaType,
            mediaCategory,
            page
        });

        return responseHandler.ok(res, response);
    } catch (error) {
        responseHandler.error(res);
        console.log(error);
    }
};

const getGenres = async (req, res) => {
    try {
        const { mediaType } = req.params;

        const response = await tmdbApi.mediaGenres({ mediaType });

        return responseHandler.ok(res, response);
    } catch (error) {
        responseHandler.error(res);
        console.log(error);
    }
};

const search = async (req, res) => {
    try {
        const { mediaType } = req.params;
        const { query, page } = req.query;

        const response = await tmdbApi.mediaSearch({
            query,
            page,
            mediaType: mediaType === "people" ? "person" : mediaType,
        });

        responseHandler.ok(res);
    } catch (error) {
        responseHandler.error(res);
        console.log(error);
    }
};
