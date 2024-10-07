const express = require("express");
const morgan = require("morgan");
const {default: helmet} = require("helmet");
const compression = require("compression");
require("dotenv").config();
const app = express();

// Init Middleware
// #region 3 thư viện lên add vào để sử dụng khi init 1 dự án mới
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
// #endregion
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Init DB
require("./dbs/init.mongoDB");

// Init Routes
app.use("/", require("./routes"));

// Handling Errors
app.use((req, res, next) => {
   const error = new Error("Not found"); // new Error hay Error() đều giống nhau
   error.status = 404;
   next(error);
});

app.use((error, req, res, next) => {
   const statusCode = error.status || 500;
   return res.status(statusCode).json({
      status: "error",
      code: statusCode,
      message: error.message || "Internal Server Error",
   });
});
module.exports = app;
