import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";

// initialize App express
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 8000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDb connected!");
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}).catch((error) => {
    console.log({ error });
    process.exit(1);
})



