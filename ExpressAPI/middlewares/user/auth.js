const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (req, res, next) {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access denied. No token provided");

    jwt.verify(token, config.get("JWT_PRIVATE_KEY"), (err, result) => {
      if (err) {
        return res.status(200).send({ msg: "Token Expired" });
      }
      req.user = result;
      return next();
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

