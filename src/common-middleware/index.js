const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  if (req.header.authorization) {
    const token = req.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin access denied" });
  }
  next();
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "User") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};
