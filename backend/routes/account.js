import mongoose from "mongoose";
import { authMiddleware } from "../middleware";
import { Account } from "../schemas/db";

const express = require("express");

const router = express.Router();

router.get("./balance", authMiddleware, async (req, res) => {

    const account = await Account.findOne({
        userId: req.userId
    });

    if (!account) {
        res.json({
            message: "account does not exist!!"
        });
    }

    res.json({
        balance: account.balance
    });

})


router.post("./transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: 'Insufficient Balance'
        });
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    //sender's transaction logic
    await account.updateOne({
        userId: req.userId
    },
        {
            $inc: {
                balance: -amount
            }
        }
    ).session(session);

    //receiver's transaction logic
    await Account.updateOne({
        userId: to
    },
        {
            $inc: {
                balance: amount
            }
        }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});