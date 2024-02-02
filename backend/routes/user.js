const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db");
const authMiddleware = require("../middleware");

const router = express.Router();

const signupBody = zod.object({
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});
const userUpdateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.post("/signup", async function (req, res) {
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    email: req.body.email,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: Math.random() * 1000 + 1,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET,
    {
      expiresIn: 3600,
    }
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async function (req, res) {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({ message: "Error while logging in" });
  }

  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    password,
  });

  if (!user) {
    return res.status(411).json({ message: "Error while logging in" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET,
    {
      expiresIn: 3600,
    }
  );

  res.json({
    token: token,
  });
});

router.put("/", authMiddleware, async function (req, res) {
  const { success } = userUpdateBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  await User.updateOne(req.userId, req.body);

  res.json({
    message: "Updated successfully",
  });
});

router.get("/userInfo", authMiddleware, async function (req, res) {
  const user = await User.find({
    _id: req.userId,
  }).select("firstName lastName");

  res.json(user[0]);
});

router.get("/bulk", authMiddleware, async function (req, res) {
  const { filter } = req.query;

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter || "",
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter || "",
          $options: "i",
        },
      },
    ],
    _id: {
      $ne: req.userId,
    },
  }).select("firstName lastName _id email");

  res.json(users);
});

module.exports = router;
