"use strict";
const {CREATED, SuccessResponse} = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
   login = async (req, res, next) => {
      console.log("[P]::SignIn::", req.body);
      new SuccessResponse({
         message: "Login successfully OK!",
         metadata: await AccessService.signIn(req.body),
         options: {
            limit: 10,
         },
      }).send(res);
   };

   signUp = async (req, res, next) => {
      console.log("[P]::SignUp::", req.body);
      new CREATED({
         message: "Register successfully OK!",
         metadata: await AccessService.signUp(req.body),
         options: {
            limit: 10,
         },
      }).send(res);
   };
}

module.exports = new AccessController();
