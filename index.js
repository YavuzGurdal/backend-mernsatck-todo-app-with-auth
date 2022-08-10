import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import colors from 'colors';

import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

const port = process.env.PORT

app.use(cookieParser())
app.use(express.json())

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`))