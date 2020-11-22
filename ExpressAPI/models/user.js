const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true,
  },
  gender: {
    type: String,
    minlength: 4,
    maxlength: 6,
    required: true,
  },
  likes: [],
  dislikes: [],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { name: this.name, email: this.email, gender: this.gender, _id: this._id },
    config.get("JWT_PRIVATE_KEY")
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);
