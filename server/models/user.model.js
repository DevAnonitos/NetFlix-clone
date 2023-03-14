import mongoose from "mongoose";
import modelOptions from "./model.options.js";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    salt: {
        type: String,
        required: true,
        select: false,
    }
}, model);

UserSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString("hex")

    this.password = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex");
}

UserSchema.methods.validPassword = (password) => {
    const hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512",
    ).toString("hex");

    return this.password === hash;
}

const userModel = mongoose.model("User", UserSchema);

export default userModel;
