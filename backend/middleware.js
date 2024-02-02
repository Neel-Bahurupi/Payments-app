const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.exp > Date.now()) {
      return res.sendStatus(403);
    }
    req.userId = decoded.userId;
  } catch (err) {
    return res
      .status(403)
      .json({ message: "You are not authorised to access this page" });
  }
  next();
};

module.exports = authMiddleware;
