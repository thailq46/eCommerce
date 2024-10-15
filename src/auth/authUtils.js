"use strict";
const JWT = require("jsonwebtoken");
const {asyncHandler} = require("../helpers/asyncHandler");
const {HEADER} = require("../utils/constants");
const {AuthFailureError, NotFoundError} = require("../core/error.response");
const KeyTokenService = require("../services/keyToken.service");

const createTokenPair = async (payload, publicKey, privateKey) => {
   try {
      // accessToken
      const accessToken = JWT.sign(payload, publicKey, {
         expiresIn: "2 days",
      });

      // refreshToken
      const refreshToken = JWT.sign(payload, privateKey, {
         expiresIn: "30 days",
      });

      JWT.verify(accessToken, publicKey, (err, decode) => {
         if (err) {
            console.error("error verify:: ", err);
         } else {
            console.log("decode verify:: ", decode);
         }
      });
      return {accessToken, refreshToken};
   } catch (error) {
      return error;
   }
};

const authentication = asyncHandler(async (req, res, next) => {
   /**
    * 1. Check userId missing???
    * 2. get accsessToken
    * 3. verify Token
    * 4. Check user in DB
    * 5. check keyStore with this userId
    * 6. Ok all -> return next()
    */
   // 1
   const userId = req.headers[HEADER.CLIENT_ID];
   if (!userId) {
      throw new AuthFailureError("Error:: Invalid request UserId!");
   }
   // 2.
   const keyStore = await KeyTokenService.findByUserId(userId);
   if (!keyStore) {
      throw new NotFoundError("Error:: Not Found!");
   }
   // 3.
   const accessToken = req.headers[HEADER.AUTHORIZATION];
   if (!accessToken) {
      throw new AuthFailureError("Error:: Invalid request!");
   }
   // 4.
   try {
      const decode = JWT.verify(accessToken, keyStore.publicKey);
      if (userId !== decode.userId) {
         throw new AuthFailureError("Error:: Invalid UserId!");
      }
      // 5.
      req.keyStore = keyStore;
      return next();
   } catch (error) {
      throw new AuthFailureError("Error:: Invalid token!");
   }
});

module.exports = {
   createTokenPair,
   authentication,
};
