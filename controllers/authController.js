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

// @desc Authenticate a user
// @route POST /api/auth/signin
// @access Public
export const signin = async (req, res, next) => {
    try {
        const { email } = req.body

        if (!email || !req.body.password) return next(createError(400, 'Please add all fields'))

        const user = await User.findOne({ email })
        if (!user) return next(createError(404, 'User not found'))

        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isCorrect) next(createError(400, 'Wrong Credentials'))

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        const { password, ...others } = user._doc
        // user'in bilgileri icinden password'u cikariyoruz

        res.cookie('access_token', token, { // hash'lenmis token'i access_token olarak cookie'ye gonderiyoruz
            httpOnly: true
        }).status(200).json(others) // user'i gonderiyoruz
    } catch (err) {
        next(err)
    }
}