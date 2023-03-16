import userModel from "../models/user.model.js";
import  jsonWebToken from "jsonwebtoken";
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
        const token = jsonWebToken.sign(
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
