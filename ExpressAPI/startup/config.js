const config = require("config");

module.exports = function (app) {
  app.listen(config.get("PORT"), () => {
    console.log("Listening on port 8080");
  });
};
