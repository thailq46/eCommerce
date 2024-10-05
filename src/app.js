const express = require("express");
const morgan = require("morgan");
const {default: helmet} = require("helmet");
const compression = require("compression");
const app = express();

// Init Middleware
// #region 3 thư viện lên add vào để sử dụng khi init 1 dự án mới
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
// #endregion

// Init DB
require("./dbs/init.mongoDB");

// Init Routes
app.get("/", (req, res) => {
   res.send("Hello World");
});
// Handling Errors

module.exports = app;
