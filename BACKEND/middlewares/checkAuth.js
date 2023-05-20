const jwt = require("jsonwebtoken");
const User = require("../models/user/userSchema");

module.exports = async (req, res, next) => {
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
