// this is the main entry level route
//  i will use this to direct to other routes

const express = require('express');
const router = express.Router();

const accountRouter = require("./account")
const userRouter = require("./user")

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports= router

// api/v1/user
// api/v1/transactions ...