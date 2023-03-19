import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";

// addFavorite app
const addFavorite = async (req, res) => {
    try {
        const isFavorite = await favoriteModel.findOne({
            user: req.user.id,
            mediaId: req.body.mediaId
        });

        if(isFavorite) return responseHandler.ok(res, isFavorite);

        const favorite = new favoriteModel({
            ...req.body,
            user: req.user.id,
        });

        await favorite.save();

        responseHandler.created(res, favorite);
    } catch (error) {
        responseHandler.error(res);
        console.log(error);
    }
};

// removeFavorite App
const removeFavorite = async (req, res) => {
    try {
        const { favoriteId } = req.params;

        const favorite = await favoriteModel.findOneAndRemove({
            user: req.user.id,
            _id: favoriteId,
        });

        if(!favorite) return responseHandler.notFound(res);

        await favorite.remove();

        responseHandler.ok(res);
    } catch (error) {
        responseHandler.error(res);
    }
};

const getFavoriteOfUser = async (req, res) => {
    try {
        const favorite = await favoriteModel.findOne({ user: req.user.id }).sort("-createdAt");

        responseHandler.ok(res, favorite);
    } catch (error) {
        responseHandler.error(res);
    }
};

export default { addFavorite, removeFavorite, getFavoriteOfUser };
