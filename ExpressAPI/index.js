const express = require("express");
const app = express();
const config = require("config");
let key = config.get("JWT_PRIVATE_KEY");
if (!key) {
  console.error("FATAL_ERROR: jwtprivatekey is not defined");
  process.exit(1);
}
// Startup
require("./startup/config")(app);
require("./startup/middlewares")(app);
require("./startup/db")(app);
