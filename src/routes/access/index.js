"use strict";
const express = require("express");
const accessController = require("../../controllers/access.controller");
const {asyncHandler} = require("../../helpers/asyncHandler");
const {authentication} = require("../../auth/authUtils");
const router = express.Router();

// Sign Up
router.post("/shop/signup", asyncHandler(accessController.signUp));

// Login
router.post("/shop/login", asyncHandler(accessController.login));

// Authentication (Trước khi xuống được logout thì phải qua middleware này)
router.use(authentication);

// Logout
router.post("/shop/logout", asyncHandler(accessController.logout));
module.exports = router;
