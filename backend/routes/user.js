const express = require('express');
const zod = require('zod');
const { User } = require("../schemas/db")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const router = express.Router();


// a zod schema which will be used for authentication
signupSchema = zod.object({
    name: zod.string().maxLength(50),
    password: zod.string().minLength(8).maxLength(50),
    email: zod.email().maxLength(100)
})

// logic for post request
router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
        return res.json({
            message: "enter valid details"
        })
    }
    const user = User.findOne({
        name: body.name
    })

    if (user._id) {
        return res.json({
            message: "email already taken / incorrect inputs"
        })
    }

    const dbUser = await User.create(body);
    const token =jwt.sign({
        userId: dbUser._id,

    }, JWT_SECRET);

    res.json({
        message: "user created signed up successfully",
        token: token
    })
})

module.exports = {
    router
}