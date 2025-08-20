const express = require('express');
const zod = require('zod');
const { User } = require("../schemas/db")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const { use } = require('react');
const router = express.Router();    //router by express


// a zod schema which will be used for authentication
const signupSchema = zod.object({
    name: zod.string().maxLength(50),
    password: zod.string().minLength(8).maxLength(50),
    email: zod.email().maxLength(100)
})

// logic for signup request
router.post("/signup", async (req, res) => {

    // cleaner way to use re.body again and again
    const body = req.body;4

    //- This uses Zod’s safeParse method to validate the request body against your defined schema
    const success  = signupSchema.safeParse(req.body);
    if (!success) {
        return res.json({
            message: "enter valid details"
        })
    }

    // finding user with same name in db
    const existingUser = existingUser.findOne({
        name: body.name
    })

    if (existingUser._id) {
        return res.json({
            message: "person's account already exists / incorrect inputs"
        })
    }

    // created a entry in the database
    const user = await User.create({
        email:body.email,
        name: body.name,
        password: body.password
    })

    const userId = user._id;

    const token =jwt.sign({
        userId: userId,
    }, JWT_SECRET);

    res.json({
        message: "user created signed up successfully",
        token: token
    })
})



const signInSchema = zod.object({
    email:zod.email(),
    password: zod.string()
})

router.post("/signin",async (req,res)=>{
    const success =signInSchema.safeParse(req.body)
     if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    }); 
      if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }
     res.status(411).json({
        message: "Error while logging in"
    })
})


const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})




router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})


module.exports = {
    router
}