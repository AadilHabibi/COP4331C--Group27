const mongoose = require("mongoose");
const config = require("config");

module.exports = function (app) {
  mongoose
    .connect(config.get("db"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true
    })
    .then(() => console.log("Connected to database.."))
    .catch((err) => console.log(err));
};
