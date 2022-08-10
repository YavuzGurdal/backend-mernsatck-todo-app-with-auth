import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import colors from 'colors';

import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

const port = process.env.PORT

app.listen(port, () => console.log(`Server started on port ${port}`))