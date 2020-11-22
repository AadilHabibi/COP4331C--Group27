const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { validateLogin, auth } = require("../middlewares/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
//By HTTP Headers
router.post("/", validateLogin, async (req, res) => {
  try {
    let data = _.pick(req.body, ["email", "password"]);
    const User = mongoose.model("User");

    let user = await User.findOne({ email: data.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();

    return res.status(200).send({ token: token });
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
