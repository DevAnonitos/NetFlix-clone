import userModel from "../models/user.model.js";
import  jsonwebToken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signUp = async (req, res) => {
    try {
        const { username, password, displayName } = req.body;

        const checkUser = await userModel.findOne({
            username
        });

        if(checkUser) return responseHandler.badRequest(res, "Username has been already used!");

        const user = new userModel();

        user.displayName = displayName;
        user.username = username;
        user.setPassword(password);
        // Save
        await user.save();
        // generate Token
        const token = jsonwebToken.sign(
            { data: user.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "24h" }
        );

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id,
        });

    } catch (error) {
        responseHandler.error(res);
        console.log(error);
    };
};

const signIn  = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username }).select("Username password salt id displayName");

        if(!user)
            return responseHandler(res, "User not found!");

        if(!user.validPassword(password))
            return responseHandler.badRequest(res, "Wrong Password");

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" },
        );

        user.password = undefined;
        user.salt = undefined;

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id,
        });
    } catch (error) {
        responseHandler.error(res);
        console.log(error);
    }
};

