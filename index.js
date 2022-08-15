import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import colors from 'colors';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

dotenv.config();
connectDB();

const app = express();

// const port = process.env.PORT

app.use(cookieParser())
app.use(express.json())

app.use(cors({ credentials: true, origin: 'https://react-todoapp-withauth.netlify.app' })) // bunun sonunda / olmayacak

app.use(cookieParser()) // frontend'den gelen cookie'leri okumami sagliyor

app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes) // todoRoutes icindeki her route'a burdan gidiyor

// app.use(express.static(path.join(__dirname, "/frontend/build")));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
// });

app.use(errorHandler);

// app.listen(port, () => console.log(`Server started on port ${port}`))
app.listen(process.env.PORT || 8080, () => console.log(`Server started on port ${port}`))