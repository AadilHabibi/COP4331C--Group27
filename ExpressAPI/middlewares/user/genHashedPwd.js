const bycrypt = require("bcrypt");

module.exports = async function (req, res, next) {
  try {
    let pwd = req.body.password;
    let salt = await bycrypt.genSalt(10);
    let hashedPwd = await bycrypt.hash(pwd, salt);

    req.body.password = hashedPwd;

    next();
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};
