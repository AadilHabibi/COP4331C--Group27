const mongoose = require("mongoose");

module.exports = async function (req, res, next) {
  try {
    const User = mongoose.model("User");
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("User not exist");
    }
    req.user_id = user._id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
