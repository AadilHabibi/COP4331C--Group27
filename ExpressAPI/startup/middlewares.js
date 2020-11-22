const express = require("express");
const cors = require("cors");
const userRouter = require("../routes/users");
const authRouter = require("../routes/auth");
const movieRouter = require("../routes/movie");
//models
require("../models/user");

const morgan = require("morgan");

module.exports = function (app) {
  app.use(express.json()); //raw data
  app.use(morgan("tiny"));
  app.use(cors());
  app.use("/users", userRouter);
  app.use("/auth", authRouter);
  app.use("/movie", movieRouter);
  app.use((err, req, res, next) => {
    console.log(err);
    res.send(err);
  });
};
