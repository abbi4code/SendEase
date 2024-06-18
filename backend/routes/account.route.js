import express from "express";
import { Account } from "../models/User.model.js";
import authMiddleware from "../middlewares/middleware.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const userid = req.userid;
    const account = await Account.findOne({ userid });
    // console.log(account)
    if (!account) {
      res.status(404).json({ msg: "account not found" });
    }
    const accountbalance = account.balance;

    res.json({ accountbalance });
  } catch (error) {
    // console.log("error",error)
    res.json({ msg: "error while getting account balance", error });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  //you can create a session which will ensure that either all process will run  or none will
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { to, amount } = req.body;
    const userid = req.userid;
    const balanceaccount = await Account.findOne({ userid });
    if (!balanceaccount || balanceaccount.balance < amount) {
      return res.status(400).json({ msg: "insufficient account" });
    }

    const toaccount = await Account.findOne({ userid: to });
    if (!toaccount) {
      //if no users found you want to abort transaction
      await session.abortTransaction();
      return res.json({ msg: "no account found" });
    }

    // here you have to do two thing first cut the money from sender and add the amount to reciever at hte same time
    // but below is bad solution

    await Account.updateOne({ userid: userid }, { $inc: { balance: -amount } });
    await Account.updateOne({ userid: to }, { $inc: { balance: +amount } });

    await session.commitTransaction();

    res.json({ msg: "money transfer successfully" });
  } catch (error) {
    res.json({ msg: "error while sending amount " });
  }
});

export default router;
