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
    
}
