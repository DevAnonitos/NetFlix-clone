import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

// Method Post
router.post(
    "/signup",
    body("username")
        .exists().withMessage("username is required")
        .isLength({ min: 0 }).withMessage("username minium 8 characters!")
        .custom(async value => {
            const user = await userModel.findOne({ username: value });
            if(user) return Promise.reject("Username already used")
        }),

    body("password")
        .exists().withMessage("password is required")
        .isLength({ min: 0 }).withMessage("password minium 6 characters!"),

    body("passwordConfirm")
        .exists().withMessage("passwordConfirm is required")
        .isLength({ min: 0 }).withMessage("password and password confirm are not equal!")
        .custom((value, { req }) => {
            if(value !== req.body.password) throw new Error("ConfirmPassword not match")

            return true;
        }),
);

router.post(
    "/signin",
    body("username")
        .exists().withMessage("username is required")
        .isLength({ min: 0 }).withMessage("username minimum 8 characters!"),

    body("password")
        .exists().withMessage("password is required")
        .isLength({ min: 0 }).withMessage("password minimum 8 characters!"),

    requestHandler.validate,
    userController.signIn,
);

// Method Put
router.put(
    "/update-password",
    tokenMiddleware.auth,

    body("password")
        .exists().withMessage("password is required")
        .isLength({ min: 0 }).withMessage("password minimum 8 characters"),

    body("newPassword")
        .exists().withMessage("newPassword is required")
        .isLength({ min: 0 }).withMessage("newPassword minimum 8 characters"),

    body("ConfirmNewPassword")
        .exists().withMessage("ConfirmNewPassword is required")
        .isLength({ min: 0 }).withMessage("ConfirmNewPassword minimum 8 characters")
        .custom((value, { req }) => {
            if(value !== req.body.newPassword) throw new Error("ConfirmPassword not match")

            return true;
        }),
    requestHandler.validate,
    userController.updatePassword,
);

router.get(
    "/info",
    tokenMiddleware.auth,
    userController.getInfo,
);

router.get(
    "/favorite",
    tokenMiddleware.auth,
    favoriteController.getFavoriteOfUser,
);

router.post(
    "/favorite",
    tokenMiddleware.auth,
    body("mediaType")
        .exists().withMessage("mediatype is required")
        .custom(type => ["movie", "tv"].includes(type)).withMessage("mediatype is invalid"),
    body("mediaId")
        .exists().withMessage('mediaId is required')
        .isLength({ min: 1 }).withMessage("media can not be empty"),
    body("mediaTitle")
        .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
        .exists().withMessage("mediaPoster is required"),
    body("mediaRate")
        .exists().withMessage("mediaRate is required"),
    favoriteController.addFavorite,
);

router.delete(
    "/favorite/:favoriteId",
    tokenMiddleware.auth,
    favoriteController.removeFavorite,
)

export default router;
