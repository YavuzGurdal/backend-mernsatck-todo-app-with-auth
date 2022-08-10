import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/UserModel.js';

import { createError } from '../error.js'

// @desc Register new user
// @route POST /api/auth/signup
// @access Public
export const signup = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) return next(createError(400, 'Please add all fields'))

        // Cheeck if user exists
        const userExists = await User.findOne({ email })
        if (userExists) return next(createError(400, 'User already exists'))

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({ name, email, password: hashedPassword })
        //const newUser = new User({ ...req.body, password: hashedPassword })

        await newUser.save();
        res.status(200).send('User has been created!')
    } catch (err) {
        next(err)
    }
})