import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import { rateLimit } from "express-rate-limit";

import routes from "./routes/index.js";

// initialize App express
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/v1", routes);

app.get('/api/v1', async (req, res) => {
    res.status(200).json({
        message: 'Hello from movies database api v1',
    });
})

const limiter = rateLimit({
    windowMs: 600 * 600 * 1000,
    max: 500,
    message: "Too many requests from this IP, please try again in an hour",
});

app.use(limiter);

const port = process.env.PORT || 8000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDb connected!");
    server.listen(port, () => {
        console.log(`Server is listening on port http://localhost:${port}`);
    });
}).catch((error) => {
    console.log({ error });
    process.exit(1);
});



