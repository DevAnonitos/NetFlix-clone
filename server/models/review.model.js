import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
    "Review",
    mongoose.Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
        mediaType: {
            type: String,
            enum: ["tv", "movie"],
            require: true,
        },
        mediaId: {
            type: String,
            require: true,
        },
        mediaPoster: {
            type: String,
            require: true,
        }
    }, modelOptions)
);
