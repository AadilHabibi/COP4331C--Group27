const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {
  validateEmail,
  userByEmail,
  validateRegister,
  genHashedPwd,
  auth,
} = require("../middlewares/user");
const _ = require("lodash");
const { response } = require("express");

router.post("/", validateRegister, validateEmail, genHashedPwd, (req, res) => {
  const User = mongoose.model("User");
  let user = new User({
    ..._.pick(req.body, ["name", "email", "password", "gender"]),
  });
  const token = user.generateAuthToken();
  user
    .save()
    .then((user) => {
      return res.status(200).send({ token: token });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Internal server error");
    });
});
router.get("/name", auth, (req, res) => {
  const User = mongoose.model("User");
  User.findById(req.user._id)
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send("Invalid ID");
    });
});
router.put("/edit", auth, genHashedPwd, (req, res) => {
  const user_id = req.user._id;
  const User = mongoose.model("User");
  User.updateOne(
    {
      _id: user_id,
    },
    {
      $set: { ..._.pick(req.body, ["name", "password"]) },
    }
  )
    .then((response) => {
      return res.status(200).send("Information updated...");
    })
    .catch((err) => {
      return res.status(400).send("User not found!");
    });
});
router.put("/reset-password", userByEmail, genHashedPwd, (req, res) => {
  const user_id = req.user_id;
  const User = mongoose.model("User");
  User.updateOne(
    { _id: user_id },
    {
      $set: {
        ..._.pick(req.body, ["password"]),
      },
    }
  )
    .then((response) => {
      return res.status(200).send("Password changed...");
    })
    .catch((err) => {
      return res.status(400).send("Password not changed!");
    });
});

module.exports = router;
