const jwt = require("jsonwebtoken");
const User = require("../models/user/userSchema");

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("email name ");
    next();
  } catch (e) {
    res.status(401).send({
      error: e.message,
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    if (decoded.role === "admin") {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (e) {
    res.status(401).send("Token is not valid");
  }
};

const isUser = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.header.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    await console.info(decoded.role)
    if (decoded.role === "user") {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (e) {
    res.status(401).send("Token is not valid");
  }
};

module.exports = { checkAuth, isUser, isAdmin };
