"use strict";
const express = require("express");
const {apiKey, checkPermission} = require("../auth/checkAuth");
const router = express.Router();

// Check apiKey (User -> BFF -> API) ApiKey này là Api key version cho mỗi version hoặc mỗi đối tác. Họ phải add vào mới sử dụng được api của mình
router.use(apiKey);
// Check permission
router.use(checkPermission("0000"));

router.use("/v1/api", require("./access"));

module.exports = router;
