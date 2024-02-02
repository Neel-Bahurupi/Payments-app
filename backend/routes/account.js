const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("../middleware");
const { Account } = require("../db");
const zod = require("zod");

const router = express.Router();

const transferBody = zod.object({
  to: zod.string(),
  amount: zod.number(),
});

router.get("/balance", authMiddleware, async function (req, res) {
  const account = await Account.findOne({ userId: req.userId });
  res.json(account.balance);
});

router.post("/transfer", authMiddleware, async function (req, res) {
  const { success } = transferBody.safeParse(req.body);

  if (!success) {
    return res.status(403).json({
      message: "Invalid account",
    });
  }

  const toAccount = await Account.findOne({ userId: req.body.to });

  if (!toAccount) {
    return res.json({
      message: "Invalid account",
    });
  }

  const userAccount = await Account.findOne({ userId: req.userId });

  if (userAccount.balance < req.body.amount) {
    return res.status(403).json({
      message: "Insufficient balance",
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Account.updateOne(
      { userId: req.body.to },
      { $inc: { balance: req.body.amount } }
    );
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -req.body.amount } }
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();

    return res.status(403).json({
      message: "Something went wrong",
    });
  } finally {
    session.endSession();
  }

  res.json({
    message: "Transfer successful",
  });
});

module.exports = router;
