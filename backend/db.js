const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl).then(function () {
  console.log("Database connected");
});

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  firstName: String,
  lastName: String,
  password: String,
});

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    require: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User: User,
  Account: Account,
};
